const ActionTypes = [
  // Authentication
  'AUTH_LOAD_REQUEST',
  'AUTH_LOAD_SUCCESS',
  'AUTH_LOAD_FAILURE',

  'AUTH_LOGIN_REQUEST',
  'AUTH_LOGIN_SUCCESS',
  'AUTH_LOGIN_FAILURE',

  'AUTH_LOGOUT_REQUEST',
  'AUTH_LOGOUT_SUCCESS',
  'AUTH_LOGOUT_FAILURE',

  'AUTH_RESET_REQUEST',
  'AUTH_RESET_SUCCESS',
  'AUTH_RESET_FAILURE',

  // Account
  'ACCOUNT_UPDATE_REQUEST',
  'ACCOUNT_UPDATE_SUCCESS',
  'ACCOUNT_UPDATE_FAILURE',
  'ACCOUNT_CHANGEPW_REQUEST',
  'ACCOUNT_CHANGEPW_SUCCESS',
  'ACCOUNT_CHANGEPW_FAILURE',
  'ACCOUNT_DELETE_REQUEST',
  'ACCOUNT_DELETE_SUCCESS',
  'ACCOUNT_DELETE_FAILURE',
  'ACCOUNT_VERIFY_REQUEST',
  'ACCOUNT_VERIFY_SUCCESS',
  'ACCOUNT_VERIFY_FAILURE',

  // Modal
  'MODAL_RECEIVED',
  'MODAL_DISMISS',

  // Notification
  'NOTIFICATION_RECEIVED',
  'NOTIFICATION_DISMISS',


  // Audio
  'AUDIO_CATEGORY_FETCH_REQUEST',
  'AUDIO_CATEGORY_FETCH_SUCCESS',
  'AUDIO_CATEGORY_FETCH_FAILURE',

  'AUDIO_SUBCATEGORY_FETCH_REQUEST',
  'AUDIO_SUBCATEGORY_FETCH_SUCCESS',
  'AUDIO_SUBCATEGORY_FETCH_FAILURE',

  'AUDIO_SEARCH_REQUEST',
  'AUDIO_SEARCH_SUCCESS',
  'AUDIO_SEARCH_FAILURE',

  'AUDIO_PAGINATION_REQUEST',
  'AUDIO_PAGINATION_SUCCESS',
  'AUDIO_PAGINATION_FAILURE',

  'AUDIO_CLEAR_SEARCH',


  // Cloudinary
  'CLOUDINARY_UPLOAD_REQUEST',
  'CLOUDINARY_UPLOAD_SUCCESS',
  'CLOUDINARY_UPLOAD_FAILURE',

  'CLOUDINARY_PROGRESS',


  // Editor
  'EDITOR_BGPOSITION_START',
  'EDITOR_BGPOSITION_END',

  'EDITOR_EDITTEXT_START',
  'EDITOR_EDITTEXT_END',

  'EDITOR_EDITSTATIC_START',
  'EDITOR_EDITSTATIC_END',


  // Composition
  'COMPOSITION_FETCH_REQUEST',
  'COMPOSITION_FETCH_SUCCESS',
  'COMPOSITION_FETCH_FAILURE',

  'COMPOSITION_SAVE_REQUEST',
  'COMPOSITION_SAVE_SUCCESS',
  'COMPOSITION_SAVE_FAILURE',
  // discard and reset to original composition
  'COMPOSITION_RESET',
  // change format
  'COMPOSITION_SET_FORMAT',
  // change video
  'COMPOSITION_SET_VIDEO',
  // change video offset(x,y)
  'COMPOSITION_VIDEO_OFFSET',
  // change layer svg
  'COMPOSITION_SET_LAYER_SVG',
  // change layer
  'COMPOSITION_SET_LAYER',
  // change layer text
  'COMPOSITION_SET_LAYER_TEXT',
  // delete layer
  'COMPOSITION_DELETE_LAYER',
  // add layer
  'COMPOSITION_ADD_LAYER',
  // set layer transform
  'COMPOSITION_LAYER_TRANSFORM',
  // delete layer
  'COMPOSITION_DELETE_STATIC_LAYER',
  // add layer
  'COMPOSITION_ADD_STATIC_LAYER',
  // set layer transform
  'COMPOSITION_STATIC_LAYER_TRANSFORM',
  // set audio mute
  'COMPOSITION_AUDIO_MUTE',
  // set audio
  'COMPOSITION_SET_AUDIO',
  // set animation
  'COMPOSITION_SET_ANIMATION',


  // Invites
  'INVITE_REQUEST',
  'INVITE_SUCCESS',
  'INVITE_FAILURE',


  // Templates
  'TEMPLATE_FAVORITE_REQUEST',
  'TEMPLATE_FAVORITE_SUCCESS',
  'TEMPLATE_FAVORITE_FAILURE',

  'TEMPLATE_UNFAVORITE_REQUEST',
  'TEMPLATE_UNFAVORITE_SUCCESS',
  'TEMPLATE_UNFAVORITE_FAILURE',

  'TEMPLATE_CATEGORY_FETCH_REQUEST',
  'TEMPLATE_CATEGORY_FETCH_SUCCESS',
  'TEMPLATE_CATEGORY_FETCH_FAILURE',

  'TEMPLATES_CLEAR',


  // FEEDS
  'MYPROJECTS_FETCH_REQUEST',
  'MYPROJECTS_FETCH_SUCCESS',
  'MYPROJECTS_FETCH_FAILURE',

  'MYPROJECTS_PAGINATE_REQUEST',
  'MYPROJECTS_PAGINATE_SUCCESS',
  'MYPROJECTS_PAGINATE_FAILURE',

  'EXPORTS_FETCH_REQUEST',
  'EXPORTS_FETCH_SUCCESS',
  'EXPORTS_FETCH_FAILURE',

  'EXPORTS_PAGINATE_REQUEST',
  'EXPORTS_PAGINATE_SUCCESS',
  'EXPORTS_PAGINATE_FAILURE',

  'UPLOADS_FETCH_REQUEST',
  'UPLOADS_FETCH_SUCCESS',
  'UPLOADS_FETCH_FAILURE',

  'UPLOADS_PAGINATE_REQUEST',
  'UPLOADS_PAGINATE_SUCCESS',
  'UPLOADS_PAGINATE_FAILURE',

  'BRAND_FETCH_REQUEST',
  'BRAND_FETCH_SUCCESS',
  'BRAND_FETCH_FAILURE',

  'BRAND_PAGINATE_REQUEST',
  'BRAND_PAGINATE_SUCCESS',
  'BRAND_PAGINATE_FAILURE',

  'FAVORITES_FETCH_REQUEST',
  'FAVORITES_FETCH_SUCCESS',
  'FAVORITES_FETCH_FAILURE',

  'FAVORITES_PAGINATE_REQUEST',
  'FAVORITES_PAGINATE_SUCCESS',
  'FAVORITES_PAGINATE_FAILURE',

  'TEMPLATES_FETCH_REQUEST',
  'TEMPLATES_FETCH_SUCCESS',
  'TEMPLATES_FETCH_FAILURE',

  'TEMPLATES_PAGINATE_REQUEST',
  'TEMPLATES_PAGINATE_SUCCESS',
  'TEMPLATES_PAGINATE_FAILURE',

  'TEMPLATES_CLEAR',


  // Media
  'MEDIA_FEATURED_FETCH_REQUEST',
  'MEDIA_FEATURED_FETCH_SUCCESS',
  'MEDIA_FEATURED_FETCH_FAILURE',

  'MEDIA_FEATURED_PAGINATION_REQUEST',
  'MEDIA_FEATURED_PAGINATION_SUCCESS',
  'MEDIA_FEATURED_PAGINATION_FAILURE',

  'MEDIA_SEARCH_REQUEST',
  'MEDIA_SEARCH_SUCCESS',
  'MEDIA_SEARCH_FAILURE',

  'MEDIA_PAGINATION_REQUEST',
  'MEDIA_PAGINATION_SUCCESS',
  'MEDIA_PAGINATION_FAILURE',

  'MEDIA_PROMOTED_GET_REQUEST',
  'MEDIA_PROMOTED_GET_SUCCESS',
  'MEDIA_PROMOTED_GET_FAILURE',

  'MEDIA_CLEAR_SEARCH',

  'MEDIA_UPLOAD_REQUEST',
  'MEDIA_UPLOAD_SUCCESS',
  'MEDIA_UPLOAD_FAILURE',

  'MEDIA_UPLOAD_DELETE_REQUEST',
  'MEDIA_UPLOAD_DELETE_SUCCESS',
  'MEDIA_UPLOAD_DELETE_FAILURE',


  // Products
  'PRODUCT_GETPRODUCTS_REQUEST',
  'PRODUCT_GETPRODUCTS_SUCCESS',
  'PRODUCT_GETPRODUCTS_FAILURE',
  'PRODUCT_BUY_REQUEST',
  'PRODUCT_BUY_SUCCESS',
  'PRODUCT_BUY_FAILURE',

  // Projects
  'PROJECT_CREATE_REQUEST',
  'PROJECT_CREATE_SUCCESS',
  'PROJECT_CREATE_FAILURE',

  'PROJECT_UPDATE_REQUEST',
  'PROJECT_UPDATE_SUCCESS',
  'PROJECT_UPDATE_FAILURE',

  'PROJECT_DELETE_OPTIMISTIC',
  'PROJECT_DELETE_REQUEST',
  'PROJECT_DELETE_SUCCESS',
  'PROJECT_DELETE_FAILURE',

  'PROJECT_FETCH_REQUEST',
  'PROJECT_FETCH_SUCCESS',
  'PROJECT_FETCH_FAILURE',

  'PROJECT_EXPORT_REQUEST',
  'PROJECT_EXPORT_SUCCESS',
  'PROJECT_EXPORT_FAILURE',

  'PROJECT_EXPORT_STATUS_REQUEST',
  'PROJECT_EXPORT_STATUS_SUCCESS',
  'PROJECT_EXPORT_STATUS_FAILURE',


  // Stripe && Subscription
  'SUBSCRIPTION_GETPLANS_REQUEST',
  'SUBSCRIPTION_GETPLANS_SUCCESS',
  'SUBSCRIPTION_GETPLANS_FAILURE',
  'SUBSCRIPTION_MYPLAN_REQUEST',
  'SUBSCRIPTION_MYPLAN_SUCCESS',
  'SUBSCRIPTION_MYPLAN_FAILURE',
  'SUBSCRIPTION_SUBSCRIBE_REQUEST',
  'SUBSCRIPTION_SUBSCRIBE_SUCCESS',
  'SUBSCRIPTION_SUBSCRIBE_FAILURE',
  'SUBSCRIPTION_CHANGEPLAN_REQUEST',
  'SUBSCRIPTION_CHANGEPLAN_SUCCESS',
  'SUBSCRIPTION_CHANGEPLAN_FAILURE',
  'SUBSCRIPTION_CHANGECARD_REQUEST',
  'SUBSCRIPTION_CHANGECARD_SUCCESS',
  'SUBSCRIPTION_CHANGECARD_FAILURE',
  'SUBSCRIPTION_CANCEL_REQUEST',
  'SUBSCRIPTION_CANCEL_SUCCESS',
  'SUBSCRIPTION_CANCEL_FAILURE',


  // share
  'SHARE_FACEBOOK_GETGROUPS_REQUEST',
  'SHARE_FACEBOOK_GETGROUPS_SUCCESS',
  'SHARE_FACEBOOK_GETGROUPS_FAILURE',
  'SHARE_FACEBOOK_GETPAGES_REQUEST',
  'SHARE_FACEBOOK_GETPAGES_SUCCESS',
  'SHARE_FACEBOOK_GETPAGES_FAILURE',
  'SHARE_FACEBOOK_GETSCOPES_REQUEST',
  'SHARE_FACEBOOK_GETSCOPES_SUCCESS',
  'SHARE_FACEBOOK_GETSCOPES_FAILURE',
  'SHARE_FACEBOOK_POSTVIDEO_REQUEST',
  'SHARE_FACEBOOK_POSTVIDEO_SUCCESS',
  'SHARE_FACEBOOK_POSTVIDEO_FAILURE',


  // test
  'TEST_SUCCESS',
];

export default ActionTypes.reduce((prev, cur) => {
  const next = prev;
  next[cur] = cur;
  return next;
}, {});
