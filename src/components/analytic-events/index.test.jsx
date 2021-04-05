import React from 'react';
import Enzyme, { mount } from 'enzyme';

import { Router } from 'react-router-dom';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { enableMocks } from 'jest-fetch-mock';

import { EventPageViews } from './index';

enableMocks();
Enzyme.configure({ adapter: new Adapter() });

const domain = process.env.REACT_APP_API_DOMAIN;
const trackEndpoint = domain + '/track';

let wrapper = null;

const setPage = (locData) => {
  const historyMock = {
    push: jest.fn(),
    location: { ...locData },
    listen: jest.fn(),
  };
  wrapper = mount(
    <Router history={historyMock}>
      <EventPageViews />
    </Router>
  );
};

describe('PageViews effect', () => {
  const pageNames = [
    {
      path: '/checkout/:checkout_token',
      component: 'Checkout Step',
    },
    {
      path: '/a/signup',
      component: 'Signup',
    },
    {
      path: '/b/signup',
      component: 'Signup',
    },
    {
      path: '/login',
      component: 'Login',
    },
    {
      path: '/orders',
      component: 'All Orders',
    },
    {
      path: '/orders/orderid',
      component: 'Order Detail',
    },
    {
      path: '/edit-plan/planid',
      component: 'Edit Plan',
    },
    {
      path: '/profile',
      component: 'Profile',
    },
    {
      path: '/manage-subscription',
      component: 'Manage Subscription',
    },
    {
      path: '/reactivate/dogid',
      component: 'Reactivation',
    },
    {
      path: '/unpause/dogid',
      component: 'Reactivation',
    },
  ].map((page) =>
    test(`fire page ${page.component} at ${page.path}`, () => {
      setPage({
        pathname: page.path,
      });

      expect(wrapper.exists()).toBe(true);
      expect(fetch.mock.calls).toContainEqual([
        trackEndpoint,
        expect.anything(),
      ]);
      fetch.mock.calls.forEach((call) => {
        if (call[0] == trackEndpoint) {
          const body = JSON.parse(call[1]['body']);
          expect(body).toMatchObject({
            type: 'page',
            arguments: expect.objectContaining({
              name: page.component,
            }),
          });
        }
      });
    })
  );
});
