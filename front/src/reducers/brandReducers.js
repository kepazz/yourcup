import { BRAND_ADD_FAIL, BRAND_ADD_REQUEST, BRAND_ADD_SUCCESS, BRAND_DETAILS_FAIL, BRAND_DETAILS_REQUEST, BRAND_DETAILS_SUCCESS, BRAND_LIST_FAIL, BRAND_LIST_REQUEST, BRAND_LIST_SUCCESS } from "../constants/brandConstants";

export const brandListReducer = (
    state = { loading: true, articles: [] },
    action
  ) => {
    switch (action.type) {
      case BRAND_LIST_REQUEST:
        return { loading: true };
      case BRAND_LIST_SUCCESS:
        return {
          loading: false,
          brands: action.payload,
        };
      case BRAND_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const brandAddReducer = (state = {}, action) => {
    switch (action.type) {
      case BRAND_ADD_REQUEST:
        return { message: "requesting" };
      case BRAND_ADD_SUCCESS:
        return { success: true };
      case BRAND_ADD_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const brandDetailsReducer = (
    state = { loading: true, articles: [] },
    action
  ) => {
    switch (action.type) {
      case BRAND_DETAILS_REQUEST:
        return { loading: true };
      case BRAND_DETAILS_SUCCESS:
        return {
          loading: false,
          details: action.payload,
        };
      case BRAND_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };