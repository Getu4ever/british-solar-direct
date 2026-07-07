export const COMPANY = {
  name: 'British Solar Direct',
  director: 'Juma Mohammedi',
  directorTitle: 'Company Director & Lead Installer',
  address: 'Southwell Lane, Kirkby-in-Ashfield, Nottingham NG17 8EY',
  city: 'Nottingham',
  phone: '07544414241',
  phoneDisplay: '07544 14241',
  email: 'juma@britishsolardirect.co.uk',
  responseTime: 'within 4 business hours',
} as const;

export const DIRECTOR_BIO =
  'Juma Mohammedi is a highly sought-after builder in Nottingham with over 20 years in the construction industry. Originally from Afghanistan, he personally coordinates delivery and professional installation for the majority of our residential customers — around 90% of whom are local homeowners.';

export const DELIVERY_AREAS = [
  'Nottingham & Nottinghamshire',
  'Derbyshire',
  'Leicestershire',
  'South Yorkshire',
  'East Midlands (by arrangement)',
] as const;

export const DELIVERY_EXCLUSIONS = [
  'Scottish Highlands & Islands',
  'Northern Ireland',
  'Isle of Man & Channel Islands',
  'Remote locations requiring specialist freight (quoted separately)',
] as const;

export const GUIDE_PRICE_NOTE =
  'Guide price (ex. VAT). Your final quote confirms exact pricing, stock, and delivery.';

export const PAYMENT_NOTE =
  'New customers: pro-forma invoice and BACS payment after quote approval. Online card checkout available for confirmed orders.';
