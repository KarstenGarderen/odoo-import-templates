// Registry of modules → models. Adding a new model = add a catalog file and list it here.
import resPartner from './resPartner.js'
import resPartnerCategory from './resPartnerCategory.js'
import resPartnerBank from './resPartnerBank.js'
import resBank from './resBank.js'
import resPartnerIndustry from './resPartnerIndustry.js'
import productTemplate from './productTemplate.js'
import productCategory from './productCategory.js'
import productTag from './productTag.js'
import productPricelist from './productPricelist.js'
import productPricelistItem from './productPricelistItem.js'
import saleOrder from './saleOrder.js'
import projectProject from './projectProject.js'
import projectTask from './projectTask.js'
import projectTaskType from './projectTaskType.js'
import projectTags from './projectTags.js'
import projectMilestone from './projectMilestone.js'
import crmLead from './crmLead.js'
import crmTeam from './crmTeam.js'
import crmStage from './crmStage.js'
import crmTag from './crmTag.js'
import purchaseOrder from './purchaseOrder.js'
import productSupplierinfo from './productSupplierinfo.js'

export const ODOO_VERSIONS = ['18', '19']
export const DEFAULT_VERSION = '19'

export const MODULES = [
  {
    id: 'contacts',
    name: 'Contacts',
    icon: 'people',
    description: 'The people and companies you work with: customers, vendors, addresses.',
    models: [resPartner, resPartnerCategory, resPartnerBank, resBank, resPartnerIndustry],
  },
  {
    id: 'sales',
    name: 'Sales',
    icon: 'cart',
    description: 'Everything you sell: products, categories, pricelists and sales orders.',
    models: [productTemplate, productCategory, productTag, productPricelist, productPricelistItem, saleOrder],
  },
  {
    id: 'projects',
    name: 'Projects',
    icon: 'briefcase',
    description: 'Project management: projects, tasks, stages, tags and milestones.',
    models: [projectProject, projectTask, projectTaskType, projectTags, projectMilestone],
  },
  {
    id: 'crm',
    name: 'CRM',
    icon: 'target',
    description: 'Sales pipeline: leads, opportunities, teams, stages and tags.',
    models: [crmLead, crmTeam, crmStage, crmTag],
  },
  {
    id: 'purchase',
    name: 'Purchase',
    icon: 'inbox',
    description: 'Buying from vendors: purchase orders and vendor pricelists.',
    models: [purchaseOrder, productSupplierinfo],
  },
]

// Every model gets an External ID column as its first field. It is what makes
// imports re-runnable: Odoo remembers the ID, so importing the same file again
// updates the existing records instead of creating duplicates.
function externalIdField(model) {
  return {
    name: 'id',
    label: 'External ID',
    type: 'char',
    group: model.groups[0],
    help:
      'A unique code you invent for each row. Odoo remembers it: if you import the file again later, rows with the same ID update the existing records instead of creating duplicates.',
    example: `import_${model.slug}_0001`,
    importNote:
      'Letters, numbers, dots and underscores only — no spaces. Keep a consistent pattern and number on: _0001, _0002…',
    defaultChecked: true,
  }
}

// Fields of a model available in a given Odoo version, in catalog order.
export function fieldsForVersion(model, version) {
  return [
    externalIdField(model),
    ...model.fields.filter((f) => !f.versions || f.versions.includes(version)),
  ]
}

// Field names that should be pre-selected for a fresh template.
export function defaultSelection(model, version) {
  return new Set(
    fieldsForVersion(model, version)
      .filter((f) => f.required || f.defaultChecked)
      .map((f) => f.name)
  )
}
