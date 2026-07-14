# Odoo Import Templates

A free, fully static template generator for importing data into **Odoo 18 and 19**.
Pick a module → record type → fields, and download a ready-to-fill Excel import
template with one example row, field explanations, dropdown validations and a
step-by-step Instructions sheet. Developers get a matching copy-paste Python
import script (stdlib XML-RPC + openpyxl).

Everything runs in the browser — no backend, no login, no data leaves the page.

## Covered models

| Module | Record types |
|---|---|
| Contacts | Contacts, Contact Tags, Bank Accounts, Banks, Industries |
| Sales | Products, Product Categories, Product Tags, Pricelists, Pricelist Rules, Sales Orders (incl. order lines) |
| Projects | Projects, Tasks, Task Stages, Project Tags, Milestones |
| CRM | Leads / Opportunities, Sales Teams, Pipeline Stages, CRM Tags |

Field catalogs were extracted from a live Odoo 19 instance and version-checked
against the official [odoo/odoo](https://github.com/odoo/odoo) 18.0/19.0 source.
Version-specific fields (e.g. `mobile` on contacts, `order_line/tax_id` vs
`tax_ids`, task priority levels) switch automatically with the Odoo version
toggle. Fields contributed by optional apps (Timesheets, Sales, Inventory,
Enterprise scheduling) are included and flagged with the app they require.

## Development

```bash
npm install
npm run dev      # local dev server
npm run verify   # build all template variants and assert their contents
npm run build    # production build (dist/)
```

Adding a model = one catalog file in `src/data/` + one line in
`src/data/registry.js`. See `.claude/skills/add-odoo-model/SKILL.md` for the
full workflow (metadata extraction, version verification, curation rules).

## Deployment

Pushes to `main` build and deploy to GitHub Pages automatically
(`.github/workflows/deploy.yml`). The verify suite runs in CI before every deploy.
