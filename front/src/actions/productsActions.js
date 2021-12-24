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
import Axios from "axios";

export const listProducts = (type) => async (dispatch) => {
  dispatch({
    type: PRODUCT_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(`/api/products/category/${type}`);
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
  }
};

export const listThreeRandomProducts = () => async (dispatch) => {
  dispatch({
    type: PRODUCT_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(`/api/products/threeRandom`);
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
  }
};

export const listProductDetails = (coffeeId) => async (dispatch) => {
  dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: coffeeId });
  try {
    const { data } = await Axios.get(`/api/products/${coffeeId}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createComment =
  (coffeeId, comment) => async (dispatch, getState) => {
    dispatch({ type: PRODUCT_COMMENT_REQUEST });
    console.log("miau");
    const {
      userSignIn: { userInfo },
    } = getState();

    try {
      const { data } = await Axios.post(
        `/api/products/${coffeeId}/comment`,
        comment,
        { headers: { Authorization: `Bearer ${userInfo.token}` } }
      );
      dispatch({ type: PRODUCT_COMMENT_SUCCESS, payload: data.comment });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: PRODUCT_COMMENT_FAIL, payload: message });
    }
  };

export const deleteComment =
  (coffeeId, commentId) => async (dispatch, getState) => {
    dispatch({ type: COMMENT_DELETE_REQUEST, payload: commentId });

    const {
      userSignIn: { userInfo },
    } = getState();
    console.log(commentId);
    console.log(userInfo);
    try {
      const { test } = await Axios.delete(
        `/api/products/${coffeeId}/comments`,
        {
          data: { commentId: commentId },
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: COMMENT_DELETE_SUCCESS });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: COMMENT_DELETE_FAIL, payload: message });
    }
  };

export const listFavoriteProducts = (favorites) => async (dispatch) => {
  dispatch({
    type: FAVORITE_LIST_REQUEST,
  });

  try {
    const { data } = await Axios.post("/api/products/favorites", favorites);
    dispatch({ type: FAVORITE_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FAVORITE_LIST_FAIL, payload: error.message });
  }
};

//const { data } = await Axios.post(`/api/products/addNew`, newProduct, {

export const productAdd = (newProduct) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_ADD_REQUEST });
  console.log(newProduct);
  const {
    userSignIn: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.post(`/api/brand/test`, newProduct, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });

    dispatch({ type: PRODUCT_ADD_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PRODUCT_ADD_FAIL, payload: message });
  }
};

export const productUpdate = (product) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_UPDATE_REQUEST });

  const {
    userSignIn: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(`/api/products/update`, product, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: PRODUCT_UPDATE_SUCCESS });
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PRODUCT_UPDATE_FAIL, payload: message });
  }
};

export const productDelete = (product, brand) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_DELETE_REQUEST });
  const {
    userSignIn: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.delete(`/api/products/deleteProduct`, {
      data: { productId: product, brandId : brand},
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: PRODUCT_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PRODUCT_DELETE_FAIL, payload: message });
  }
};
