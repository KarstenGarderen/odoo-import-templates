// Field catalog for project.task.type (Task Stages). Extracted from a live
// Odoo 19 instance; the kept fields are identical in Odoo 18.

export default {
  id: 'project.task.type',
  slug: 'task-stages',
  name: 'Task Stages',
  icon: 'layers',
  description: 'The kanban columns tasks move through (New, In Progress, Done…).',
  orderHint: 'Import before Tasks',
  groups: ['Basic information'],
  fields: [
    {
      name: 'name',
      label: 'Stage Name',
      type: 'char',
      required: true,
      group: 'Basic information',
      example: 'In Progress',
      defaultChecked: true,
    },
    {
      name: 'sequence',
      label: 'Sequence',
      type: 'integer',
      group: 'Basic information',
      help: 'Order of the columns on the kanban board (lower = more to the left).',
      example: 10,
      defaultChecked: true,
    },
    {
      name: 'project_ids',
      label: 'Projects',
      type: 'many2many',
      relation: 'project.project',
      group: 'Basic information',
      example: 'Website Redesign Acme',
      importNote:
        'Comma-separated project names this stage is used in, without spaces. Import projects first.',
      defaultChecked: true,
    },
    {
      name: 'fold',
      label: 'Folded',
      type: 'boolean',
      group: 'Basic information',
      help: 'Folded columns are collapsed on the kanban board (typically Done / Cancelled).',
      example: 'FALSE',
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
