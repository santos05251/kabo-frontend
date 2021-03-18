// src/constants/endpoint.constants.js

const apiDomain = process.env.REACT_APP_API_DOMAIN;
const apiVersion = process.env.REACT_APP_API_VERSION;
const apiVersion2 = process.env.REACT_APP_API_VERSION2;

export const endpointConstants = {
  LOGIN: `${apiDomain}/login`,
  GET_ACCOUNT_DATA: `${apiDomain}/${apiVersion}/user/details`,
  PAUSE_SUBSCRIPTION: `${apiDomain}/${apiVersion}/user/subscriptions/pause`,
  UNPAUSE_SUBSCRIPTION: `${apiDomain}/${apiVersion}/user/subscriptions/resume`,
  REACTIVATE_SUBSCRIPTION: `${apiDomain}/${apiVersion}/user/subscriptions/reactivate`,
  GET_SUBSCRIPTION_DATA: `${apiDomain}/${apiVersion}/user/subscriptions`,
  CANCEL_SUBSCRIPTION: `${apiDomain}/${apiVersion}/user/subscriptions/cancel`,
  GET_RECIPE_DATA: `${apiDomain}/${apiVersion}/onboarding/recipes`,
  UPDATE_MEAL_PLAN: `${apiDomain}/${apiVersion}/user/subscriptions/meal_plan`,
  GET_BREEDS: `${apiDomain}/${apiVersion}/onboarding/signup?step=start`,
  GET_ORDER_DATA: `${apiDomain}/${apiVersion}/user/orders`,
  GET_NOTIFICATIONS_DATA: `${apiDomain}/${apiVersion}/user/notifications`,
  UPDATE_DELIVERY_ADDRESS: `${apiDomain}/${apiVersion}/user/delivery_address`,
  DAILY_DIET_PORTION: `${apiDomain}/${apiVersion}/user/subscriptions/portions`,
  UPDATE_PASSWORD: `${apiDomain}/${apiVersion}/user/password`,
  UPDATE_PAYMENT_METHOD: `${apiDomain}/${apiVersion}/user/payment_method`,
  GET_SUBSCRIPTION_ESTIMATE: `${apiDomain}/${apiVersion}/user/subscriptions/meal_plan/estimate`,
  UPDATE_DELIVERY_FREQUENCY: `${apiDomain}/${apiVersion}/user/delivery_frequency`,
  SKIP_DOG_DELIVERY: `${apiDomain}/${apiVersion}/user/subscriptions/skip_delivery`,
  UPDATE_PHONE_EMAIL: `${apiDomain}/${apiVersion}/user/contact`,
  APPLY_COUPON: `${apiDomain}/${apiVersion}/user/apply_coupon`,

  ONBOARDING_STARTER_STEP: `${apiDomain}/${apiVersion}/onboarding/signup?step=start`,
  ONBOARDING_DETAILS_STEP: `${apiDomain}/${apiVersion}/onboarding/signup?step=detail`,
  CREATE_TEMP_USER: `${apiDomain}/${apiVersion}/onboarding/users`,
  UPDATE_TEMP_USER: `${apiDomain}/${apiVersion}/onboarding/users`,
  GET_DOG_DIET_PORTION: `${apiDomain}/${apiVersion}/onboarding/portions`,
  GET_DOG_DIET_PORTION_V2: `${apiDomain}/${apiVersion2}/onboarding/portions`,
  GET_PAYPAL_REDIRECT_URL: `${apiDomain}/${apiVersion}/onboarding/paypal/authorization`,
  GET_PAYMENT_METHOD: `${apiDomain}/${apiVersion}/onboarding/payment_method`,
  VALIDATE_POSTAL_CODE: `${apiDomain}/${apiVersion}/checkout/validate/postal_code`,
  CHECKOUT: `${apiDomain}/${apiVersion}/checkout`,
  CHECKOUT_SUCCESS: `${apiDomain}/${apiVersion}/checkout/success`,
};
