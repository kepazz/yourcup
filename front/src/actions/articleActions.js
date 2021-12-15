import Axios from "axios";
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

export const listArticles = () => async (dispatch) => {
  dispatch({
    type: ARTICLES_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get("/api/articles/");
    dispatch({ type: ARTICLES_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ARTICLES_LIST_FAIL, payload: error.message });
  }
};

export const articleAdd = (article) => async (dispatch, getState) => {
  dispatch({ type: ARTICLES_ADD_REQUEST });
  console.log(article);
  const {
    userSignIn: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.post(`/api/articles/addArticle`, article, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });

    dispatch({ type: ARTICLES_ADD_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ARTICLES_ADD_FAIL, payload: message });
  }
};

export const listArticleDetails = (articleId) => async (dispatch) => {
  dispatch({ type: ARTICLES_DETAILS_REQUEST });
  try {
    const { data } = await Axios.get(`/api/articles/${articleId}`);
    dispatch({ type: ARTICLES_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ARTICLES_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const articleUpdate = (article) => async (dispatch, getState) => {
    dispatch({ type: ARTICLES_UPDATE_REQUEST });
  
    const {
      userSignIn: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.put(`/api/articles/update`, article, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: ARTICLES_UPDATE_SUCCESS });
      dispatch({ type: ARTICLES_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: ARTICLES_UPDATE_FAIL, payload: message });
    }
  };
