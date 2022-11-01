import { describe, assert, expect, it, beforeAll, beforeEach } from 'vitest'
import { Odoo, Partner, Users } from '../src/odoo-api'
import { username, password, db, url } from '../src/constants.js'


// const options: [string, string] = [url, db]
let odoo: Odoo = new Odoo(url, db)
const newPartner = {
  name: "John Doe",
  email: "john.doe@example.com"
}

describe('Connect and perform CRUD operations', () => {
  
  beforeAll(async () => {
    await odoo.login(username, password)
  })
    
    it('login to server', async () => {
        expect(odoo.uid).toBeTruthy()
        assert.isAbove(odoo.uid, 0)
    })

    it("Read partner", async () => {
      const partners = await odoo.env("res.partner").browse<Partner>([2,1])
      expect( partners.length).toEqual(2)
    })

    // **************** SKIPPED *************************** //
    it.skip("Creates and delete a partner", async () => {
        const resPartner = odoo.env('res.partner')
        try {
          // Create
          const partnerId = await resPartner.create<Partner>(newPartner as Partner)
          expect(partnerId).toBeTruthy()
          console.log('Partner ID: ', partnerId)

          // Update
          const newValues = { name: 'Test', email: 'test@example.com' }
          let result: boolean = await resPartner.write(partnerId, newValues as Partner)
          expect(result).toBeTruthy()
          const updatedPartner = await resPartner.browse<Partner>(partnerId)
          expect({name: updatedPartner[0].name, email: updatedPartner[0].email}).toEqual(newValues)

          // Delete
          result = await resPartner.unlink(partnerId)
          expect(result).toBeTruthy()
  
        } catch (e) {
          console.error(`ERROR: ${e}`)
        }
      })
      
      it("Search and read a partner by id", async () => {
        const partners = await odoo.env('res.partner')
          .search_read<Partner>([['id', '=', '1']], ['id'])
        expect(partners[0].id).toEqual(1)
      })

      it("Search and count partners", async () => {
        const nbrOfPartners = await odoo.env('res.partner')
          .search_count([['id', '=', '1']])
        expect(nbrOfPartners).toEqual(1)
      })

      it("Search and read partners with random limit", async () => {
        const resPartner = odoo.env('res.partner')
        const domainParams = [['id', '>', '0']]
        const countPartners = await resPartner.search_count(domainParams)
        const rndCount = Math.round(Math.random()*countPartners)+1
        const partners = await resPartner.search_read<Partner>(domainParams, ['id'], rndCount)
        expect(partners.length).toEqual(rndCount)
      })

      it("Search and read partners ordered by id with limit and offset", async () => {
        const resPartner = odoo.env('res.partner')
        const domainParams = [['id', '>', '0']]
        const partners = await resPartner.search_read<Partner>(domainParams, ['id'], 5, 1, "id ASC")
        expect(partners.length).toEqual(5)
        // console.log(`ID with offset: ${partners[0].id}`)
        expect(partners[0].id).toBeGreaterThan(1)
      })

      it("Search for partner by Id", async () => {
        const Ids = await odoo.env('res.partner')
          .search([['id', '=', '1']])
        expect(Ids.length).toEqual(1)
      })

      it("Find multiple partners by Id", async () => {
        const Ids = await odoo.env('res.partner')
          .search([['id', '<', '10']])
        expect(Ids.length).toBeGreaterThan(1)
      })

      it("Inspect partner", async () => {
        const partnerFields = await odoo.env('res.partner')
          .fields_get(['id', 'name', 'create_date'], ['string', 'type','required'])                
        expect(JSON.stringify(partnerFields)).toStrictEqual('{"name":{"type":"char","required":false,"string":"Name"},"id":{"type":"integer","required":false,"string":"ID"},"create_date":{"type":"datetime","required":false,"string":"Created on"}}')
      })


      it("Read users from res.user", async () => {
        const records = await odoo.env("res.users").read([2,1])
        expect(records.length === 2).toBeTruthy()
      })
      
      it("Read res.user login", async () => {
        const users = await odoo.env("res.users").browse<Users>(2, ["login"])        
        expect(users[0].login).toBeTruthy()
      })

})