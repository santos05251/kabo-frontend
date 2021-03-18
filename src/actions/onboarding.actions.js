import { onboardingContstants } from '../constants';

const getOnboardingData = () => ({
  type: onboardingContstants.GET_ONBOARDING_DATA,
});

const getDogsFromForm = (dogs) => ({
  type: onboardingContstants.GET_DOGS_FROM_FORM,
  payload: dogs,
});

const getOnboardingDetails = () => ({
  type: onboardingContstants.GET_ONBOARDING_DETAILS,
});

const createTempUser = (data) => ({
  type: onboardingContstants.CREATE_TEMP_USER,
  payload: data,
});

const updateTempUser = (data) => ({
  type: onboardingContstants.UPDATE_TEMP_USER,
  payload: data,
});

const addDogRecipes = (data) => ({
  type: onboardingContstants.ADD_DOG_RECIPES,
  payload: data,
});

const updateRecipeSelection = (data) => ({
  type: onboardingContstants.UPDATE_RECIPES_SELECTION,
  payload: data,
})

const getDogDietPortion = (data) => ({
  type: onboardingContstants.GET_DOG_DIET_PORTION,
  payload: data,
});

const postCheckout = (data) => ({
  type: onboardingContstants.POST_CHECKOUT,
  payload: data,
});

const getCheckoutResult = (data) => ({
  type: onboardingContstants.GET_CHECKOUT_RESULT,
  payload: data,
});

export const onboardingActions = {
  getOnboardingData,
  getDogsFromForm,
  getOnboardingDetails,
  createTempUser,
  updateTempUser,
  addDogRecipes,
  updateRecipeSelection,
  getDogDietPortion,
  postCheckout,
  getCheckoutResult,
};
