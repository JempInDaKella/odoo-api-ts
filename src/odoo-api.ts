import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios'

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
    profile_session: string,
    profile_collectors: string,
    profile_params: string,
    max_file_upload_size: number,
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
    user_id: number,
    company_currency_id: number,
    companies_currency_id: { "1": number },
    warning: string,
    expiration_date: string,
    expiration_reason: string,
    web_tours: any[],
    tour_disable: boolean,
    notification_type: string,
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
    "Accept": "application/json",
    "X-Requested-With": "XMLHttpRequest"
}

type numbers = number[]

interface TModel {
 id?: number
 name?: string
 display_name?: string
}

interface Partner extends TModel {
  message_is_follower: boolean
  message_follower_ids: string
  message_partner_ids: string
  message_ids: string
  has_message: boolean
  message_unread: boolean
  message_unread_counter: number
  message_needaction: boolean
  message_needaction_counter: number
  message_has_error: boolean
  message_has_error_counter: number
  message_attachment_count: number
  message_main_attachment_id: string
  message_has_sms_error: boolean
  email_normalized: string
  is_blacklisted: boolean
  message_bounce: number
  activity_ids: string
  activity_state: string
  activity_user_id: string
  activity_type_id: string
  activity_type_icon: string
  activity_date_deadline: string
  my_activity_date_deadline: string
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
  lang: string
  active_lang_count: number
  tz: boolean
  tz_offset: string
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
  type: string
  street: string
  street2: boolean
  zip: string
  city: string
  state_id: [ number, string ]
  country_id: [ number, string ]
  country_code: string
  partner_latitude: number
  partner_longitude: number
  email: string
  email_formatted: string
  phone: string
  mobile: boolean
  is_company: boolean
  is_public: boolean
  industry_id: boolean
  company_type: string
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
  __last_update: string
  create_uid: boolean
  create_date: string
  write_uid: [ number, string ]
  write_date: string
  im_status: string
  channel_ids: []
  contact_address_complete: string
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
  partner_id: string
  login:  string
  password?: string
  new_password?: string
  signature?: string
  active?: boolean
  active_partner?: boolean
  action_id?: string
  groups_id?: []
  log_ids?: []
  login_date?: string
  share?: boolean
  companies_count?: number
  tz_offset?: string
  company_id: string
  company_ids?: []
  name?: string
  email?: string
  accesses_count?: number
  rules_count?: number
  groups_count?: number
  id?: number
  __last_update?: string
  display_name?: string
  create_uid?: string
  create_date?: string
  write_uid?: string
  write_date?: string
  api_key_ids?: []
  totp_enabled?: boolean
  totp_trusted_device_ids?: []
  im_status?: string
  resource_ids?: []
  resource_calendar_id?: string
  notification_type: []
  res_users_settings_ids?: []
  state?: []
  odoobot_state?: []
  odoobot_failed?: boolean
  oauth_uid?: string
  odoo_com_uid?: string
  message_is_follower?: boolean
  message_follower_ids?: []
  message_partner_ids?: []
  message_ids?: []
  has_message?: boolean
  message_unread?: boolean
  message_unread_counter?: number
  message_needaction?: boolean
  message_needaction_counter?: number
  message_has_error?: boolean
  message_has_error_counter?: number
  message_attachment_count?: number
  message_main_attachment_id?: string
  message_has_sms_error?: boolean
  email_normalized?: string
  is_blacklisted?: boolean
  message_bounce?: number
  activity_ids?: []
  activity_state?: []
  activity_user_id?: string
  activity_type_id?: string
  activity_type_icon?: string
  activity_date_deadline?: string
  my_activity_date_deadline?: string
  activity_summary?: string
  activity_exception_decoration?: []
  activity_exception_icon?: string
  image_1920?: string
  image_1024?: string
  image_512?: string
  image_256?: string
  image_128?: string
  avatar_1920?: string
  avatar_1024?: string
  avatar_512?: string
  avatar_256?: string
  avatar_128?: string
  date?: string
  title?: string
  parent_id?: string
  parent_name?: string
  child_ids?: []
  ref?: string
  lang?: []
  active_lang_count?: number
  tz?: []
  user_id?: string
  vat?: string
  same_vat_partner_id?: string
  bank_ids?: []
  website?: string
  comment?: string
  category_id?: []
  credit_limit?: number
  employee?: boolean
  function?: string
  type?: []
  street?: string
  street2?: string
  zip?: string
  city?: string
  state_id?: string
  country_id?: string
  country_code?: string
  partner_latitude?: number
  partner_longitude?: number
  email_formatted?: string
  phone?: string
  mobile?: string
  is_company?: boolean
  is_public?: boolean
  industry_id?: string
  company_type?: []
  color?: number
  user_ids?: []
  partner_share?: boolean
  contact_address?: string
  commercial_partner_id?: string
  commercial_company_name?: string
  company_name?: string
  barcode?: string
  self?: string
  channel_ids?: []
  contact_address_complete?: string
  image_medium?: string
  signup_token?: string
  signup_type?: string
  signup_expiration?: string
  signup_valid?: boolean
  signup_url?: string
  ocn_token?: string
  partner_gid?: number
  additional_info?: string
  phone_sanitized?: string
  phone_sanitized_blacklisted?: boolean
  phone_blacklisted?: boolean
  mobile_blacklisted?: boolean
  phone_mobile_search?: string
  x_studio_fax?: string
  x_x_studio_client_x_invoice_count?: number
  sel_groups_2_3?: []
  sel_groups_1_9_10?: []
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

  public uid?: number
  public sid?: number
  public cookie?: object
  public partnerId?: number
  context?: object

  constructor(public host: string, public database: string, protected username: string = '', 
    protected password: string = '') {}

  logout(): void {      
    this.uid = 0
    this.cookie = undefined
    this.context = undefined
    this.username = ''
    this.password = ''
  }

  login(username: string, password: string): Promise<OdooLoginResponse> {
    return new Promise((resolve, reject) => {
      const params: LoginParams = {
        db: this.database,
        login: username,
        password: password
      }

      const options: AxiosRequestConfig = {
        url: `${this.host}/web/session/authenticate`,
        method: "post",
        headers: {
          ...defaultHeaders,
          'Origin': window.location.origin
        },
        withCredentials: true,
        data: {
          jsonrpc: "2.0",
          method: "call",
          params: params
        }
      }

      axios(options)
        .then((response: AxiosResponse) => {
          if (response.data.error) {
            reject(response.data.error)
          } else if (!response.data.result) {
            reject(new Error("Invalid response from server"))
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
        .catch((error) => {
          console.error('Login error details:', error)
          reject(error)
        })
    })
  }

  env(model: string): OdooResource {
    return new OdooResource(this, model)
  }

  _request<T>(path: string, params: OdooRequestParams, custom: boolean = false): Promise<T | number | boolean> {
    params = params || { args: [] }
    path = path || "/"

    const auth = [this.database, this.uid, this.password]
    if (!custom) {
      params.args = auth.concat(params.args)
    }
    
    const options: AxiosRequestConfig = {
      url: (custom ? `${this.host}${path}` : `${this.host}/jsonrpc`),
      method: "post",
      headers: {
        ...defaultHeaders,
        'Origin': window.location.origin
      },
      withCredentials: true,
      data: {
        jsonrpc: "2.0",
        method: "call",
        params
      }
    }

    return new Promise<T>((resolve, reject) => {
      return axios(options)
        .then((response: { data: { error: any; result: T | PromiseLike<T> } }) => {
          if (response.data.error) reject(response.data.error)
          resolve(response.data.result)
        })
        .catch(reject)
    })
  }
}

class OdooResource {
  constructor(protected client: Odoo, protected model: string) {}
   
  private call(method: string, params: object): Promise<any[] | {}> {
    return this.client._request(Odoo.ODOO_CALL_KW_ENDPOINT, {
      service: "object",
      method: "execute_kw",
      args: [this.model, method, params]
    })
  }

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

  async read<T extends TModel>(ids: number | numbers, fields: string[] = []): Promise<(typeof ids extends number? T: Array<T>)>{
    if (typeof ids === 'number') {
      ids = [ids]
    }
    const result = await this.client
          ._request<Array<T>>(Odoo.ODOO_CALL_ENDPOINT, {
              service: "object",
              method: "execute_kw",
              args: [this.model, "read", [ids], { fields }]
          }) as Array<T>
     return result as Array<T>
  }

  browse<T extends TModel>(ids: number | numbers, fields: string[] = []): Promise<(typeof ids extends number? T: Array<T>)> {
   return this.read<T>(ids, fields)
  }

  async write<T extends TModel>(ids: number | numbers, data: T): Promise<boolean>  {
   let itemIds: numbers = []
    if (typeof ids === 'number') {
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
  
  search(params: Array<string[]>): Promise<numbers> {
    return this.client._request<numbers>(Odoo.ODOO_CALL_KW_ENDPOINT, {
      service: "object",
      method: "execute_kw",
      args: [this.model, "search", [params]]
    }) as Promise<numbers>
  }

  search_count(params: Array<string[]>): Promise<number> {
    return this.client._request<number>(Odoo.ODOO_CALL_KW_ENDPOINT, {
      service: "object",
      method: "execute_kw",
      args: [this.model, "search_count", [params]]
    }) as Promise<number>
  }

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

export { Odoo, type Partner, type Users }