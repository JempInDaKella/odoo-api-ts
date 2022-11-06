import * as dotenv from 'dotenv'

const result: dotenv.DotenvConfigOutput = dotenv.config()

if (result.error) {
  throw result.error
}

const username=process.env['ODOO_USERNAME'] as string
const password=process.env['ODOO_PASSWORD'] as string
const db=process.env['ODOO_DB'] as string
const url=process.env['ODOO_URL'] as string

export { username, password, db, url }