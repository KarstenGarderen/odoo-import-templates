// Field catalog for stock.warehouse (Warehouses). Version-verified against
// odoo/odoo 18.0/19.0 source (tripleorange has no Inventory app installed).

export default {
  id: 'stock.warehouse',
  slug: 'warehouses',
  name: 'Warehouses',
  icon: 'warehouse',
  description: 'Your physical warehouses. Requires the Inventory app.',
  orderHint: 'Import before Locations, Lots and Stock',
  groups: ['Basic information', 'Routes'],
  fields: [
    {
      name: 'name',
      label: 'Warehouse Name',
      type: 'char',
      required: true,
      group: 'Basic information',
      example: 'Amsterdam Warehouse',
      defaultChecked: true,
    },
    {
      name: 'code',
      label: 'Short Name',
      type: 'char',
      required: true,
      group: 'Basic information',
      help: 'Short code (max 5 characters) used to identify the warehouse.',
      example: 'AMS',
      defaultChecked: true,
    },
    {
      name: 'partner_id',
      label: 'Address',
      type: 'many2one',
      relation: 'res.partner',
      group: 'Basic information',
      example: 'My Company',
      importNote: 'Exact contact name used as the warehouse address.',
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
    {
      name: 'sequence',
      label: 'Sequence',
      type: 'integer',
      group: 'Basic information',
      help: 'Display order of the warehouses (lower is first).',
      example: 10,
    },
    {
      name: 'active',
      label: 'Active',
      type: 'boolean',
      group: 'Basic information',
      example: 'TRUE',
    },

    // Routes
    {
      name: 'reception_steps',
      label: 'Incoming Shipments',
      type: 'selection',
      group: 'Routes',
      options: [
        { value: 'one_step', label: 'Receive and Store (1 step)' },
        { value: 'two_steps', label: 'Receive then Store (2 steps)' },
        { value: 'three_steps', label: 'Receive, QC, then Store (3 steps)' },
      ],
      example: 'one_step',
      defaultChecked: true,
    },
    {
      name: 'delivery_steps',
      label: 'Outgoing Shipments',
      type: 'selection',
      group: 'Routes',
      options: [
        { value: 'ship_only', label: 'Deliver (1 step)' },
        { value: 'pick_ship', label: 'Pick then Deliver (2 steps)' },
        { value: 'pick_pack_ship', label: 'Pick, Pack, then Deliver (3 steps)' },
      ],
      example: 'ship_only',
      defaultChecked: true,
    },
  ],
}
