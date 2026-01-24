// Central company information - update here and changes reflect site-wide

export const company = {
  name: 'Insero',
  phone: '541-951-6990',
  phoneFormatted: '(541) 951-6990',
  phoneLink: 'tel:+15419516990',
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
