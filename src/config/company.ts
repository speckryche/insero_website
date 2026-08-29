// Central company information - update here and changes reflect site-wide

export const company = {
  name: 'Insero',
  phone: '844-252-3185',
  phoneFormatted: '(844) 252-3185',
  phoneLink: 'tel:+18442523185',
  email: 'sales@insero.cloud',
  emailLink: 'mailto:sales@insero.cloud',
  location: {
    city: 'Medford',
    state: 'OR',
    full: 'Medford, OR',
  },
  // Social media links - add when ready
  social: {
    linkedin: 'https://www.linkedin.com/company/insero-llc/',
    twitter: '',
    facebook: '',
  },
} as const;

export type Company = typeof company;
