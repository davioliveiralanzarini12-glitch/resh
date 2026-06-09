# Studio Resh

Site premium e sistema de agendamento para a barbearia Studio Resh.

## Tecnologias

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Supabase
- React Hook Form
- Zod
- date-fns
- Lucide React

## Como rodar localmente

1. Instale dependências:

```bash
npm install
```

2. Copie as variáveis de ambiente:

```bash
cp .env.example .env.local
```

3. Preencha os valores do Supabase em `.env.local`.

4. Rode o projeto:

```bash
npm run dev
```

## Configurando o Supabase

1. Crie um projeto no Supabase.
2. Copie a URL e a chave anônima para `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
3. Copie a chave `SERVICE_ROLE` para `SUPABASE_SERVICE_ROLE_KEY`.
4. Crie o banco de dados usando `supabase/schema.sql`.
5. Rode os seeds usando `supabase/seed.sql`.

> Use o SQL Editor do Supabase ou a CLI para executar os arquivos.

## Variáveis de ambiente

Apenas as variáveis com prefixo `NEXT_PUBLIC_` são expostas ao cliente. As credenciais do admin não devem ficar públicas.

- `NEXT_PUBLIC_BOOKING_MODE=internal`
- `NEXT_PUBLIC_APPBARBER_URL=https://sites.appbarber.com.br/studioresh-v9nj`
- `NEXT_PUBLIC_SUPABASE_URL=`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY=`
- `SUPABASE_SERVICE_ROLE_KEY=`
- `ADMIN_EMAIL=`
- `ADMIN_PASSWORD=`
- `NEXT_PUBLIC_WHATSAPP_NUMBER=+5511999999999`
- `NEXT_PUBLIC_INSTAGRAM_URL=https://www.instagram.com/studioresh`
- `NEXT_PUBLIC_ADDRESS=Rua João XXIII, 1796 - Centro, Medianeira/PR`

## Estrutura do banco de dados

- `professionals`
- `service_categories`
- `professional_services`
- `bookings`
- `business_hours`
- `blocked_slots`

## Modo de agendamento

- `NEXT_PUBLIC_BOOKING_MODE=internal` usa o sistema interno com Supabase.
- `NEXT_PUBLIC_BOOKING_MODE=appbarber` redireciona todos os botões de agendar para AppBarber.

## Como trocar a logo

Substitua `public/brand/resh-logo.png` pela nova arte da logo.

## Como alterar serviços

Edite as informações em `lib/services.ts` e, se necessário, atualize o banco em `supabase/seed.sql`.

## Como alterar profissionais

Edite `lib/constants.ts` ou atualize os dados em `supabase/seed.sql`.

## Como alterar o link do AppBarber

Edite `NEXT_PUBLIC_APPBARBER_URL` em `.env.local`.

## Acessar o painel admin

- Login: `/admin/login`
- Painel: `/admin`
- Agenda: `/admin/agenda`
- Serviços: `/admin/servicos`
- Profissionais: `/admin/profissionais`
- Horários: `/admin/horarios`
- Bloqueios: `/admin/bloqueios`

## Observações

- O agendamento interno bloqueia horários apenas para o profissional selecionado.
- Agendamentos de profissionais diferentes podem ocorrer no mesmo horário se ambos estiverem livres.
- O painel admin permite visualizar agendamentos, serviços, profissionais, horários e bloqueios.
# resh-2
# resh-2
