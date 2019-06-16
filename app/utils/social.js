import { isMobile } from './utility';
import ENV from '../../config/environment';

// facebook
function fbUrlConstructor(path, params) {
  const baseUrl = 'https://www.facebook.com/v3.1/dialog/oauth';

  if (!path) {
    path = '';
  }
  if (path.indexOf('/') === 0) {
    path = path.slice(1);
  }

  const redirectUri = ENV.REDIRECT_URI + path;
  let state = 'fb';
  if (params) {
    state += `${':/'}${encodeURIComponent(path + params)}`;
  }

  return `${baseUrl}?client_id=${ENV.FB_ID}&redirect_uri=${redirectUri}&response_type=code&scope=public_profile,manage_pages,pages_show_list,publish_pages,publish_to_groups&state=${state}`;
}

export function fbAuth(path, params) {
  const url = fbUrlConstructor(path, params);
  window.location.replace(url);
}
