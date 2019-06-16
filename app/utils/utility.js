/* eslint max-len: 0 */

// app/utils/utility.js

const longDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const longMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function isMobile() {
  const _navigator = navigator || false;

  return (_navigator &&
    (/(iPhone|iPod|Windows Phone|BlackBerry|Mobile)/.test(_navigator.userAgent) ||
    (/Android/.test(_navigator.userAgent) && /Mobile/.test(_navigator.userAgent))));
}

export function isTablet() {
  const _navigator = navigator || false;

  return (_navigator && /(iPad)/.test(_navigator.userAgent) ||
    (/Android/.test(_navigator.userAgent) && !(/Mobile/.test(_navigator.userAgent))));
}

// Check if the given email is a valid format
// @returns Boolean
export function isValidEmail(email) {
  const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return regex.test(email);
}

// Check if the given phone number is a valid format
// @returns Boolean
// ----------------
// valid numbers formats:
// (123) 456-7890
// 123-456-7890
// 123.456.7890
// 1234567890
export function isValidPhone(number) {
  const regex = /^((([0-9]{3}))|([0-9]{3}))[-\s.]?[0-9]{3}[-\s.]?[0-9]{4}$/;
  return regex.test(number);
}

// Check if the given value is an existing US State.
// @returns Boolean
export function isValidState(state) {
  const states = [
    'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC',
    'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS',
    'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO',
    'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP',
    'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN',
    'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY',
  ];
  return states.includes(state.toUpperCase());
}

// Check if the given zipcode is a valid Zipcode format
// @returns Boolean
// ----------------
// Valid Zipcode: 90049
export function isValidZipcode(zipcode) {
  const regex = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
  return regex.test(zipcode);
}

export function newDate(utc) {
  return utc ? new Date(utc) : new Date();
}

export function getDay(utc) {
  const date = newDate(utc);
  const day = utc ? date.getUTCDay() : date.getDay();
  return longDays[day];
}

export function getDate(utc) {
  const date = newDate(utc);
  return utc ? date.getUTCDate() : date.getDate();
}

export function getMonth(utc, shortMonth) {
  if (shortMonth) {
    return shortMonths[newDate(utc).getUTCMonth()];
  }
  return longMonths[newDate(utc).getUTCMonth()];
}

export function getYear(utc) {
  return utc ? newDate(utc).getUTCFullYear() : newDate().getFullYear();
}

export function getLongDate(utc, shortMonth) {
  const month = getMonth(utc, shortMonth);
  const day = getDate(utc);
  const year = getYear(utc);

  return `${month} ${day}, ${year}`;
}

export function getDatepickerDate(utc) {
  return `${utc.getMonth() + 1}/${utc.getDate()}/${utc.getFullYear()}`;
}

export function getShortDate(utc) {
  let hours;
  let mins;
  let months;
  let weeks;
  let years;

  const diff = Math.abs(Date.now() - utc);
  const sec = Math.floor(diff / 1000);
  const days = Math.floor(sec / 86400);

  if (days > 7) {
    weeks = Math.floor(days / 7);

    if (weeks > 4) {
      months = Math.floor(weeks / 4);

      if (months > 12) {
        years = Math.floor(months / 12);

        if (years === 1) {
          return '1 yr';
        }
        return `${years} yrs`;
      }

      if (months === 1) {
        return '1 mo';
      }
      return `${months} mos`;
    }

    if (weeks === 1) {
      return '1 wk';
    }
    return `${weeks} wks`;
  }

  if (days < 1) {
    hours = Math.floor(sec / 3600);

    if (hours < 1) {
      mins = Math.floor(sec / 60);

      if (mins <= 1) {
        return '1 min';
      }
      return `${mins} mins`;
    }

    if (hours === 1) {
      return '1 hr';
    }
    return `${hours} hrs`;
  } else if (days === 1) {
    return '1 day';
  }

  return `${days} days`;
}

export function isURL(url) {
  const re = /(https?):\/\/(((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!$&'()*+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!$&'()*+,;=]|:|@)+(\/(([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!$&'()*+,;=]|:|@)*)*)?)?(\?((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!$&'()*+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!$&'()*+,;=]|:|@)|\/|\?)*)?/;
  return re.test(url);
}

export function validateUsername(username) {
  const re = /^[A-Za-z0-9_-]+$/;
  return re.test(username);
}

export function commaSeparated(num) {
  return num ? num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : num;
}

export function elipsify(string, length) {
  if (!string) return '';

  if (string.length > (length - 3)) {
    return (`${string.slice(0, (length - 3))}...`);
  }
  return string;
}

export function toTitleCase(string) {
  if (string === undefined || string === null) {
    return;
  }

  const smallWords = /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|vs?\.?|via)$/i;
  return string.replace(/[A-Za-z0-9\u00C0-\u00FF]+[^\s-]*/g, (match, index, title) => {
    if (index > 0 && index + match.length !== title.length &&
      match.search(smallWords) > -1 && title.charAt(index - 2) !== ':' &&
      (title.charAt(index + match.length) !== '-' || title.charAt(index - 1) === '-') &&
      title.charAt(index - 1).search(/[^\s-(]/) < 0) {
      return match.toLowerCase();
    }

    if (match.substr(1).search(/[A-Z]|\../) > -1) {
      return match;
    }

    return match.charAt(0).toUpperCase() + match.substr(1);
  });
}

export function validateDate(testdate) {
  const dateRegex = /^(0?[1-9]|1[0-2])\/(0?[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
  return dateRegex.test(testdate);
}

export function dateToUTC(textDate, isEndofDay) {
  if (textDate === 'today') {
    return Date.now();
  }

  const textDateArr = textDate.split('/');
  const year = parseInt(textDateArr[2], 10);
  const month = parseInt(textDateArr[0], 10) - 1;
  const day = parseInt(textDateArr[1], 10);
  let hours = 0;
  let minutes = 0;
  let seconds = 0;

  if (isEndofDay) {
    hours = 23;
    minutes = 59;
    seconds = 59;
  }

  return new Date(year, month, day, hours, minutes, seconds).getTime();
}

export function stripNonNumeric(str) {
  return parseInt(str.replace(/\D/g, ''));
}

export function createUniqueId() {
  return `id${performance.now()}`;
}
