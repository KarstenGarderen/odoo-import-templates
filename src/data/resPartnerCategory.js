// Field catalog for res.partner.category (Contact Tags).
// Extracted from a live Odoo 19 instance (ir.model.fields); model is identical in Odoo 18.

export default {
  id: 'res.partner.category',
  slug: 'contact-tags',
  name: 'Contact Tags',
  icon: 'tag',
  description: 'Tags to organize your contacts: Wholesale, VIP, Newsletter…',
  orderHint: 'Import before Contacts if they reference tags',
  groups: ['Basic information'],
  fields: [
    {
      name: 'name',
      label: 'Tag Name',
      type: 'char',
      required: true,
      group: 'Basic information',
      example: 'Wholesale',
      defaultChecked: true,
    },
    {
      name: 'parent_id',
      label: 'Parent Tag',
      type: 'many2one',
      relation: 'res.partner.category',
      group: 'Basic information',
      help: 'Makes this tag a sub-tag of another one.',
      example: 'Customers',
      importNote:
        'Exact name of another tag. Put parent tags on earlier rows in this file (or import them first).',
    },
    {
      name: 'color',
      label: 'Color Index',
      type: 'integer',
      group: 'Basic information',
      example: 5,
      importNote: 'A number from 0 to 11 — picks the tag color shown in Odoo.',
    },
    {
      name: 'active',
      label: 'Active',
      type: 'boolean',
      group: 'Basic information',
      help: 'FALSE archives the tag (hidden but not deleted).',
      example: 'TRUE',
    },
  ],
}
