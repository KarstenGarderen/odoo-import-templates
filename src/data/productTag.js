// Field catalog for product.tag (Product Tags). Extracted from a live Odoo 19
// instance; identical in Odoo 18 (color is a hex string in both).

export default {
  id: 'product.tag',
  slug: 'product-tags',
  name: 'Product Tags',
  icon: 'tag',
  description: 'Tags to label and filter your products.',
  orderHint: 'Import before Products if products reference them',
  groups: ['Basic information'],
  fields: [
    {
      name: 'name',
      label: 'Tag Name',
      type: 'char',
      required: true,
      group: 'Basic information',
      example: 'Eco-friendly',
      defaultChecked: true,
    },
    {
      name: 'color',
      label: 'Color',
      type: 'char',
      group: 'Basic information',
      example: '#2E86AB',
      importNote: 'Hex color code, e.g. #3C3C3C.',
    },
  ],
}
