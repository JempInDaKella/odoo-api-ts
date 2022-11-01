/**
 * Odoo JSONRPC API
 */
 import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

 type LoginParams = { db: string, login: string, password: string }
 
 type OdooTimeZone = { lang: string, tz: string, uid: number }
 type OdooCurrencyType = { symbol: string, position: 'before'|'after', digits: any[] }
 
 type OdooLoginResponse = {
     uid: number,
     is_system: boolean,
     is_admin: boolean,
     user_context: OdooTimeZone,
     db: string,
     server_version: string,
     server_version_info: (string | number)[],
     support_url: string,
     name: string,
     username: string,
     partner_display_name: string,
     company_id: number,
     partner_id: number,
     "web.base.url": string,
     active_ids_limit: number,
     profile_session: string, // null
     profile_collectors: string, //null
     profile_params: string, //null
     max_file_upload_size: number, //134217728
     home_action_id: boolean,
     cache_hashes: {
       translations: string,
       load_menus: string,
       qweb: string,
       assets_discuss_public: string
     },
     currencies: { "2": OdooCurrencyType },
     user_companies: { current_company: number, allowed_companies: { "1": any[] } },
     show_effect: boolean,
     display_switch_company_menu: boolean,
     user_id: numbers,
     company_currency_id: number,
     companies_currency_id: { "1": number },
     warning: string,
     expiration_date: string, // Date in format: 'YYYY-MM-DD hh:mm:ss'
     expiration_reason: string, // 'trial' or ...
     web_tours: any[],
     tour_disable: boolean,
     notification_type: string, // 'email'
     map_box_token: boolean,
     odoobot_initialized: boolean,
     ocn_token_key: boolean,
     fcm_project_id: boolean,
     inbox_action: number,
     iap_company_enrich: boolean,
     dbuuid: string,
     multi_lang: boolean
 }
 
 type OdooRequestParams = {
     kwargs?: {
         context?: object
     },
     model?: string,
     service?: "object"|"action", 
     method?: "execute_kw"|"fields_get", 
     args: any[]
 }
 
 const defaultHeaders = {
     "Content-Type": "application/json",
     "Accept": "application/json"
 }
 
 type numbers = number[]
 
 const responseBody = (response: AxiosResponse) => response.data
 // Shortcuts methods
 // const requests = {
 //   get: (url: string) => axios.get(url).then(responseBody),
 //   post: (url: string, body = {}) => axios.post(url, body).then(responseBody),
 //   put: (url: string, body = {}) => axios.put(url, body).then(responseBody),
 //   del: (url: string, body = {}) => axios.delete(url, body).then(responseBody)
 // }
 

 // Models Types
 interface TModel {
  id?: number
  name?: string
  display_name?: string
 }

 interface Partner extends TModel {
  message_is_follower: boolean
  message_follower_ids: string //one2many
  message_partner_ids: string //many2many
  message_ids: string //one2many
  has_message: boolean
  message_unread: boolean
  message_unread_counter: number
  message_needaction: boolean
  message_needaction_counter: number
  message_has_error: boolean
  message_has_error_counter: number
  message_attachment_count: number
  message_main_attachment_id: string //many2one
  message_has_sms_error: boolean
  email_normalized: string
  is_blacklisted: boolean
  message_bounce: number
  activity_ids: string //one2many
  activity_state: string
  activity_user_id: string //many2one
  activity_type_id: string //many2one
  activity_type_icon: string
  activity_date_deadline: string //date
  my_activity_date_deadline: string //date
  activity_summary: string
  activity_exception_decoration: string
  activity_exception_icon: string
  image_1920: string
  image_1024: string
  image_512: string
  image_256: string
  image_128: string
  avatar_1920: string
  avatar_1024: string
  avatar_512: string
  avatar_256: string
  avatar_128: string
  name: string
  display_name: string
  date: boolean
  title: boolean
  parent_id: boolean
  parent_name: boolean
  child_ids: []
  ref: boolean
  lang: string //en_US
  active_lang_count: number
  tz: boolean
  tz_offset: string //'+0000'
  user_id: boolean
  vat: boolean
  same_vat_partner_id: boolean
  bank_ids: []
  website: string
  comment: string
  category_id: []
  credit_limit: number
  active: boolean
  employee: boolean
  function: boolean
  type: string //'contact'
  street: string
  street2: boolean
  zip: string
  city: string
  state_id: [ number, string ]
  country_id: [ number, string ]
  country_code: string //'US'
  partner_latitude: number
  partner_longitude: number
  email: string
  email_formatted: string
  phone: string
  mobile: boolean
  is_company: boolean
  is_public: boolean
  industry_id: boolean
  company_type: string //company
  company_id: boolean
  color: number
  user_ids: []
  partner_share: boolean
  contact_address: string
  commercial_partner_id: [ number, string ]
  commercial_company_name: string
  company_name: boolean
  barcode: boolean
  self: [ number, string ]
  __last_update: string //'2022-09-14 22:47:33'
  create_uid: boolean
  create_date: string //'2022-09-14 21:53:12'
  write_uid: [ number, string ]
  write_date: string //'2022-09-14 22:47:33'
  im_status: string //'im_partner'
  channel_ids: []
  contact_address_complete: string //'Toledo, Ohio, United States'
  image_medium: string
  signup_token: boolean
  signup_type: boolean
  signup_expiration: boolean
  signup_valid: boolean
  signup_url: boolean
  ocn_token: boolean
  partner_gid: number
  additional_info: boolean
  phone_sanitized: boolean
  phone_sanitized_blacklisted: boolean
  phone_blacklisted: boolean
  mobile_blacklisted: boolean
  phone_mobile_search: boolean
  x_studio_fax: boolean
  x_x_studio_client_x_invoice_count: number
}

interface Users extends TModel {
  partner_id: string //many2one
  login:  string //char
  password?: string //char
  new_password?: string //char
  signature?: string //html
  active?: boolean
  active_partner?: boolean
  action_id?: string //many2one
  groups_id?: []//many2many
  log_ids?: []//one2many
  login_date?: string //datetime
  share?: boolean
  companies_count?: number
  tz_offset?: string //char
  company_id  :  string //many2one
  company_ids?: []//many2many
  name?: string //char
  email?: string //char
  accesses_count?: number
  rules_count?: number
  groups_count?: number
  id?: number
  __last_update?: string //datetime
  display_name?: string //char
  create_uid?: string //many2one
  create_date?: string //datetime
  write_uid?: string //many2one
  write_date?: string //datetime
  api_key_ids?: []//one2many
  totp_enabled?: boolean
  totp_trusted_device_ids?: []//one2many
  im_status?: string //char
  resource_ids?: []//one2many
  resource_calendar_id?: string //many2one
  notification_type  :  [] //selection
  res_users_settings_ids?: []//one2many
  state?: [] //selection
  odoobot_state?: [] //selection
  odoobot_failed?: boolean
  oauth_uid?: string //char
  odoo_com_uid?: string //char
  message_is_follower?: boolean
  message_follower_ids?: []//one2many
  message_partner_ids?: []//many2many
  message_ids?: []//one2many
  has_message?: boolean
  message_unread?: boolean
  message_unread_counter?: number
  message_needaction?: boolean
  message_needaction_counter?: number
  message_has_error?: boolean
  message_has_error_counter?: number
  message_attachment_count?: number
  message_main_attachment_id?: string //many2one
  message_has_sms_error?: boolean
  email_normalized?: string //char
  is_blacklisted?: boolean
  message_bounce?: number
  activity_ids?: []//one2many
  activity_state?: [] //selection
  activity_user_id?: string //many2one
  activity_type_id?: string //many2one
  activity_type_icon?: string //char
  activity_date_deadline?: string //date
  my_activity_date_deadline?: string //date
  activity_summary?: string //char
  activity_exception_decoration?: [] //selection
  activity_exception_icon?: string //char
  image_1920?: string //binary
  image_1024?: string //binary
  image_512?: string //binary
  image_256?: string //binary
  image_128?: string //binary
  avatar_1920?: string //binary
  avatar_1024?: string //binary
  avatar_512?: string //binary
  avatar_256?: string //binary
  avatar_128?: string //binary
  date?: string //date
  title?: string //many2one
  parent_id?: string //many2one
  parent_name?: string //char
  child_ids?: []//one2many
  ref?: string //char
  lang?: [] //selection
  active_lang_count?: number
  tz?: [] //selection
  user_id?: string //many2one
  vat?: string //char
  same_vat_partner_id?: string //many2one
  bank_ids?: []//one2many
  website?: string //char
  comment?: string //html
  category_id?: []//many2many
  credit_limit?: number
  employee?: boolean
  function?: string //char
  type?: [] //selection
  street?: string //char
  street2?: string //char
  zip?: string //char
  city?: string //char
  state_id?: string //many2one
  country_id?: string //many2one
  country_code?: string //char
  partner_latitude?: number
  partner_longitude?: number
  email_formatted?: string //char
  phone?: string //char
  mobile?: string //char
  is_company?: boolean
  is_public?: boolean
  industry_id?: string //many2one
  company_type?: [] //selection
  color?: number
  user_ids?: []//one2many
  partner_share?: boolean
  contact_address?: string //char
  commercial_partner_id?: string //many2one
  commercial_company_name?: string //char
  company_name?: string //char
  barcode?: string //char
  self?: string //many2one
  channel_ids?: []//many2many
  contact_address_complete?: string //char
  image_medium?: string //binary
  signup_token?: string //char
  signup_type?: string //char
  signup_expiration?: string //datetime
  signup_valid?: boolean
  signup_url?: string //char
  ocn_token?: string //char
  partner_gid?: number
  additional_info?: string //char
  phone_sanitized?: string //char
  phone_sanitized_blacklisted?: boolean
  phone_blacklisted?: boolean
  mobile_blacklisted?: boolean
  phone_mobile_search?: string //char
  x_studio_fax?: string //char
  x_x_studio_client_x_invoice_count?: number
  sel_groups_2_3?: [] //selection
  sel_groups_1_9_10?: [] //selection
  in_group_11?: boolean
  in_group_7?: boolean
  in_group_12?: boolean
  in_group_8?: boolean
  in_group_4?: boolean
  in_group_5?: boolean
  in_group_6?: boolean
}
 
  class Odoo {
 
     static ODOO_CALL_KW_ENDPOINT: string = "/web/dataset/call_kw"
     static ODOO_CALL_ENDPOINT: string = "/web/dataset/call"
     static ODOO_SEARCH_READ_ENDPOINT: string = "/web/dataset/search_read"
   
     public uid: number
     public sid?: number
     public cookie?: object
     public partnerId?: number
     context?: object
 
     constructor(public host: string, public database: string, protected username: string = '', 
       protected password: string = ''){
         // this.uid = 0
         // this.sid = 0
         // this.cookie = {}
         // this.context = {}
         // Maybe better to config API at this point
         // this.setRequestConfig();
     }
 
     // private setRequestConfig(): void {
     //   axios.defaults.baseURL = `${this.host}/jsonrpc`
     //   axios.interceptors.response.use(undefined, (error) => {
     //     if (error.message === 'Network error' && !error.response){
     //       throw new Error('Network error: Cannot make call to server.')
     //     }
     //     const { status, data, config } = error.response
     //     if (status in [400, 500, 404]){
     //       throw new Error(`Network error: code=${status}`)
     //     } else {
     //       throw new Error('Network error: unknown error.')
     //     }
     //   })
     // }
 
     logout(): void {      
         this.uid = null
         this.partnerId = null
         this.cookie = null
         this.context = null
         this.username = null
         this.password = null
       }
 
       login(username: string, password: string): Promise<OdooLoginResponse> {
         return new Promise/*<OdooLoginResponse>*/((resolve, reject) => {
           let params: LoginParams = {
             db: this.database,
             login: username,
             password: password
           }
     
           let options: AxiosRequestConfig = {
             url: `${this.host}/web/session/authenticate`,
             method: "post",
             data: JSON.stringify({ params: params }),
             withCredentials: true,
             headers: defaultHeaders
           }

           axios(options)
             .then((response /*: Promise<OdooLoginResponse>*/) => {
               if (!response.data.result) {
                 reject("Username or password not valid")
               } else {
                 this.uid = response.data.result.uid
                 this.partnerId = response.data.result.partner_id
                 this.cookie = response.headers["set-cookie"]
                 this.context = response.data.result.user_context
                 this.username = username
                 this.password = password
                 resolve(response.data.result)
               }
             })
             .catch(error => reject(error))
         })
       } // login()
 
       env(model: string): OdooResource {
         return new OdooResource(this, model)
       }
 
       _request<T>(path: string, params: OdooRequestParams, custom: boolean = false): Promise<T | number | boolean> {
      //  _request(path: string, params: OdooRequestParams): Promise<AxiosResponse> {
         params = params || { args: [] }
         path = path || "/"
     
         const auth = [this.database, this.uid, this.password]
         if (!custom){
           params.args = auth.concat(params.args)
         }
         
         let options: AxiosRequestConfig = {
           url: (custom? `${this.host}${path}`: `${this.host}/jsonrpc`),
           method: "post",
           headers: {
             ...defaultHeaders,
             "accept-encoding": "gzip, deflate",
             cookie: `${this.cookie}`,
           },
           data: {
             method: "call",
             jsonrpc: "2.0",
             params
           }
         }
     
         return new Promise<T>((resolve, reject) => {
           return axios(options)
             .then(response => {
               if (response.data.error) reject(response.data.error)
               resolve(response.data.result)
             })
             .catch(reject)
         })
       }
 
 } // Odoo
 
 class OdooResource {
     
     constructor(protected client: Odoo, protected model: string) {}
      
     /** This method is used internally to call Odoo's API */
     private call(method: string, params: object): Promise<any[] | {}> {
       return this.client._request(Odoo.ODOO_CALL_KW_ENDPOINT, {
         service: "object",
         method: "execute_kw",
         args: [this.model, method, params]
       })
     }

     /**
      * Create a model's object
      * @param data Array of objects or model's properties
      * @returns The id of created object
      */
     create<T extends TModel>(data: any[] | T): Promise<number> {
      if (!Array.isArray(data)) {
        data = [data]
      }
  
      return this.client._request<number>(Odoo.ODOO_CALL_KW_ENDPOINT, {
        service: "object",
        method: "execute_kw",
        args: [this.model, "create", data]
      }) as Promise<number>
    }
   
     /**
      * Find and return records
      * @param ids for record(s) to find
      * @param fields array of fields to retreive
      * @returns array or model object
      */
     async read<T extends TModel>(ids: number | numbers, fields: string[] = []): Promise<(typeof ids extends number? T: Array<T>)>{
       if (typeof ids === 'number') {
         ids = [ids]
       }
       const result = await this.client
             ._request<Array<T>>(Odoo.ODOO_CALL_ENDPOINT, {
                 service: "object",
                 method: "execute_kw",
                 args: [this.model, "read", [ids], { fields }]
             })
         if (ids instanceof Number) {
             return result[0]
         } else {
             // ids is an Array
             return result as T[]
         }
     }
   
     /**
      * Find and return records
      * @see {@link read}
      */
     browse<T extends TModel>(ids: number | numbers, fields: string[] = []): Promise<(typeof ids extends number? T: Array<T>)> {
      return this.read<T>(ids, fields)
     }
   
     /**
      * Update or write one or multiple records
      * @param ids of records to be updated/written
      * @param data object of records (or object properties)
      * @returns boolean result (true when success)
      */
     async write<T extends TModel>(ids: number | numbers, data: T): Promise<boolean>  {
      let itemIds: numbers = []
       if (typeof ids === 'number') {
      //  if (!Array.isArray(ids)) {
        itemIds = [ids]
       } else {
        itemIds = ids
       }
       return this.client
          ._request<boolean>(Odoo.ODOO_CALL_KW_ENDPOINT, {
              service: "object",
              method: "execute_kw",
              args: [this.model, "write", [itemIds, data]]
          }) as Promise<boolean>
     }

     /**
      * Delete one or multiple records by id(s)
      * @param ids of records to delete
      * @returns boolean result (true when success)
      */
     async unlink(ids: number | numbers): Promise<boolean> {
       if (!Array.isArray(ids)) {
         ids = [ids]
       }
   
       return this.client._request(Odoo.ODOO_CALL_KW_ENDPOINT, {
         service: "object",
         method: "execute_kw",
         args: [this.model, "unlink", [ids]]
       }) as Promise<boolean>
     }
     
     /**
      * Search and return ids
      * @param params domain array of conditions
      * @returns ids of records
      */
     search(params: Array<string[]>): Promise<numbers> {
       return this.client._request<numbers>(Odoo.ODOO_CALL_KW_ENDPOINT, {
         service: "object",
         method: "execute_kw",
         args: [this.model, "search", [params]]
       }) as Promise<numbers>
     }
   
     /**
      * Return the total nbr of records
      * @param params domain An array of conditions (e.g. [['id','>','1']])
      * @returns total nbr of records
      */
     search_count(params: Array<string[]>): Promise<number> {
       return this.client._request<number>(Odoo.ODOO_CALL_KW_ENDPOINT, {
         service: "object",
         method: "execute_kw",
         args: [this.model, "search_count", [params]]
       }) as Promise<number>
     }
   
     /**
      * Search and return records
      * @param domain An array of conditions (e.g. [['id','>','1']])
      * @param fields A set of fields (e.g. ['id','name','email']) 
      * @param limit A limit number of return for pagination (e.g. 10)
      * @param offset The offset value for pagination (e.g. 5)
      * @param sort The order by clause (e.g. 'id ASC, create_date DESC')
      * @returns A promise for array of resource
      */
     search_read<T extends TModel>(domain: Array<string[]> = [], fields: string[] = [], limit: number = 0, 
      offset: number = 0, sort: string = ""): Promise<T[]> {
       if (!fields.length){
           throw new Error("The search_read method doesn't support an empty fields array.")
       }
   
       return this.client._request<T[]>(Odoo.ODOO_SEARCH_READ_ENDPOINT, {
         service: "object",
         method: "execute_kw",
         args: [
           this.model,
           "search_read",
           [domain],
           {
             fields,
             limit,
             offset,
             order: sort
           }
         ]
       }) as Promise<T[]>
     }
   
     /**
      * Inspect model's fields attributes (data type, required?...)
      * @param fields array of fields
      * @param attributes the attributes to inspect
      * @returns object containing properties
      */
     async fields_get(fields: string[] = [], attributes: string[] = ['string', 'type', 'required', 'help']): Promise<AxiosResponse> {
       return this.client._request(Odoo.ODOO_CALL_KW_ENDPOINT, {
         kwargs: {
           context: this.client.context
          },
         model: this.model,
         method: "fields_get",
         args: [fields, attributes]
       }, true) as Promise<AxiosResponse>
     }
     
   }
 
 export { Odoo, Partner, Users }