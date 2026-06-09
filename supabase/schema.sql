create extension if not exists pgcrypto;

create table if not exists professionals (
  id text primary key,
  name text not null,
  slug text unique not null,
  active boolean default true,
  created_at timestamptz default now()
);

create table if not exists service_categories (
  id text primary key,
  name text not null,
  slug text unique not null,
  created_at timestamptz default now()
);

create table if not exists professional_services (
  id text primary key,
  professional_id text references professionals(id) on delete cascade,
  service_category_id text references service_categories(id) on delete cascade,
  price_cents integer,
  price_label text,
  duration_minutes integer not null,
  active boolean default true,
  created_at timestamptz default now()
);

create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  client_name text not null,
  client_phone text not null,
  client_email text,
  professional_id text references professionals(id),
  professional_service_id text references professional_services(id),
  booking_date date not null,
  start_time time not null,
  end_time time not null,
  status text not null default 'confirmed',
  notes text,
  created_at timestamptz default now()
);

create table if not exists business_hours (
  id uuid primary key default gen_random_uuid(),
  professional_id text references professionals(id) on delete cascade,
  day_of_week integer not null,
  open_time time not null,
  close_time time not null,
  break_start time,
  break_end time,
  is_open boolean default true
);

create table if not exists blocked_slots (
  id uuid primary key default gen_random_uuid(),
  professional_id text references professionals(id) on delete cascade,
  date date not null,
  start_time time not null,
  end_time time not null,
  reason text,
  created_at timestamptz default now()
);

create or replace function get_available_slots(
  professional_id text,
  service_id text,
  target_date date
)
returns table(slot text)
language plpgsql stable as $$
declare
  service_duration integer;
  open_time time;
  close_time time;
  break_start time;
  break_end time;
  current_time time;
begin
  select ps.duration_minutes into service_duration
  from professional_services ps
  where ps.id = service_id
    and ps.professional_id = professional_id
    and ps.active;

  if service_duration is null then
    return;
  end if;

  select bh.open_time, bh.close_time, bh.break_start, bh.break_end
  into open_time, close_time, break_start, break_end
  from business_hours bh
  where bh.professional_id = professional_id
    and bh.day_of_week = extract(isodow from target_date)::int
    and bh.is_open
  limit 1;

  if open_time is null then
    return;
  end if;

  for current_time in
    select generate_series(open_time, close_time - make_interval(mins => service_duration), interval '15 minutes')::time
  loop
    if break_start is not null and break_end is not null and not (current_time + make_interval(mins => service_duration) <= break_start or current_time >= break_end) then
      continue;
    end if;

    if exists(
      select 1 from blocked_slots bs
      where bs.professional_id = professional_id
        and bs.date = target_date
        and not (bs.end_time <= current_time or bs.start_time >= current_time + make_interval(mins => service_duration))
    ) then
      continue;
    end if;

    if exists(
      select 1 from bookings b
      where b.professional_id = professional_id
        and b.booking_date = target_date
        and b.status in ('pending', 'confirmed')
        and not (b.end_time <= current_time or b.start_time >= current_time + make_interval(mins => service_duration))
    ) then
      continue;
    end if;

    slot := to_char(current_time, 'HH24:MI');
    return next;
  end loop;
end;
$$;

create or replace function create_booking(
  professional_id text,
  service_id text,
  client_name text,
  client_phone text,
  client_email text,
  notes text,
  target_date date,
  target_time time
)
returns bookings
language plpgsql stable as $$
declare
  duration integer;
  open_time time;
  close_time time;
  break_start time;
  break_end time;
  booking_start time := target_time;
  booking_end time;
begin
  select ps.duration_minutes into duration
  from professional_services ps
  where ps.id = service_id
    and ps.professional_id = professional_id
    and ps.active;

  if duration is null then
    raise exception 'Serviço inválido para o profissional.';
  end if;

  booking_end := booking_start + make_interval(mins => duration);

  if target_date < current_date then
    raise exception 'Data no passado não é permitida.';
  end if;

  select bh.open_time, bh.close_time, bh.break_start, bh.break_end
  into open_time, close_time, break_start, break_end
  from business_hours bh
  where bh.professional_id = professional_id
    and bh.day_of_week = extract(isodow from target_date)::int
    and bh.is_open
  limit 1;

  if open_time is null then
    raise exception 'Profissional não atende neste dia.';
  end if;

  if booking_start < open_time or booking_end > close_time then
    raise exception 'Horário fora do expediente.';
  end if;

  if break_start is not null and break_end is not null and not (booking_end <= break_start or booking_start >= break_end) then
    raise exception 'Horário dentro da pausa.';
  end if;

  perform pg_advisory_xact_lock(hashtext(professional_id::text || target_date::text));

  if exists(
    select 1 from blocked_slots bs
    where bs.professional_id = professional_id
      and bs.date = target_date
      and not (bs.end_time <= booking_start or bs.start_time >= booking_end)
  ) then
    raise exception 'Esse horário está bloqueado para este profissional.';
  end if;

  if exists(
    select 1 from bookings b
    where b.professional_id = professional_id
      and b.booking_date = target_date
      and b.status in ('pending', 'confirmed')
      and not (b.end_time <= booking_start or b.start_time >= booking_end)
  ) then
    raise exception 'Esse horário já foi reservado para este profissional. Escolha outro horário disponível.';
  end if;

  return (
    insert into bookings(
      client_name,
      client_phone,
      client_email,
      professional_id,
      professional_service_id,
      booking_date,
      start_time,
      end_time,
      status,
      notes
    ) values (
      client_name,
      client_phone,
      client_email,
      professional_id,
      service_id,
      target_date,
      booking_start,
      booking_end,
      'confirmed',
      notes
    ) returning *
  );
end;
$$;
