# Odoo API

Odoo JSON RPC client that should works for both Node.js and Browser, it depends only on `axios` for http request and `dotenv` to store account params.

## Features:
- Fully typed with TypeScript
- Easy to use
- Can be extended with modules
- Fast with Vite & Vitest.

## How to use?

1- Create `.env` from `.env.example`:
```bash
cp .env.example .env
```
2- Set account params in `.env` file (username, password...).

3- Install depedencies:
```bash
npm install
```

4- Run unit tests:
```bash
npm run test
```

## Usage examples:
Create a partner:
```ts

let odoo = new Odoo('https://database-name.odoo.com', 'database-name')

odoo.login('username', 'password').then(async (results) => {

    console.log(`LoggedIn with UID: ${results.uid}`)

    const res = odoo.env('res.partner')

  // Search count
  const total = await res.search_count([
    ['company_type', '=', 'company']
  ])
  console.log(`${new Date().toLocaleTimeString()}: There are: ${total} companies.`)

  // Find a partner by id
  const partner1 = await res.browse<Partner>(1)
  console.log('partner: ', partner1)

  // Search Read
  partners = await res.search_read<Partner>([
    ['id', '<', '5']
  ], ['name', 'email', 'company_type'])
  partners.forEach((partner) => {
    console.log(`Partner: Name=${partner.name}, Email: ${partner.email}, CompanyType: ${partner.company_type}`)
  })

  // Create a partner
  const id = await res.create<Partner>({
    name: 'newPartner',
    email: `newPartner@example.com`
  } as Partner)
  console.log('Created ID: ', id)

  // Delete a partner
    const result: boolean = await res.unlink(id)
    if (result){
        console.log('Partner ID: ', id, ' deleted.')
    } else {
        console.log('Cannot delete partner ID: ', id) 
    }

  // Inspect parnter model
  const partnerFields = await res.fields_get(['id', 'name', 'email'], ['type','required'])
  console.log(partnerFields)

}).catch(error => console.error(error) )

```

## LICENSE
MIT
