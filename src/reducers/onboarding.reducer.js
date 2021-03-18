import { onboardingContstants } from "../constants";

const initialState = {
  loading_onboarding_starter_data: false,
  onboarding_starter_data: {},

  dogs: {},

  loading_onboarding_details: false,
  onboarding_details_data: {},

  creating_temp_user: false,
  temp_user: {
    temp_dog_ids: [222, 223],
  },

  updating_temp_user: false,
  adding_dog_recipes: false,

  recipes_selected: {},
  
  getting_diet_portion: false,
  diet_portions: {},

  posting_checkout: false,
  post_checkout_result: {},

  getting_checkout_result: false,
  checkout_success_result: {},
};

export const onboarding = (state = initialState, action) => {
  switch (action.type) {
    case onboardingContstants.GET_ONBOARDING_DATA:
      return {
        ...state,
        loading_onboarding_starter_data: true,
      };
    case onboardingContstants.GET_ONBOARDING_DATA_SUCCESS:
      return {
        ...state,
        loading_onboarding_starter_data: false,
        onboarding_starter_data: action.payload,
      };
    case onboardingContstants.GET_ONBOARDING_DATA_FAILED:
      return {
        ...state,
        loading_onboarding_starter_data: false,
      };

    case onboardingContstants.GET_DOGS_FROM_FORM_SUCCESS:
      return {
        ...state,
        dogs: action.payload,
      };

    case onboardingContstants.GET_ONBOARDING_DETAILS:
      return {
        ...state,
        loading_onboarding_details: true,
      };

    case onboardingContstants.GET_ONBOARDING_DETAILS_SUCCESS:
      return {
        ...state,
        loading_onboarding_details: false,
        onboarding_details_data: action.payload,
      };

    case onboardingContstants.GET_ONBOARDING_DETAILS_FAILED:
      return {
        ...state,
        loading_onboarding_details: false,
      };

    case onboardingContstants.CREATE_TEMP_USER:
      return {
        ...state,
        creating_temp_user: true,
      };

    case onboardingContstants.CREATE_TEMP_USER_SUCCESS:
      return {
        ...state,
        creating_temp_user: false,
        temp_user: action.payload,
      };

    case onboardingContstants.CREATE_TEMP_USER_FAILED:
      return {
        ...state,
        creating_temp_user: false,
      };

    case onboardingContstants.UPDATE_TEMP_USER:
      return {
        ...state,
        updating_temp_user: true,
      };

    case onboardingContstants.UPDATE_TEMP_USER_SUCCESS:
      return {
        ...state,
        updating_temp_user: false,
        temp_user: action.payload,
      };

    case onboardingContstants.UPDATE_TEMP_USER_FAILED:
      return {
        ...state,
        updating_temp_user: false,
      };

    case onboardingContstants.ADD_DOG_RECIPES:
      return {
        ...state,
        adding_dog_recipes: true,
      };

    case onboardingContstants.ADD_DOG_RECIPES_SUCCESS:
      return {
        ...state,
        adding_dog_recipes: false,
      };

    case onboardingContstants.ADD_DOG_RECIPES_FAILED:
      return {
        ...state,
        adding_dog_recipes: false,
      };
  
    case onboardingContstants.UPDATE_RECIPES_SELECTION_SUCCESS:
      return {
        ...state,
        recipes_selected: action.payload,
      };
  
    case onboardingContstants.GET_DOG_DIET_PORTION:
      return {
        ...state,
        getting_diet_portion: true,
      };

    case onboardingContstants.GET_DOG_DIET_PORTION_SUCCESS:
      return {
        ...state,
        getting_diet_portion: false,
        diet_portions: action.payload,
      };

    case onboardingContstants.GET_DOG_DIET_PORTION_FAILED:
      return {
        ...state,
        getting_diet_portion: false,
      };

    case onboardingContstants.POST_CHECKOUT:
      return {
        ...state,
        posting_checkout: true,
      };

    case onboardingContstants.POST_CHECKOUT_SUCCESS:
      return {
        ...state,
        posting_checkout: false,
        post_checkout_result: action.payload,
      };

    case onboardingContstants.POST_CHECKOUT_FAILED:
      return {
        ...state,
        posting_checkout: false,
      };

    case onboardingContstants.GET_CHECKOUT_RESULT:
      return {
        ...state,
        getting_checkout_result: true,
      };

    case onboardingContstants.GET_CHECKOUT_RESULT_SUCCESS:
      return {
        ...state,
        getting_checkout_result: false,
        checkout_success_result: action.payload,
      };

    case onboardingContstants.GET_CHECKOUT_RESULT_FAILED:
      return {
        ...state,
        getting_checkout_result: false,
      };
    default:
      return state;
  }
};
