// Field catalog for product.category (Product Categories). Extracted from a
// live Odoo 19 instance; identical in Odoo 18.

export default {
  id: 'product.category',
  slug: 'product-categories',
  name: 'Product Categories',
  icon: 'folder',
  description: 'The category tree your products are organized in.',
  orderHint: 'Import before Products',
  groups: ['Basic information', 'Accounting'],
  fields: [
    {
      name: 'name',
      label: 'Category Name',
      type: 'char',
      required: true,
      group: 'Basic information',
      example: 'Office Furniture',
      defaultChecked: true,
    },
    {
      name: 'parent_id',
      label: 'Parent Category',
      type: 'many2one',
      relation: 'product.category',
      group: 'Basic information',
      example: 'Furniture',
      importNote:
        'Exact name of another category. Put parent categories on earlier rows in this file (or import them first).',
      defaultChecked: true,
    },
    {
      name: 'property_account_income_categ_id',
      label: 'Income Account',
      type: 'many2one',
      relation: 'account.account',
      group: 'Accounting',
      help: 'Used when validating a customer invoice for products in this category.',
      example: '400000 Product Sales',
      importNote: 'Account code + name exactly as in your chart of accounts.',
    },
    {
      name: 'property_account_expense_categ_id',
      label: 'Expense Account',
      type: 'many2one',
      relation: 'account.account',
      group: 'Accounting',
      example: '600000 Cost of Goods Sold',
      importNote: 'Account code + name exactly as in your chart of accounts.',
    },
  ],
}
