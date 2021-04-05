import React, { useEffect } from 'react';
import { useHistory, matchPath } from 'react-router-dom';
import Analytics from '../../utils/analytics';

Analytics.init(process.env.REACT_APP_API_DOMAIN);

const DELIVERY_FREQUENCY_UPDATED = 'Delivery Frequency Updated';
const ORDER_COMPLETED = 'Order Completed';
const HUMAN_INFO_ENTERED = 'Human Info Entered';
const PORTION_INFO_ENTERED = 'Portion Info Entered';
const RECIPE_INFO_ENTERED = 'Recipe Info Entered';
const REMOVE_RECIPE_CLICKED = 'Remove Recipe Clicked';
const ADD_RECIPE_CLICKED = 'Add Recipe Clicked';
const ADD_ANOTHER_DOG_CLICKED = 'Add Another Dog Clicked';
const DOG_INFO_ENTERED = 'Dog Info Entered';

export const fireDeliveryFrequencyUpdated = (props = {}) =>
  Analytics.track(DELIVERY_FREQUENCY_UPDATED, props);
export const fireOrderCompleted = (props = {}) =>
  Analytics.track(ORDER_COMPLETED, props);
export const fireHumanInfoEntered = (props = {}) =>
  Analytics.track(HUMAN_INFO_ENTERED, props);
export const firePortionInfoEntered = (props = {}) =>
  Analytics.track(PORTION_INFO_ENTERED, props);
export const fireRecipeInfoEntered = (props = {}) =>
  Analytics.track(RECIPE_INFO_ENTERED, props);
export const fireRemoveRecipeClicked = (props = {}) =>
  Analytics.track(REMOVE_RECIPE_CLICKED, props);
export const fireAddRecipeClicked = (props = {}) =>
  Analytics.track(ADD_RECIPE_CLICKED, props);
export const fireAddAnotherDogClicked = (props = {}) =>
  Analytics.track(ADD_ANOTHER_DOG_CLICKED, props);
export const fireDogInfoEntered = (props = {}) =>
  Analytics.track(DOG_INFO_ENTERED, props);
export const callIdentify = (userId, props = {}) =>
  Analytics.identify(userId, props);

const getPageName = (pathname)=> {
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
      path: '/orders/:id',
      component: 'Order Detail',
    },
    {
      path: '/edit-plan/:id',
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
      path: '/reactivate/:dog_id',
      component: 'Reactivation',
    },
    {
      path: '/unpause/:dog_id',
      component: 'Reactivation',
    },
  ];
  const pageComponent = pageNames.find((page)=>(
    matchPath(pathname, {
      path: page.path,
      exact: true
    })
  ))
  return pageComponent ? pageComponent.component.replace(/page/ig, '') : null;
}

export const EventPageViews = () => {
  let history = useHistory();
  useEffect(() => {
    const document = window.document;
    const location = window.location;
    // access browser location instead of history location to fix referrer
    Analytics.page(getPageName(history.location.pathname), {
      path: location.pathname,
      referrer: document.referrer,
      search: location.search,
      title: document.title,
      url: location.href,
    });
  }, [history]);
  return null;
};
