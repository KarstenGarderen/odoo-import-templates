// Field catalog for product.pricelist (Pricelists). Extracted from a live
// Odoo 19 instance; core fields identical in Odoo 18.

export default {
  id: 'product.pricelist',
  slug: 'pricelists',
  name: 'Pricelists',
  icon: 'pricetag',
  description: 'Price strategies per customer group, country or channel.',
  orderHint: 'Import before Pricelist Rules',
  groups: ['Basic information'],
  fields: [
    {
      name: 'name',
      label: 'Pricelist Name',
      type: 'char',
      required: true,
      group: 'Basic information',
      example: 'Wholesale EUR',
      defaultChecked: true,
    },
    {
      name: 'currency_id',
      label: 'Currency',
      type: 'many2one',
      relation: 'res.currency',
      group: 'Basic information',
      example: 'EUR',
      importNote: 'Currency name (EUR, USD…). Delete the column to use your company currency.',
      defaultChecked: true,
    },
    {
      name: 'country_group_ids',
      label: 'Country Groups',
      type: 'many2many',
      relation: 'res.country.group',
      group: 'Basic information',
      example: 'Europe',
      importNote: 'Comma-separated country group names as defined in Odoo, without spaces.',
    },
    {
      name: 'active',
      label: 'Active',
      type: 'boolean',
      group: 'Basic information',
      example: 'TRUE',
    },
  ],
}
