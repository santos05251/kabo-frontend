import jsdom from 'jsdom';
import jsCookie from 'js-cookie';
import { validate as validateUUID, v4 as uuidv4 } from 'uuid';
import * as attrify from '@loganbussey/attrify';
import analytics from './analytics';
import { enableMocks } from 'jest-fetch-mock';

enableMocks();

const campaignParams = [
  'utm_campaign',
  'utm_content',
  'utm_medium',
  'utm_source',
  'utm_term',
];

const mock_campaign = 'test_campaign';
const mock_content = 'test_content';
const mock_medium = 'test_medium';
const mock_source = 'test_source';
const mock_term = 'test_term';
const mock_referrer = 'https://google.com';

const mock_api_endpoint = 'https://an-api-analytics.com';

const protocol = 'https://';
const domain = 'growthphysics.com';
const path = '/some-page';
const search = '?foo=bar';
const url = protocol + domain + path + search;

const setFakeCookies = () => {
  jsCookie.set('utm_campaign', mock_campaign);
  jsCookie.set('utm_content', mock_content);
  jsCookie.set('utm_medium', mock_medium);
  jsCookie.set('utm_source', mock_source);
  jsCookie.set('utm_term', mock_term);
  jsCookie.set('referrer', mock_referrer);
};

const clearFakeCookies = () => {
  jsCookie.remove('utm_campaign');
  jsCookie.remove('utm_content');
  jsCookie.remove('utm_medium');
  jsCookie.remove('utm_source');
  jsCookie.remove('utm_term');
  jsCookie.remove('referrer');
};

const commonArgs = (args) => {
  args = args || {};
  return {
    campaign: {
      name: args.utm_campaign,
      content: args.utm_content,
      medium: args.utm_medium,
      source: args.utm_source,
      term: args.utm_term,
    },
    referrer: {
      url: args.referrer || undefined,
    },
    page: {
      path: args.page ? args.page.path : path,
      referrer: args.referrer || undefined,
      title: '',
      search: args.page ? args.page.search : search,
      url: args.page ? args.page.url : url,
    },
    ...args.options,
  };
};

const expectedArguments = (name, args) => {
  return [name, args.properties || {}, commonArgs(args)];
};

const mockCommonArguments = (args) => {
  return {
    context: {
      ...commonArgs({
        ...args,
        utm_campaign: mock_campaign,
        utm_content: mock_content,
        utm_medium: mock_medium,
        utm_source: mock_source,
        utm_term: mock_term,
        referrer: mock_referrer,
        page: {
          path,
          search,
          title: '',
          url,
        },
      }),
    },
  };
};

const expectedTrackBody = (name, args) => {
  const options = args.options ? { ...args.options } : {};
  delete args.options;
  return {
    type: 'track',
    arguments: {
      event: name,
      properties: args.properties || {},
      ...mockCommonArguments(args),
      ...options,
    },
  };
};

const expectedPageBody = (name, args) => {
  const options = args.options ? { ...args.options } : {};
  delete args.options;
  return {
    type: 'page',
    arguments: {
      name,
      properties: args.properties || {},
      ...mockCommonArguments(args),
      ...options,
    },
  };
};

const expectedIdentifyBody = (userId, args) => {
  args = args || {};
  const options = args.options ? { ...args.options } : {};
  delete args.options;
  const data = {
    traits: args.traits || {},
    ...mockCommonArguments(args),
    ...options,
  };
  if (userId) data.user_id = userId;
  return {
    type: 'identify',
    arguments: data,
  };
};

const attrifySpy = jest.spyOn(attrify, 'default');
const cookieRemoveSpy = jest.spyOn(jsCookie, 'remove');

const mockAnonymousId = uuidv4();
const mockSegmentAnonymousId = jest.fn().mockReturnValue(mockAnonymousId);
const mockSegmentUser = jest.fn().mockReturnValue({
  anonymousId: mockSegmentAnonymousId,
});

const segmentSpy = {
  identify: jest.fn(),
  track: jest.fn(),
  page: jest.fn(),
  user: mockSegmentUser,
};

beforeEach(() => {
  jest.clearAllMocks();
  delete window.location;
  window.location = {
    protocol: protocol,
    hostname: domain,
    host: domain,
    pathname: path,
    search: search,
    href: url,
  };
});

// This test must come first since we are calling anaytics.init
// in the afterEach function
describe('.init', () => {
  setFakeCookies();

  it('throws an error if .track is called before .init is called', () => {
    expect(analytics.track).toThrow(TypeError);
  });

  it('throws an error if init is called with no host', () => {
    expect(() => {
      analytics.init()
    }).toThrow('You must initialize analytics with a host');
  });

  it('.track works after .init is called', () => {
    analytics.init(mock_api_endpoint);
    analytics.track('foo', {}, {});
  });

  it('does not call .identify when a new session starts', () => {
    expect(segmentSpy.identify).toHaveBeenCalledTimes(0);
  });

  it('calls attrify() when we call .init', () => {
    analytics.init(mock_api_endpoint);
    expect(attrifySpy).toHaveBeenCalledTimes(1);
  });

  it('calls attrify() every time we call .init', () => {
    var calls = 0;
    [0, 10].forEach(() => {
      analytics.init(mock_api_endpoint);
      calls++;
    });
    expect(attrifySpy).toHaveBeenCalledTimes(calls);
  });

  it('sets with a new anonymous_id if one does not exists', () => {
    jsCookie.remove('anonymous_id');
    analytics.init(mock_api_endpoint);
    expect(jsCookie.get('anonymous_id')).not.toBeNull();
  });

  it('calls attrify() with a new session_id if one does not exists', () => {
    jsCookie.remove('session_id');
    analytics.init(mock_api_endpoint);
    expect(attrifySpy).toHaveBeenCalledWith(
      expect.objectContaining({
        data: {
          session_id: expect.any(String),
        },
      })
    );
  });

  it('deletes the session_id if there are utm_params in the URL', () => {
    jsCookie.set('session_id', uuidv4());

    campaignParams.forEach((utmParam) => {
      window.location.search = '?' + utmParam + '=test';
      analytics.init(mock_api_endpoint);
      expect(cookieRemoveSpy).toHaveBeenCalledTimes(1);
      expect(cookieRemoveSpy).toHaveBeenCalledWith(
        'session_id',
        expect.objectContaining({
          domain: '.' + window.location.hostname,
        })
      );
      expect(attrifySpy).toHaveBeenCalledWith(
        expect.objectContaining({
          data: {
            session_id: expect.any(String),
          },
        })
      );
      // reset the spy
      cookieRemoveSpy.mockClear();
    });

    // reset window
    window.location.search = search;
  });

  it('does not delete the session_id if there are only non-utm_params in the URL', () => {
    jsCookie.set('session_id', uuidv4());

    window.location.search = '?foo=bar&baz=taz';
    analytics.init(mock_api_endpoint);
    expect(cookieRemoveSpy).toHaveBeenCalledTimes(0);

    // reset window
    window.location.search = search;
  });

  it('calls attrify() with .host as the cookie domain', () => {
    analytics.init(mock_api_endpoint);
    expect(attrifySpy).toHaveBeenCalledWith(
      expect.objectContaining({
        domain: '.' + domain,
      })
    );
  });
});

describe('track', () => {
  beforeEach(() => {
    clearFakeCookies();
    // Call this so we call attify and reset the cookies & referrer
    analytics.init(mock_api_endpoint);
  });

  it('calls /track api', () => {
    analytics.track('foo0', { prop: 'a-prop' }, {});
    expect(fetch.mock.calls.length).toEqual(1);

    expect(fetch.mock.calls[0][0]).toBe(`${mock_api_endpoint}/track`);
    expect(fetch.mock.calls[0][1]).toMatchObject({ method: 'POST' });
  });

  it('doesnt track attribution if there is none', () => {
    analytics.track('foo0', {}, {});
    expect(fetch.mock.calls.length).toEqual(1);
    const body = JSON.parse(fetch.mock.calls[0][1].body);
    expect(body).toMatchObject({
      ...expectedTrackBody('foo0', { properties: {} }),
    });
  });

  it('passes properties through correctly', () => {
    const properties = { property: 'foobar' };
    analytics.track('foo1', properties, {});
    const body = JSON.parse(fetch.mock.calls[0][1].body);
    expect(body).toMatchObject({
      ...expectedTrackBody('foo1', { properties }),
    });
  });

  it('does the right thing when we dont pass options', () => {
    analytics.track('foo2', {});
    const body = JSON.parse(fetch.mock.calls[0][1].body);
    expect(body).toMatchObject({
      ...expectedTrackBody('foo2', {}),
    });
  });

  it('merges in options if we pass them', () => {
    const options = { option: 'my-option' };
    analytics.track('foo2', {}, options);
    const body = JSON.parse(fetch.mock.calls[0][1].body);
    expect(body).toMatchObject({
      ...expectedTrackBody('foo2', { options }),
    });
  });

  it('cant pass and override context', () => {
    const options = { context: {} };
    analytics.track('foo2', {}, options);
    const body = JSON.parse(fetch.mock.calls[0][1].body);
    expect(body).not.toMatchObject({
      ...expectedTrackBody('foo2', { context: {} }),
    });
  });
});

describe('page', () => {
  beforeEach(() => {
    clearFakeCookies();
    // Call this so we call attify and reset the cookies & referrer
    analytics.init(mock_api_endpoint);
  });

  it('calls /track api with page type', () => {
    analytics.page('foo0', {}, {});
    expect(fetch.mock.calls.length).toEqual(1);

    expect(fetch.mock.calls[0][0]).toBe(`${mock_api_endpoint}/track`);
    expect(fetch.mock.calls[0][1]).toMatchObject({ method: 'POST' });
    const body = JSON.parse(fetch.mock.calls[0][1].body);

    expect(body).toMatchObject({
      type: 'page',
    });
  });

  it('doesnt track attribution if there is none', () => {
    analytics.page('foo1', {}, {});
    const body = JSON.parse(fetch.mock.calls[0][1].body);
    expect(body).toMatchObject({
      ...expectedPageBody('foo1', {}),
    });
  });

  it('passes properties through correctly', () => {
    const properties = { property: 'foobar' };
    analytics.page('foo2', properties, {});
    const body = JSON.parse(fetch.mock.calls[0][1].body);

    expect(body).toMatchObject({
      ...expectedPageBody('foo2', { properties }),
    });
  });

  it('does the right thing when we dont pass options', () => {
    analytics.page('foo2', {});
    const body = JSON.parse(fetch.mock.calls[0][1].body);
    expect(body).toMatchObject({
      ...expectedPageBody('foo2', {}),
    });
  });

  it('merges in options if we pass them', () => {
    const options = { option: 'my-option' };
    analytics.page('foo2', {}, options);
    const body = JSON.parse(fetch.mock.calls[0][1].body);

    expect(body).toMatchObject({
      ...expectedPageBody('foo2', { options }),
    });
  });

  it('passed in category take prescedent', () => {
    const options = { category: 'category' };
    analytics.page('foo2', {}, options);
    const body = JSON.parse(fetch.mock.calls[0][1].body);

    expect(body).toMatchObject({
      ...expectedPageBody('foo2', { category: 'category' }),
    });
  });

  it('tracks attribution when it exists', () => {
    setFakeCookies();
    analytics.page('foo3', {}, {});
    const body = JSON.parse(fetch.mock.calls[0][1].body);

    expect(body).toMatchObject({
      ...expectedPageBody('foo3', {
        utm_campaign: mock_campaign,
        utm_content: mock_content,
        utm_medium: mock_medium,
        utm_source: mock_source,
        utm_term: mock_term,
        referrer: mock_referrer,
      }),
    });
  });
});

describe('identify', () => {
  beforeEach(() => {
    clearFakeCookies();
    // Call this so we call attify and reset the cookies & referrer
    analytics.init(mock_api_endpoint);
  });

  it('calls /track api with identify type', () => {
    analytics.identify('userId', {}, {});
    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toBe(`${mock_api_endpoint}/track`);
    expect(fetch.mock.calls[0][1]).toMatchObject({ method: 'POST' });
    const body = JSON.parse(fetch.mock.calls[0][1].body);
    expect(body).toMatchObject({
      type: 'identify',
    });
  });

  it('stores user_id in cookies', () => {
    jsCookie.remove('user_id');
    const cookieSetSpy = jest.spyOn(jsCookie, 'set');
    analytics.identify('userId', {}, {});
    expect(cookieSetSpy.mock.calls[0][0]).toBe('user_id');
    expect(cookieSetSpy.mock.calls[0][1]).toBe('userId');
  });

  it('doesnt track attribution if there is none', () => {
    analytics.identify('userId', {}, {});
    const body = JSON.parse(fetch.mock.calls[0][1].body);

    expect(body).toMatchObject({
      ...expectedIdentifyBody('userId', {}),
    });
  });

  it('if you dont supply arguments, it does the right thing', () => {
    analytics.identify();
    const body = JSON.parse(fetch.mock.calls[0][1].body);

    expect(body).toMatchObject({
      ...expectedIdentifyBody(),
    });
  });

  it('passes traits through correctly', () => {
    const traits = { traits: 'my-email' };
    analytics.identify('userId1', traits, {});
    const body = JSON.parse(fetch.mock.calls[0][1].body);

    expect(body).toMatchObject({
      ...expectedIdentifyBody('userId1', {
        traits: traits,
      }),
    });
  });

  it('does the right thing when we dont pass options', () => {
    analytics.identify('id2', {});
    const body = JSON.parse(fetch.mock.calls[0][1].body);

    expect(body).toMatchObject({
      ...expectedIdentifyBody('id2', {}),
    });
  });

  it('does the right thing when we dont pass a userId', () => {
    const traits = { prop: 'my-email' };
    const options = { option: 'my-option' };
    analytics.identify(traits, options);
    // The first arg is traits
    // The second arg includes options
    const body = JSON.parse(fetch.mock.calls[0][1].body);

    expect(body).toMatchObject({
      ...expectedIdentifyBody(null, traits, { options }),
    });
  });

  it('merges in options if we pass them', () => {
    const options = { option: 'my-option' };
    analytics.identify('foo2', {}, options);
    const body = JSON.parse(fetch.mock.calls[0][1].body);

    expect(body).toMatchObject({
      ...expectedIdentifyBody('foo2', {}, { options }),
    });
  });

  it('tracks attribution when it exists', () => {
    setFakeCookies();
    analytics.identify('foo1', {});
    const body = JSON.parse(fetch.mock.calls[0][1].body);

    expect(body).toMatchObject({
      ...expectedIdentifyBody(
        'foo1',
        {},
        {
          utm_campaign: mock_campaign,
          utm_content: mock_content,
          utm_medium: mock_medium,
          utm_source: mock_source,
          utm_term: mock_term,
          referrer: mock_referrer,
        }
      ),
    });
  });

  it('tracks attribution when it exists', () => {
    setFakeCookies();
    analytics.identify('foo1', {});
    const body = JSON.parse(fetch.mock.calls[0][1].body);

    expect(body).toMatchObject({
      ...expectedIdentifyBody(
        'foo1',
        {},
        {
          utm_campaign: mock_campaign,
          utm_content: mock_content,
          utm_medium: mock_medium,
          utm_source: mock_source,
          utm_term: mock_term,
          referrer: mock_referrer,
        }
      ),
    });
  });

  it('tracks user_id when it exists', () => {
    analytics.identify('user-id', {});
    analytics.page('newpage', {});
    const body = JSON.parse(fetch.mock.calls[1][1].body);

    expect(body).toMatchObject({
      ...expectedPageBody(
        'newpage',
        {},
        {
          user_id: 'user-id',
        }
      ),
    });
  });

  it('tracks user_id when it exists', () => {
    analytics.identify('user-id', {});
    analytics.track('event', {});
    const body = JSON.parse(fetch.mock.calls[1][1].body);

    expect(body).toMatchObject({
      ...expectedTrackBody(
        'event',
        {},
        {
          user_id: 'user-id',
        }
      ),
    });
  });
});

describe('anonymousId', () => {
  beforeEach(() => {
    clearFakeCookies();
  });
  it('returns the users anonymousId', () => {
    expect(validateUUID(analytics.anonymousId())).toBe(true);
    // console.log('analytics.anonymousId()', analytics.anonymousId());
    // expect(analytics.anonymousId()).toEqual(anonymousId);
  });
  it('stores anonymous_id to cookie', () => {
    jsCookie.remove('anonymous_id');
    const cookieSetSpy = jest.spyOn(jsCookie, 'set');
    const anonymousId = analytics.anonymousId();
    expect(cookieSetSpy.mock.calls[0][0]).toEqual('anonymous_id');
    expect(cookieSetSpy.mock.calls[0][1]).toEqual(anonymousId);
  });

  it('never changes', () => {
    const anonymousId = analytics.anonymousId();
    expect(analytics.anonymousId()).toEqual(anonymousId);
  });
});
