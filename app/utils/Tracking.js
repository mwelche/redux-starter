/* Tracking
*/

import {
  GOOGLE_ANALYTICS_ID,
} from '../../config/environment';
import ReactGA from 'react-ga';

//
let initialized = true;
let debug = false;

/**
 * Utilities
 */

const verifyInit = () => {
  if (!initialized) {
    console.warn('Pixel not initialized before using call tracking.init with required params');
  }
  return initialized;
};


//
const defaultOptions = {
  autoConfig: true,
  debug: false,
};

//
export default {
  init(options = defaultOptions) {
    // window._fs_debug = false;
    // window._fs_host = 'fullstory.com';
    // window._fs_org = 'YOUR ORG HERE';
    // window._fs_namespace = 'FS';
    // (function (m, n, e, t, l, o, g, y) {
    //   if (e in m) { if (m.console && m.console.log) { m.console.log('FullStory namespace conflict. Please set window["_fs_namespace"].'); } return; }
    //   g = m[e] = function (a, b) { g.q ? g.q.push([a, b]) : g._api(a, b); }; g.q = [];
    //   o = n.createElement(t); o.async = 1; o.src = `https://${_fs_host}/s/fs.js`;
    //   y = n.getElementsByTagName(t)[0]; y.parentNode.insertBefore(o, y);
    //   g.identify = function (i, v) { g(l, { uid: i }); if (v)g(l, v); }; g.setUserVars = function (v) { g(l, v); };
    //   g.shutdown = function () { g('rec', !1); }; g.restart = function () { g('rec', !0); };
    //   g.consent = function (a) { g('consent', !arguments.length || a); };
    //   g.identifyAccount = function (i, v) { o = 'account'; v = v || {}; v.acctId = i; g(o, v); };
    //   g.clearUserCookie = function () {};
    // }(window, document, window._fs_namespace, 'script', 'user'));
  },

  pageview() {
  },

  track({
    category, action, label, value,
  } = {}) {
    ReactGA.ga('send', 'event', category, action, label, value);
  },

  trackPurchase(data = {}, transactionData = {}) {
    const title = 'Purchase';
    let purchaseType = 'Subscription';

    if (transactionData.category === 'charge') {
      purchaseType = 'Pack';
    }
    ReactGA.ga('send', 'event', purchaseType, 'purchase', data.content_name || '');
    // ReactGA.ga('ecommerce:addTransaction', {
    //   id: transactionData.transactionId, // Transaction ID. Required.
    //   // ==== NOTE: UPDATE THIS =====
    //   affiliation: 'YOUR STORE NAME', // Affiliation or store name.
    //   // ============================
    //   revenue: data.value, // Grand Total.
    // });
    // ReactGA.ga('ecommerce:addItem', {
    //   id: transactionData.transactionId, // Transaction ID. Required.
    //   name: data.content_name, // Product name. Required.
    //   sku: transactionData.item, // SKU/code.
    //   category: transactionData.category, // Category or variation.
    //   price: data.value, // Unit price.
    //   quantity: '1', // Quantity.
    // });
    // ReactGA.ga('ecommerce:send');
  },

  trackCustom(event, data) {

  },

  identifyUser(user) {
    if (!user) return;

    const { email, fullname, id } = user;
    if (!id) return;
    if (!email) return;

    // console.log('identify user');
    // FS.identify(id, {
    //   displayName: fullname || email,
    //   email,
    //   // TODO: Add your own custom user variables here, details at
    //   // http://help.fullstory.com/develop-js/setuservars
    //   // reviewsWritten_int: 14,
    // });
  },

  updateUser(o) {
    if (!o) return;

    // FS.setUserVars(o);
  },

  unidentifyUser() {
    // console.log('unidentify user');
    // FS.identify(false);
  },
};
