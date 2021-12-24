import {
  PRODUCT_COMMENT_FAIL,
  PRODUCT_COMMENT_REQUEST,
  PRODUCT_COMMENT_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  COMMENT_DELETE_FAIL,
  COMMENT_DELETE_REQUEST,
  COMMENT_DELETE_SUCCESS,
  FAVORITE_LIST_FAIL,
  FAVORITE_LIST_REQUEST,
  FAVORITE_LIST_SUCCESS,
  PRODUCT_ADD_REQUEST,
  PRODUCT_ADD_SUCCESS,
  PRODUCT_ADD_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
} from "../constants/productConstants";

export const productListReducer = (
  state = { loading: true, coffee: [] },
  action
) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        coffee: action.payload,
      };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    case FAVORITE_LIST_REQUEST:
      return { loading: true };
    case FAVORITE_LIST_SUCCESS:
      return {
        loading: false,
        coffee: action.payload,
      };
    case FAVORITE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, coffeeUnit: action.payload };
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productCommentCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_COMMENT_REQUEST:
      return { loading: true };
    case PRODUCT_COMMENT_SUCCESS:
      return { loading: false, success: true, comment: action.payload };
    case PRODUCT_COMMENT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const commentDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case COMMENT_DELETE_REQUEST:
      return {};
    case COMMENT_DELETE_SUCCESS:
      return { success: true };
    case COMMENT_DELETE_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};

export const productAddReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_ADD_REQUEST:
      return { message: "requesting" };
    case PRODUCT_ADD_SUCCESS:
      return { success: true };
    case PRODUCT_ADD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { message: "requesting" };
    case PRODUCT_UPDATE_SUCCESS:
      return { success: true };
    case PRODUCT_UPDATE_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return {};
    case PRODUCT_DELETE_SUCCESS:
      return { success: true };
    case PRODUCT_DELETE_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};
