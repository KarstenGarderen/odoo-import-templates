// Field catalog for hr.leave (Time Off requests). Version-verified against
// odoo/odoo 18.0/19.0 source. `state` is read-only (workflow-managed) and
// `date_from`/`date_to`/`number_of_days` are computed — use the writable
// request_date_from/request_date_to instead.

export default {
  id: 'hr.leave',
  slug: 'time-off',
  name: 'Time Off',
  icon: 'calendar',
  description: 'Individual leave requests (holidays, sick days). Requires the Time Off app.',
  orderHint: 'Import last — after Types, Employees and Allocations',
  groups: ['Basic information', 'Dates'],
  fields: [
    {
      name: 'holiday_status_id',
      label: 'Time Off Type',
      type: 'many2one',
      relation: 'hr.leave.type',
      required: true,
      group: 'Basic information',
      example: 'Paid Time Off',
      importNote: 'Exact time off type name — import types first.',
      defaultChecked: true,
    },
    {
      name: 'employee_id',
      label: 'Employee',
      type: 'many2one',
      relation: 'hr.employee',
      required: true,
      group: 'Basic information',
      example: 'Anna Jansen',
      importNote:
        'Exact employee name — import employees first. Use employee_id/id with external IDs when names are not unique.',
      defaultChecked: true,
    },
    {
      name: 'name',
      label: 'Description',
      type: 'char',
      group: 'Basic information',
      example: 'Summer holiday',
    },
    {
      name: 'notes',
      label: 'Reasons',
      type: 'text',
      group: 'Basic information',
      example: 'Family vacation.',
    },
    {
      name: 'department_id',
      label: 'Department',
      type: 'many2one',
      relation: 'hr.department',
      group: 'Basic information',
      example: 'Sales',
      importNote: 'Exact department name. Delete the column to use the employee’s department.',
    },

    // Dates
    {
      name: 'request_date_from',
      label: 'Start Date',
      type: 'char',
      group: 'Dates',
      example: '2026-08-03',
      importNote:
        'Format YYYY-MM-DD. Use this field, not date_from — the actual date_from/date_to are computed by Odoo.',
      defaultChecked: true,
    },
    {
      name: 'request_date_to',
      label: 'End Date',
      type: 'char',
      group: 'Dates',
      example: '2026-08-14',
      importNote: 'Format YYYY-MM-DD. Use this field, not date_to.',
      defaultChecked: true,
    },
  ],
}
