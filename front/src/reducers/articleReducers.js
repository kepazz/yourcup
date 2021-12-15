import {
  ARTICLES_ADD_FAIL,
  ARTICLES_ADD_REQUEST,
  ARTICLES_ADD_SUCCESS,
  ARTICLES_DETAILS_FAIL,
  ARTICLES_DETAILS_REQUEST,
  ARTICLES_DETAILS_SUCCESS,
  ARTICLES_LIST_FAIL,
  ARTICLES_LIST_REQUEST,
  ARTICLES_LIST_SUCCESS,
  ARTICLES_UPDATE_FAIL,
  ARTICLES_UPDATE_REQUEST,
  ARTICLES_UPDATE_SUCCESS,
} from "../constants/articleConstants";

export const articleListReducer = (
  state = { loading: true, articles: [] },
  action
) => {
  switch (action.type) {
    case ARTICLES_LIST_REQUEST:
      return { loading: true };
    case ARTICLES_LIST_SUCCESS:
      return {
        loading: false,
        articles: action.payload,
      };
    case ARTICLES_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const articleAddReducer = (state = {}, action) => {
  switch (action.type) {
    case ARTICLES_ADD_REQUEST:
      return { message: "requesting" };
    case ARTICLES_ADD_SUCCESS:
      return { success: true };
    case ARTICLES_ADD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const articleDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case ARTICLES_DETAILS_REQUEST:
      return { loading: true };
    case ARTICLES_DETAILS_SUCCESS:
      return { loading: false, article: action.payload };
    case ARTICLES_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const articleUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case ARTICLES_UPDATE_REQUEST:
      return { message: "requesting" };
    case ARTICLES_UPDATE_SUCCESS:
      return { success: true };
    case ARTICLES_UPDATE_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};
