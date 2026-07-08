// Field catalog for project.tags (Project Tags). Extracted from a live Odoo 19
// instance; identical in Odoo 18.

export default {
  id: 'project.tags',
  slug: 'project-tags-model',
  name: 'Project Tags',
  icon: 'tag',
  description: 'Tags used on projects and tasks.',
  orderHint: 'Import before Projects and Tasks if they reference tags',
  groups: ['Basic information'],
  fields: [
    {
      name: 'name',
      label: 'Tag Name',
      type: 'char',
      required: true,
      group: 'Basic information',
      example: 'Design',
      defaultChecked: true,
    },
    {
      name: 'color',
      label: 'Color Index',
      type: 'integer',
      group: 'Basic information',
      example: 5,
      importNote: 'A number from 0 to 11. 0 = transparent (not visible on the kanban board).',
    },
  ],
}
