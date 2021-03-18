import { request } from '../utils';
import { endpointConstants } from '../constants';

const getOnboardingData = () => {
  const requestOptions = request.options('GET', {}, true, false);

  return fetch(endpointConstants.ONBOARDING_STARTER_STEP, requestOptions)
    .then(request.handleResponse)
    .then((res) => res);
};

const getOnboardingDetails = () => {
  const requestOptions = request.options('GET', {}, true, false);

  return fetch(endpointConstants.ONBOARDING_DETAILS_STEP, requestOptions)
    .then(request.handleResponse)
    .then((res) => res);
};

const createTempUser = (data) => {
  const requestOptions = request.options('POST', JSON.stringify(data), true, true);

  return fetch(endpointConstants.CREATE_TEMP_USER, requestOptions)
    .then(request.handleResponse)
    .then((res) => res);
};

const updateTempUser = (data) => {
  const requestOptions = request.options('PUT', JSON.stringify(data.details), true, true);

  return fetch(`${endpointConstants.UPDATE_TEMP_USER}/${data.id}`, requestOptions)
    .then(request.handleResponse)
    .then((res) => res);
};

const addDogRecipes = (data) => {
  const requestOptions = request.options('PUT', JSON.stringify(data.details), true, true);

  return fetch(`${endpointConstants.UPDATE_TEMP_USER}/${data.userId}`, requestOptions)
    .then(request.handleResponse)
    .then((res) => res);
};

const getDogDietPortion = async (data) => {
  const requestOptions = request.options('POST', JSON.stringify(data), true, true);

  return fetch(endpointConstants.GET_DOG_DIET_PORTION_V2, requestOptions)
    .then(request.handleResponse)
    .then((res) => res);
};

const validatePostalCode = async (data) => {
  const requestOptions = request.options('POST', JSON.stringify(data), true, true);

  return fetch(endpointConstants.VALIDATE_POSTAL_CODE, requestOptions)
    .then(request.handleResponse)
    .then((res) => res);
};

const getPaypalRedirect = async (data) => {
  const requestOptions = request.options('GET', {}, true, false);

  return fetch(`${endpointConstants.GET_PAYPAL_REDIRECT_URL}?checkout_token=${data.checkout_token}`, requestOptions)
    .then(request.handleResponse)
    .then((res) => res);
};

const getPaymentMethodDetails = async (data) => {
  const requestOptions = request.options('GET', {}, true, false);

  return fetch(`${endpointConstants.GET_PAYMENT_METHOD}?token=${data.token}`, requestOptions)
    .then(request.handleResponse)
    .then((res) => res);
};

const postCheckout = async (data) => {
  const requestOptions = request.options('POST', JSON.stringify(data.details), true, true);

  return fetch(`${endpointConstants.CHECKOUT}/${data.checkout_token}`, requestOptions)
    .then(request.handleResponse)
    .then((res) => res);
};

const getCheckoutResult = async (data) => {
  const requestOptions = request.options('GET', {}, true, false);

  return fetch(`${endpointConstants.CHECKOUT_SUCCESS}`, requestOptions)
    .then(request.handleResponse)
    .then((res) => res);
};

//  eslint-disable-next-line import/prefer-default-export
export const onboardingService = {
  getOnboardingData,
  getOnboardingDetails,
  createTempUser,
  updateTempUser,
  addDogRecipes,
  getDogDietPortion,
  validatePostalCode,
  getPaypalRedirect,
  getPaymentMethodDetails,
  postCheckout,
  getCheckoutResult,
};
