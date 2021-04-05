import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { enableFetchMocks } from 'jest-fetch-mock';
enableFetchMocks();

import OnboardingVersionA from './index';
import store from '../../../store';

const domain = process.env.REACT_APP_API_DOMAIN;
const trackEndpoint = domain + '/track';

Enzyme.configure({ adapter: new Adapter() });

const sampleState = {
  dogs: [
    {
      name: 'dog',
      breed: {
        label: 'a breed',
        value: 10000,
      },
      age: {
        label: '4-12 months',
        value: 4,
      },
    },
  ],
  body_type: 0,
  gender: true,
  ovary: true,
  weight: '20',
  weight_unit: 'lbs',
  activity_level: 1,
  cookedRecipes: { '222': ['beef'] },
  kibble: { '222': 'turkey+salmon' },
  dietPortions: {
    '222': {
      cooked_portion: 25,
      kibble_portion: 75,
      title: '25% cooked, 75% kibble',
    },
  },
  user: {
    first_name: 'First name',
    email: 'email@example.com',
  },
};

let wrapper;
beforeEach(() => {
  const props = {
    location: {
      search: '',
    },
    history: [],
  };
  wrapper = shallow(<OnboardingVersionA store={store} {...props} />)
    .dive()
    .dive();

  wrapper.setProps({
    temp_user: {
      temp_dog_ids: ['222'],
    },
  });
});
describe('Start step', () => {
  beforeEach(() => {
    const { dogs, ...rest } = sampleState;
    wrapper.setState({
      dogs,
      step: 1,
    });
  });

  test('renders', () => {
    expect(wrapper.exists()).toBe(true);
  });

  test('has a next button', () => {
    expect(wrapper.find('.btn-next-step')).toHaveLength(1);
  });

  test('fire Dog Info Entered', () => {
    wrapper.find('.btn-next-step').simulate('click');
    expect(fetch.mock.calls).toContainEqual([trackEndpoint, expect.anything()]);
    fetch.mock.calls.forEach((call) => {
      if (call[0] == trackEndpoint) {
        const body = JSON.parse(call[1]['body']);
        // should assert other arguments
        expect(body).toMatchObject({
          type: 'track',
          arguments: expect.objectContaining({
            event: 'Dog Info Entered',
          }),
        });
      }
    });
  });
});

describe('Second step', () => {
  beforeEach(() => {
    const { cookedRecipes, kibble, dietPortions, users, ...rest } = sampleState;
    wrapper.setState({
      ...rest,
      step: 2,
    });
  });

  test('renders', () => {
    expect(wrapper.exists()).toBe(true);
  });

  test('has a next button', () => {
    expect(wrapper.find('.btn-next-step')).toHaveLength(1);
  });

  test('has a prev button', () => {
    expect(wrapper.find('.btn-prev-step')).toHaveLength(1);
  });

  test('fire Dog Info Entered', () => {
    wrapper.find('.btn-next-step').simulate('click');
    expect(fetch.mock.calls).toContainEqual([trackEndpoint, expect.anything()]);
    fetch.mock.calls.forEach((call) => {
      if (call[0] == trackEndpoint) {
        const body = JSON.parse(call[1]['body']);
        // should assert other arguments
        expect(body).toMatchObject({
          type: 'track',
          arguments: expect.objectContaining({
            event: 'Dog Info Entered',
          }),
        });
      }
    });
  });
});

describe('Third step', () => {
  beforeEach(() => {
    const { dietPortions, users, ...rest } = sampleState;

    wrapper.setState({
      step: 3,
      ...rest,
    });
  });

  test('fire Recipe Info Entered', () => {
    wrapper.find('.btn-next-step').simulate('click');
    expect(fetch.mock.calls).toContainEqual([trackEndpoint, expect.anything()]);
    fetch.mock.calls.forEach((call) => {
      if (call[0] == trackEndpoint) {
        const body = JSON.parse(call[1]['body']);
        expect(body).toMatchObject({
          type: 'track',
          arguments: expect.objectContaining({
            event: 'Recipe Info Entered',
            properties: { recipes: ['beef', 'turkey+salmon'] },
          }),
        });
      }
    });
  });
});

describe('Fourth step', () => {
  beforeEach(() => {
    const { users, ...rest } = sampleState;

    wrapper.setState({
      ...rest,
      step: 4,
    });
    wrapper.setProps({
      temp_user: {
        temp_dog_ids: ['222'],
      },
    });
  });

  test('fire Portion Info Entered', () => {
    wrapper.find('.btn-next-step').simulate('click');
    expect(fetch.mock.calls).toContainEqual([trackEndpoint, expect.anything()]);
    fetch.mock.calls.forEach((call) => {
      if (call[0] == trackEndpoint) {
        const body = JSON.parse(call[1]['body']);
        expect(body).toMatchObject({
          type: 'track',
          arguments: expect.objectContaining({
            event: 'Portion Info Entered',
            properties: {
              cooked_portion_percent: 25,
              kibble_portion_percent: 75,
            },
          }),
        });
      }
    });
  });
});

describe('Fifth step', () => {
  beforeEach(() => {
    wrapper.setState({
      ...sampleState,
      step: 5,
    });
  });

  test('fires Human Info Entered', () => {
    wrapper.find('.btn-next-step').simulate('click');
    expect(fetch.mock.calls).toContainEqual([trackEndpoint, expect.anything()]);
    fetch.mock.calls.forEach((call) => {
      if (call[0] == trackEndpoint) {
        const body = JSON.parse(call[1]['body']);
        expect(body).toMatchObject({
          type: 'track',
          arguments: expect.objectContaining({
            event: 'Human Info Entered',
            properties: {
              first_name: 'First name',
              email: 'email@example.com',
            },
          }),
        });
      }
    });
  });

  test('calls identify', () => {
    wrapper.setState(sampleState);
    // should mock saga state instead of this
    wrapper.setProps({
      temp_user: {
        checkout_token: ['checkout_token'],
      },
    });
    expect(fetch.mock.calls).toContainEqual([trackEndpoint, expect.anything()]);
    fetch.mock.calls.forEach((call) => {
      if (call[0] == trackEndpoint) {
        const body = JSON.parse(call[1]['body']);
        expect(body).toMatchObject({
          type: 'identify',
          arguments: expect.objectContaining({
            traits: {
              first_name: 'First name',
              email: 'email@example.com',
            },
          }),
        });
      }
    });
  });
});