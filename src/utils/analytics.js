import jsCookie from 'js-cookie';
import attrify from '@loganbussey/attrify';
import { v4 as uuidv4 } from 'uuid';
import queryString from 'query-string';

// global variables
let apiHost = null;

let segmentLib = null;

const campaignParams = [
  'utm_campaign',
  'utm_content',
  'utm_medium',
  'utm_source',
  'utm_term',
];

// generate & override segment anonymousId
const anonymousId = () => {
  const guestId = jsCookie.get('anonymous_id') || uuidv4();
  jsCookie.set('anonymous_id', guestId);
  return guestId;
};

// get userId
const getUserId = () => (jsCookie.get('user_id'));

// set userId
const setUserId = (userId) => (jsCookie.set('user_id', userId));

const getQueryString = () => (window.location.search.substring(1));

const getCookieDomain = () => {
  /**
   * Return the domain to save the cookies to.
   * If localhost, return nothing, and it works automatically.
   * Otherwise, return the current domain with a '.' prepended
   * so it perists across subdomains.
   */
  const domain = window.location.hostname;
  return domain === 'localhost' ? domain : `.${domain}`;
};

const getCookieDomainDict = () => {
  const cookieDomain = getCookieDomain();
  return cookieDomain === 'localhost' ? {} : { domain: cookieDomain };
};

const getAttrifyParams = () => ({
  ...getCookieDomainDict(),
  data: {
    session_id: uuidv4(),
  },
});

// Get the session Id
const sessionId = () => (jsCookie.get('session_id'));

// Remove the session Id
const removeSessionId = () => (jsCookie.remove('session_id', getCookieDomainDict()));

const isNewSession = () => {
  // Returns true if we have any UTM parameters in the query string
  // It is also a new session if session_id does not exist
  let isNew = false;
  const queryParams = queryString.parse(getQueryString());

  campaignParams.forEach((utmParam) => {
    if (queryParams[utmParam]) {
      isNew = true;
    }
  });

  if (!sessionId()) {
    isNew = true;
  }
  return isNew;
};

// campaign context
const getCampaign = () => ({
  campaign: {
    name: jsCookie.get('utm_campaign'),
    content: jsCookie.get('utm_content'),
    medium: jsCookie.get('utm_medium'),
    source: jsCookie.get('utm_source'),
    term: jsCookie.get('utm_term'),
  },
});

// referrer context
const getReferrer = () => {
  const referrer = jsCookie.get('referrer');
  return {
    referrer: {
      /** referrer supports type, name, url, and link
       * Currently we are only tracking url
       * If you wish to add support for other fields, please use
       * this docuemntation:
       * https://segment.com/docs/connections/spec/common/#context
       * */
      url: referrer,
    },
  };
};

// page context
const getPage = () => ({
  page: {
    path: window.location.pathname,
    referrer: document.referrer,
    title: document.title,
    search: window.location.search,
    url: window.location.href,
  },
});

// Get context variables for segment's options dict
// https://segment.com/docs/connections/spec/common/#context
const getTrackingContext = () => ({
  ...getCampaign(),
  ...getReferrer(),
  ...getPage(),
});

// Get tracking options for segment's options dict
const getTrackingOptions = () => ({
  ...getTrackingContext(),
});

// call api endpoint
const sendTrackApi = async (type, args) => {
  const params = { ...args };
  params.anonymous_id = anonymousId();

  if (getUserId() && !params.user_id) {
    params.user_id = getUserId();
  }

  const response = await fetch(`${apiHost}/track`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      type,
      arguments: { ...params },
    }),
  });
  return response;
};

const analyticsLib = {
  // https://segment.com/docs/connections/sources/catalog/libraries/server/ruby/#track
  track: (event, properties, options) => {
    // map from https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/#track
    sendTrackApi('track', { event, properties, ...options })
  },
  // https://segment.com/docs/connections/sources/catalog/libraries/server/ruby/#identify
  identify: (userId, traits, options) => {
    const params = { traits, ...options };
    if (userId) params.user_id = userId;
    sendTrackApi('identify', params);
  },
  // https://segment.com/docs/connections/sources/catalog/libraries/server/ruby/#page
  page: (name, properties, options) => {
    // map from https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/#page
    sendTrackApi('page', { name, properties, ...options });
  },
};

const init = (host) => {
  if(!host) {
    throw "You must initialize analytics with a host";
  }
  apiHost = host;
  segmentLib = analyticsLib;
  // If this is a new session, delete the session_id
  // Unfortunately attrify only deletes utm params on a new session
  if (isNewSession()) {
    removeSessionId();
  }
  // Set session data for 30 minutes
  // This includes UTMs, referrer, and the Session ID
  attrify(getAttrifyParams());
  anonymousId();
};

// Segment also supports a fourth parameter: callback.
// If you wish to extend this middleware to support that parameter,
// you can read the documentation here.
// https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/#identify
// identify(userId, traits, options) or identify(traits, options)
const identify = (userId, traits, options) => {
  /** Parameters
   * userId: string, optional
   * traits: object, optional
   * options: object, optional (if traits is ommitted)
   *
   * If you include options, you must include traits.
   * You may omit userId from the function call and it will work.
   * Example: analytics.identify({}, {});
   * */

  if (userId === undefined && traits === undefined && options === undefined) {
    // No args were passed in, set traits and options to be empty objects
    // Leave userId as is so we call with the correct parameters later
    traits = {}; // eslint-disable-line
    options = {}; // eslint-disable-line
  }
  if (typeof userId === 'object') {
    // if the userId is an Object, the userId was ommited and we need to shift
    // each argument over.
    options = traits; // eslint-disable-line
    traits = userId; // eslint-disable-line
    userId = null; // eslint-disable-line
  }
  options = { // eslint-disable-line
    context: { ...getTrackingOptions() },
    ...options,
  };

  if (userId) setUserId(userId);

  segmentLib.identify(userId, traits, options);
};

// Segment's version of track has more optional parameters.
// However all versions of track in this app are using this fucntion
// signature.
// If you want to update to be more flexible follow this link to see what
// Segment supports:
// https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/#track
const track = (name, properties, options) => {
  segmentLib.track(name, properties, {
    context: { ...getTrackingContext() },
    ...options,
  });
};

// Segment's version of page has more optional parameters.
// However all versions of page in this app are using this fucntion
// signature.
// If you want to update to be more flexible follow this link to see what
// Segment supports:
// https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/#page
const page = (name, properties, options) => {
  segmentLib.page(name, properties, {
    context: { ...getTrackingOptions() },
    ...options,
  });
};

/** A wrapper around Segment's Analytics Library
 * Used to persist session data and auto-inject tracking data.
 * */
export default {
  init,
  page,
  track,
  identify,
  sessionId,
  anonymousId,
  userId: getUserId,
};
