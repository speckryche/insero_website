// Central company information - update here and changes reflect site-wide

export const company = {
  name: 'Insero',
  phone: '844-252-3185',
  phoneFormatted: '(844) 252-3185',
  phoneLink: 'tel:+18442523185',
  email: 'sales@insero.cloud',
  emailLink: 'mailto:sales@insero.cloud',
  location: {
    city: 'Jacksonville',
    state: 'OR',
    full: 'Jacksonville, OR',
  },
  // Social media links - add when ready
  social: {
    linkedin: '',
    twitter: '',
    facebook: '',
  },
} as const;

export type Company = typeof company;
