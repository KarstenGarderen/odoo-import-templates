// Field catalog for res.partner.industry (Industries). Extracted from a live
// Odoo 19 instance; identical in Odoo 18. Odoo ships a default list — import
// only if you use your own industry classification.

export default {
  id: 'res.partner.industry',
  slug: 'industries',
  name: 'Industries',
  icon: 'industry',
  description: 'Your own industry classification for contacts. Odoo ships a default list.',
  orderHint: 'Import before Contacts if they reference custom industries',
  groups: ['Basic information'],
  fields: [
    {
      name: 'name',
      label: 'Industry Name',
      type: 'char',
      required: true,
      group: 'Basic information',
      example: 'Sustainable Energy',
      defaultChecked: true,
    },
    {
      name: 'full_name',
      label: 'Full Name',
      type: 'char',
      group: 'Basic information',
      help: 'A longer descriptive name, shown in some views.',
      example: 'Sustainable Energy & Storage',
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
