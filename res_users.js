/**
 * This snippet is an example used to convert the output of fields_get() into TypeScript Interface or Type
 * It can be generalized to dynamically create object's type (or better interface) from inspected model for different version of Odoo
 */
const resUsers = {
    partner_id: { type: 'many2one', required: true },
    login: { type: 'char', required: true },
    password: { type: 'char', required: false },
    new_password: { type: 'char', required: false },
    signature: { type: 'html', required: false },
    active: { type: 'boolean', required: false },
    active_partner: { type: 'boolean', required: false },
    action_id: { type: 'many2one', required: false },
    groups_id: { type: 'many2many', required: false },
    log_ids: { type: 'one2many', required: false },
    login_date: { type: 'datetime', required: false },
    share: { type: 'boolean', required: false },
    companies_count: { type: 'integer', required: false },
    tz_offset: { type: 'char', required: false },
    company_id: { type: 'many2one', required: true },
    company_ids: { type: 'many2many', required: false },
    name: { type: 'char', required: false },
    email: { type: 'char', required: false },
    accesses_count: { type: 'integer', required: false },
    rules_count: { type: 'integer', required: false },
    groups_count: { type: 'integer', required: false },
    id: { type: 'integer', required: false },
    __last_update: { type: 'datetime', required: false },
    display_name: { type: 'char', required: false },
    create_uid: { type: 'many2one', required: false },
    create_date: { type: 'datetime', required: false },
    write_uid: { type: 'many2one', required: false },
    write_date: { type: 'datetime', required: false },
    api_key_ids: { type: 'one2many', required: false },
    totp_enabled: { type: 'boolean', required: false },
    totp_trusted_device_ids: { type: 'one2many', required: false },
    im_status: { type: 'char', required: false },
    resource_ids: { type: 'one2many', required: false },
    resource_calendar_id: { type: 'many2one', required: false },
    notification_type: { type: 'selection', required: true },
    res_users_settings_ids: { type: 'one2many', required: false },
    state: { type: 'selection', required: false },
    odoobot_state: { type: 'selection', required: false },
    odoobot_failed: { type: 'boolean', required: false },
    oauth_uid: { type: 'char', required: false },
    odoo_com_uid: { type: 'char', required: false },
    message_is_follower: { type: 'boolean', required: false },
    message_follower_ids: { type: 'one2many', required: false },
    message_partner_ids: { type: 'many2many', required: false },
    message_ids: { type: 'one2many', required: false },
    has_message: { type: 'boolean', required: false },
    message_unread: { type: 'boolean', required: false },
    message_unread_counter: { type: 'integer', required: false },
    message_needaction: { type: 'boolean', required: false },
    message_needaction_counter: { type: 'integer', required: false },
    message_has_error: { type: 'boolean', required: false },
    message_has_error_counter: { type: 'integer', required: false },
    message_attachment_count: { type: 'integer', required: false },
    message_main_attachment_id: { type: 'many2one', required: false },
    message_has_sms_error: { type: 'boolean', required: false },
    email_normalized: { type: 'char', required: false },
    is_blacklisted: { type: 'boolean', required: false },
    message_bounce: { type: 'integer', required: false },
    activity_ids: { type: 'one2many', required: false },
    activity_state: { type: 'selection', required: false },
    activity_user_id: { type: 'many2one', required: false },
    activity_type_id: { type: 'many2one', required: false },
    activity_type_icon: { type: 'char', required: false },
    activity_date_deadline: { type: 'date', required: false },
    my_activity_date_deadline: { type: 'date', required: false },
    activity_summary: { type: 'char', required: false },
    activity_exception_decoration: { type: 'selection', required: false },
    activity_exception_icon: { type: 'char', required: false },
    image_1920: { type: 'binary', required: false },
    image_1024: { type: 'binary', required: false },
    image_512: { type: 'binary', required: false },
    image_256: { type: 'binary', required: false },
    image_128: { type: 'binary', required: false },
    avatar_1920: { type: 'binary', required: false },
    avatar_1024: { type: 'binary', required: false },
    avatar_512: { type: 'binary', required: false },
    avatar_256: { type: 'binary', required: false },
    avatar_128: { type: 'binary', required: false },
    date: { type: 'date', required: false },
    title: { type: 'many2one', required: false },
    parent_id: { type: 'many2one', required: false },
    parent_name: { type: 'char', required: false },
    child_ids: { type: 'one2many', required: false },
    ref: { type: 'char', required: false },
    lang: { type: 'selection', required: false },
    active_lang_count: { type: 'integer', required: false },
    tz: { type: 'selection', required: false },
    user_id: { type: 'many2one', required: false },
    vat: { type: 'char', required: false },
    same_vat_partner_id: { type: 'many2one', required: false },
    bank_ids: { type: 'one2many', required: false },
    website: { type: 'char', required: false },
    comment: { type: 'html', required: false },
    category_id: { type: 'many2many', required: false },
    credit_limit: { type: 'float', required: false },
    employee: { type: 'boolean', required: false },
    function: { type: 'char', required: false },
    type: { type: 'selection', required: false },
    street: { type: 'char', required: false },
    street2: { type: 'char', required: false },
    zip: { type: 'char', required: false },
    city: { type: 'char', required: false },
    state_id: { type: 'many2one', required: false },
    country_id: { type: 'many2one', required: false },
    country_code: { type: 'char', required: false },
    partner_latitude: { type: 'float', required: false },
    partner_longitude: { type: 'float', required: false },
    email_formatted: { type: 'char', required: false },
    phone: { type: 'char', required: false },
    mobile: { type: 'char', required: false },
    is_company: { type: 'boolean', required: false },
    is_public: { type: 'boolean', required: false },
    industry_id: { type: 'many2one', required: false },
    company_type: { type: 'selection', required: false },
    color: { type: 'integer', required: false },
    user_ids: { type: 'one2many', required: false },
    partner_share: { type: 'boolean', required: false },
    contact_address: { type: 'char', required: false },
    commercial_partner_id: { type: 'many2one', required: false },
    commercial_company_name: { type: 'char', required: false },
    company_name: { type: 'char', required: false },
    barcode: { type: 'char', required: false },
    self: { type: 'many2one', required: false },
    channel_ids: { type: 'many2many', required: false },
    contact_address_complete: { type: 'char', required: false },
    image_medium: { type: 'binary', required: false },
    signup_token: { type: 'char', required: false },
    signup_type: { type: 'char', required: false },
    signup_expiration: { type: 'datetime', required: false },
    signup_valid: { type: 'boolean', required: false },
    signup_url: { type: 'char', required: false },
    ocn_token: { type: 'char', required: false },
    partner_gid: { type: 'integer', required: false },
    additional_info: { type: 'char', required: false },
    phone_sanitized: { type: 'char', required: false },
    phone_sanitized_blacklisted: { type: 'boolean', required: false },
    phone_blacklisted: { type: 'boolean', required: false },
    mobile_blacklisted: { type: 'boolean', required: false },
    phone_mobile_search: { type: 'char', required: false },
    x_studio_fax: { type: 'char', required: false },
    x_x_studio_client_x_invoice_count: { type: 'integer', required: false },
    sel_groups_2_3: {
      type: 'selection',
      string: 'Administration',
      selection: [ [Array], [Array], [Array] ],
      help: '',
      exportable: false,
      selectable: false
    },
    sel_groups_1_9_10: {
      type: 'selection',
      string: 'User types',
      selection: [ [Array], [Array], [Array] ],
      help: 'Portal: Portal members have specific access rights (such as record rules and restricted menus).\n' +
        '                They usually do not belong to the usual Odoo groups.\n' +
        'Public: Public users have specific access rights (such as record rules and restricted menus).\n' +
        '                They usually do not belong to the usual Odoo groups.',
      exportable: false,
      selectable: false
    },
    in_group_11: {
      type: 'boolean',
      string: 'Access to Private Addresses',
      help: false,
      exportable: false,
      selectable: false
    },
    in_group_7: {
      type: 'boolean',
      string: 'Access to export feature',
      help: false,
      exportable: false,
      selectable: false
    },
    in_group_12: {
      type: 'boolean',
      string: 'Mail Template Editor',
      help: false,
      exportable: false,
      selectable: false
    },
    in_group_8: {
      type: 'boolean',
      string: 'Contact Creation',
      help: false,
      exportable: false,
      selectable: false
    },
    in_group_4: {
      type: 'boolean',
      string: 'Multi Companies',
      help: false,
      exportable: false,
      selectable: false
    },
    in_group_5: {
      type: 'boolean',
      string: 'Multi Currencies',
      help: false,
      exportable: false,
      selectable: false
    },
    in_group_6: {
      type: 'boolean',
      string: 'Technical Features',
      help: false,
      exportable: false,
      selectable: false
    }
  }

  function getFieldType(odooFieldType) {
    switch (odooFieldType) {
      case "integer":
        return "number"
        break;
      case "float":
        return "number"
        break;
    
      case "boolean":
        return "boolean"
        break;
      
      case "one2many":
        return "[]//"+odooFieldType
        break;
      case "many2many":
        return "[]//"+odooFieldType
        break;
      case "selection":
        return "[] //"+odooFieldType
        break;

      // datetime and date are stored in string format
      // case "datetime":
      //   return "date"
      //   break;

      default:
        return "string //"+odooFieldType
        break;
    }
  }

  Object.entries(resUsers).forEach((entry) => {
    var fieldName = entry[0]
    var isRequired = resUsers[entry[0]].required===true
    var fieldType = getFieldType(resUsers[entry[0]].type)
    console.log(`${fieldName}${isRequired?'':'?'}: ${fieldType}`);
  });