// Field catalog for project.milestone (Milestones). Extracted from a live
// Odoo 19 instance; the kept fields are identical in Odoo 18.
// Requires "Milestones" enabled on the project (allow_milestones).

export default {
  id: 'project.milestone',
  slug: 'milestones',
  name: 'Milestones',
  icon: 'flag',
  description: 'Key deliverables within a project. Requires Milestones enabled on the project.',
  orderHint: 'Import after Projects',
  groups: ['Basic information'],
  fields: [
    {
      name: 'name',
      label: 'Milestone Name',
      type: 'char',
      required: true,
      group: 'Basic information',
      example: 'Go-live',
      defaultChecked: true,
    },
    {
      name: 'project_id',
      label: 'Project',
      type: 'many2one',
      relation: 'project.project',
      required: true,
      group: 'Basic information',
      example: 'Website Redesign Acme',
      importNote: 'Exact project name — import projects first, with Milestones enabled.',
      defaultChecked: true,
    },
    {
      name: 'deadline',
      label: 'Deadline',
      type: 'char',
      group: 'Basic information',
      example: '2026-11-01',
      importNote: 'Format YYYY-MM-DD.',
      defaultChecked: true,
    },
    {
      name: 'is_reached',
      label: 'Reached',
      type: 'boolean',
      group: 'Basic information',
      example: 'FALSE',
    },
    {
      name: 'sale_line_id',
      label: 'Sales Order Item',
      type: 'many2one',
      relation: 'sale.order.line',
      group: 'Basic information',
      example: 'S00042 - Website project',
      importNote:
        'Sales order item updated when the milestone is reached. Requires the Sales app; advanced — most imports can delete this column.',
    },
  ],
}
