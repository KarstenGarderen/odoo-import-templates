// Field catalog for crm.tag (CRM Tags). Extracted from a live Odoo 19
// instance; identical in Odoo 18.

export default {
  id: 'crm.tag',
  slug: 'crm-tags',
  name: 'CRM Tags',
  icon: 'tag',
  description: 'Tags to classify leads and opportunities (Training, Service…).',
  orderHint: 'Import before Leads / Opportunities if they reference tags',
  groups: ['Basic information'],
  fields: [
    {
      name: 'name',
      label: 'Tag Name',
      type: 'char',
      required: true,
      group: 'Basic information',
      example: 'Training',
      defaultChecked: true,
    },
    {
      name: 'color',
      label: 'Color Index',
      type: 'integer',
      group: 'Basic information',
      example: 4,
      importNote: 'A number from 0 to 11 — picks the tag color shown in Odoo.',
    },
  ],
}
