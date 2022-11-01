import { Odoo, Partner } from './odoo-api.js'
import { username, password, db, url } from './constants.js'

let odoo = new Odoo(url, db)

odoo.login(username, password).then(async (results) => {

    console.log(`LoggedIn with UID: ${results.uid}`)

    const res = odoo.env('res.partner')

  // Search count
  const total = await res.search_count([
    ['company_type', '=', 'company']
  ])
  console.log(`${new Date().toLocaleTimeString()}: There are: ${total} companies.`)

  // Find one
  const partner1 = await res.browse<Partner>(1)
  console.log('First partner: ', partner1[0].name)

  // Find multiple
  let partners = await res.browse<Partner>([1,3])
  partners.forEach((partner) => {
    console.log('Partner Name: ', partner.name)
  })

  // Search (find by IDs)
  const partnerIds = await res.search([
    ['id', '<', '5']
  ])
  partnerIds.forEach((partnerId) => {
    console.log('Partner ID: ', partnerId);
  })


  // Search Read (find record)
  partners = await res.search_read<Partner>([
    ['id', '<', '5']
  ], ['name', 'email', 'company_type'])
  partners.forEach((partner) => {
    console.log(`Partner: Name=${partner.name}, Email: ${partner.email}, CompanyType: ${partner.company_type}`)
  })

  /*/ BEGIN OF CREATION
  let newPartner = 'Test6'
  const id = await res.create<Partner>({
    name: newPartner,
    email: `${newPartner}@example.com`
  } as Partner)
  console.log('Created ID: ', id)

  // const createdPartners = await res.search_read<Partner>([['name', '=', newPartner]], ['id'])
  // if (createdPartners.length > 0){
  if (id){
    // // Write (update)
    let result: boolean = await res.write<Partner>(id, {
      name: 'Test5',
      phone: '0550000000',
      email: 'test5@example.com'
    } as Partner)
    if (result){
      console.log(`Updating partner ID: ${id} successfull.`)
    } else {
      console.error(`Could not updating partner ID: ${id}.`)
    }

    // Or:
    // await odoo.env('res.partner').write([1, 2, 3], {
    //   name: 'Test',
    //   email: 'test@example.com'
    // })
        
    result = await res.unlink(id)

    if (result){
      console.log('Partner ID: ', id, ' deleted.')
    } else {
      console.log('Cannot delete partner ID: ', id) 
    }
  }*/
  // END OF CREATION

  const partnerFields = await res.fields_get(['id', 'name', 'email'], ['string', 'type','required', 'help'])
  console.log(partnerFields)

  // or
  // res.fields_get(['id', 'name', 'email'], 
  //   ['string', 'type','required', 'help']).then((partnerFields) => {
  //     console.log(partnerFields)
  // })

  // Inspect res.users
  const usersFields = await odoo.env('res.users').fields_get(['partner_id','login','name','email','companies_count'], ['type', 'required'])
  console.log(usersFields)

}).then(() => {
  // logout when done
  odoo.logout()
})
.catch(error => console.error(error) )
