export const SITE_TITLE = 'Studio Resh';
export const SITE_DESCRIPTION = 'Studio Resh: corte, barba e experiência. Barbearia premium com agendamento online e atendimento sob medida.';
export const SITE_KEYWORDS = ['Studio Resh', 'Barbearia Studio Resh', 'Barbearia premium', 'Corte masculino', 'Barba', 'Corte e barba', 'Agendamento online barbearia', 'Barbearia moderna', 'Barbearia com horário marcado'];
const rawWhatsAppNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '+5511999999999'
const sanitizedWhatsAppNumber = rawWhatsAppNumber.replace(/\D/g, '')
export const PHONE_NUMBER = rawWhatsAppNumber
export const WHATSAPP_URL = `https://wa.me/${sanitizedWhatsAppNumber}`
export const INSTAGRAM_URL = process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? 'https://www.instagram.com/studioresh'
export const ADDRESS = process.env.NEXT_PUBLIC_ADDRESS ?? 'Rua João XXIII, 1796 - Centro, Medianeira/PR'
export const MAPS_URL = `https://www.google.com/maps/search/${encodeURIComponent(ADDRESS)}`
export const BOOKING_MODE = process.env.NEXT_PUBLIC_BOOKING_MODE ?? 'internal'
export const APPBARBER_URL = process.env.NEXT_PUBLIC_APPBARBER_URL ?? 'https://sites.appbarber.com.br/studioresh-v9nj'
export const APPOINTMENT_MODES = {
  internal: 'internal',
  appbarber: 'appbarber'
};
export const HOME_SECTIONS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'Quem Somos' },
  { id: 'services', label: 'Serviços' },
  { id: 'experience', label: 'Experiência' },
  { id: 'gallery', label: 'Galeria' },
  { id: 'reviews', label: 'Avaliações' },
  { id: 'contact', label: 'Contato' }
];
export const PROFESSIONALS = [
  {
    id: 'marcus',
    name: 'Marcus',
    slug: 'marcus',
    role: 'Especialista em cortes clássicos e acabamentos premium',
    description: 'Técnica refinada, acabamento impecável e presença marcada em cada atendimento.'
  },
  {
    id: 'solano',
    name: 'Solano',
    slug: 'solano',
    role: 'Especialista em cortes modernos e barba de alto padrão',
    description: 'Corte ousado com senso de estilo e acabamento com olhar de designer.'
  }
];
export const SERVICE_FILTERS = ['Todos', 'Marcus', 'Solano'];
