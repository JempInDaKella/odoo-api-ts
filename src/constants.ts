import * as dotenv from 'dotenv'

const result: dotenv.DotenvConfigOutput = dotenv.config()

if (result.error) {
  throw result.error
}

const username: string =process.env['ODOO_USERNAME']
const password: string =process.env['ODOO_PASSWORD']
const db: string =process.env['ODOO_DB']
const url: string =process.env['ODOO_URL']

export { username, password, db, url }