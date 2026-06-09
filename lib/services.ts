import { PROFESSIONALS } from './constants';

export const SERVICE_CATEGORIES = [
  { id: 'corte', name: 'Corte' },
  { id: 'barba', name: 'Barba' },
  { id: 'barba-e-pezinho', name: 'Barba e Pézinho' },
  { id: 'barba-express', name: 'Barba Express' },
  { id: 'bigode', name: 'Bigode' },
  { id: 'corte-e-barba', name: 'Corte e Barba' },
  { id: 'corte-e-barba-express', name: 'Corte e Barba Express' },
  { id: 'corte-e-sobrancelha', name: 'Corte e Sobrancelha' },
  { id: 'corte-barba-sobrancelha', name: 'Corte, Barba e Sobrancelha' },
  { id: 'depilacao-nasal', name: 'Depilação Nasal' },
  { id: 'pezinho', name: 'Pézinho / Acabamento' },
  { id: 'sobrancelha', name: 'Sobrancelha' }
];

export const PROFESSIONAL_SERVICES = [
  {
    id: 'marcus-barba',
    professionalId: 'marcus',
    categoryId: 'barba',
    price: 'R$ 50,00',
    priceCents: 5000,
    durationMinutes: 30
  },
  {
    id: 'marcus-barba-pezinho',
    professionalId: 'marcus',
    categoryId: 'barba-e-pezinho',
    price: 'R$ 65,00',
    priceCents: 6500,
    durationMinutes: 30
  },
  {
    id: 'marcus-barba-express',
    professionalId: 'marcus',
    categoryId: 'barba-express',
    price: 'R$ 25,00',
    priceCents: 2500,
    durationMinutes: 15
  },
  {
    id: 'marcus-bigode',
    professionalId: 'marcus',
    categoryId: 'bigode',
    price: 'R$ 15,00',
    priceCents: 1500,
    durationMinutes: 15
  },
  {
    id: 'marcus-corte',
    professionalId: 'marcus',
    categoryId: 'corte',
    price: 'R$ 70,00',
    priceCents: 7000,
    durationMinutes: 30
  },
  {
    id: 'marcus-corte-barba',
    professionalId: 'marcus',
    categoryId: 'corte-e-barba',
    price: 'R$ 110,00',
    priceCents: 11000,
    durationMinutes: 60
  },
  {
    id: 'marcus-corte-barba-express',
    professionalId: 'marcus',
    categoryId: 'corte-e-barba-express',
    price: 'R$ 95,00',
    priceCents: 9500,
    durationMinutes: 45
  },
  {
    id: 'marcus-corte-sobrancelha',
    professionalId: 'marcus',
    categoryId: 'corte-e-sobrancelha',
    price: 'Valor sob consulta',
    priceCents: null,
    durationMinutes: 45
  },
  {
    id: 'marcus-corte-barba-sobrancelha',
    professionalId: 'marcus',
    categoryId: 'corte-barba-sobrancelha',
    price: 'Valor sob consulta',
    priceCents: null,
    durationMinutes: 60
  },
  {
    id: 'marcus-depilacao-nasal',
    professionalId: 'marcus',
    categoryId: 'depilacao-nasal',
    price: 'R$ 30,00',
    priceCents: 3000,
    durationMinutes: 10
  },
  {
    id: 'marcus-pezinho',
    professionalId: 'marcus',
    categoryId: 'pezinho',
    price: 'R$ 20,00',
    priceCents: 2000,
    durationMinutes: 15
  },
  {
    id: 'marcus-sobrancelha',
    professionalId: 'marcus',
    categoryId: 'sobrancelha',
    price: 'R$ 20,00',
    priceCents: 2000,
    durationMinutes: 15
  },
  {
    id: 'solano-barba-pezinho',
    professionalId: 'solano',
    categoryId: 'barba-e-pezinho',
    price: 'R$ 65,00',
    priceCents: 6500,
    durationMinutes: 40
  },
  {
    id: 'solano-corte',
    professionalId: 'solano',
    categoryId: 'corte',
    price: 'R$ 50,00',
    priceCents: 5000,
    durationMinutes: 40
  },
  {
    id: 'solano-corte-barba',
    professionalId: 'solano',
    categoryId: 'corte-e-barba',
    price: 'R$ 90,00',
    priceCents: 9000,
    durationMinutes: 60
  },
  {
    id: 'solano-corte-barba-express',
    professionalId: 'solano',
    categoryId: 'corte-e-barba-express',
    price: 'Valor sob consulta',
    priceCents: null,
    durationMinutes: 40
  },
  {
    id: 'solano-corte-sobrancelha',
    professionalId: 'solano',
    categoryId: 'corte-e-sobrancelha',
    price: 'R$ 70,00',
    priceCents: 7000,
    durationMinutes: 40
  },
  {
    id: 'solano-corte-barba-sobrancelha',
    professionalId: 'solano',
    categoryId: 'corte-barba-sobrancelha',
    price: 'R$ 100,00',
    priceCents: 10000,
    durationMinutes: 60
  }
];

export const SERVICE_CATEGORY_LOOKUP = new Map(SERVICE_CATEGORIES.map((item) => [item.id, item.name]));

export const SERVICE_SUMMARY = PROFESSIONAL_SERVICES.map((service) => ({
  ...service,
  name: SERVICE_CATEGORY_LOOKUP.get(service.categoryId) ?? 'Serviço'
}));

export function getServicesByProfessional(professionalId: string) {
  return SERVICE_SUMMARY.filter((service) => service.professionalId === professionalId);
}

export function getServiceById(serviceId: string) {
  return SERVICE_SUMMARY.find((service) => service.id === serviceId);
}

export function getProfessionalById(id: string) {
  return PROFESSIONALS.find((prof) => prof.id === id);
}
