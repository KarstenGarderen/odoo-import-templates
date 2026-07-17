// Field catalog for stock.lot (Lots / Serial Numbers). Version-verified against
// odoo/odoo 18.0/19.0 source. expiration_date etc. come from the product_expiry
// module (Expiration Dates setting).

export default {
  id: 'stock.lot',
  slug: 'lots-serials',
  name: 'Lots / Serial Numbers',
  icon: 'barcode',
  description: 'Lot and serial numbers for tracked products. Requires the Inventory app.',
  orderHint: 'Import after Products (with tracking enabled)',
  groups: ['Basic information', 'Expiration'],
  fields: [
    {
      name: 'name',
      label: 'Lot / Serial Number',
      type: 'char',
      required: true,
      group: 'Basic information',
      example: 'LOT-2026-0001',
      defaultChecked: true,
    },
    {
      name: 'product_id',
      label: 'Product',
      type: 'many2one',
      relation: 'product.product',
      required: true,
      group: 'Basic information',
      example: 'Printer Paper A4',
      importNote:
        'Exact product name — the product must have Lot/Serial tracking enabled. Import products first.',
      defaultChecked: true,
    },
    {
      name: 'ref',
      label: 'Internal Reference',
      type: 'char',
      group: 'Basic information',
      help: 'Your reference, if it differs from the manufacturer’s lot/serial number.',
      example: 'REF-0001',
    },
    {
      name: 'company_id',
      label: 'Company',
      type: 'many2one',
      relation: 'res.company',
      group: 'Basic information',
      example: 'My Company',
      importNote: 'Only needed in multi-company databases. Exact company name.',
    },

    // Expiration (product_expiry module)
    {
      name: 'expiration_date',
      label: 'Expiration Date',
      type: 'char',
      group: 'Expiration',
      example: '2027-01-01 00:00:00',
      importNote: 'Format YYYY-MM-DD HH:MM:SS (UTC). Requires the Expiration Dates setting (product_expiry).',
    },
    {
      name: 'use_date',
      label: 'Best Before Date',
      type: 'char',
      group: 'Expiration',
      example: '2026-12-01 00:00:00',
      importNote: 'Format YYYY-MM-DD HH:MM:SS (UTC). Requires the Expiration Dates setting.',
    },
    {
      name: 'removal_date',
      label: 'Removal Date',
      type: 'char',
      group: 'Expiration',
      example: '2026-12-15 00:00:00',
      importNote: 'Format YYYY-MM-DD HH:MM:SS (UTC). Requires the Expiration Dates setting.',
    },
  ],
}
