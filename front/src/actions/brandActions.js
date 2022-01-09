import Axios from "axios";
import {
  BRAND_ADD_FAIL,
  BRAND_ADD_REQUEST,
  BRAND_ADD_SUCCESS,
  BRAND_DETAILS_FAIL,
  BRAND_DETAILS_REQUEST,
  BRAND_DETAILS_SUCCESS,
  BRAND_LIST_FAIL,
  BRAND_LIST_REQUEST,
  BRAND_LIST_SUCCESS,
} from "../constants/brandConstants";
import { PRODUCT_DELETE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS } from "../constants/productConstants";



export const listBrands = () => async (dispatch) => {
  dispatch({
    type: BRAND_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get("/api/brand/");
    dispatch({ type: BRAND_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: BRAND_LIST_FAIL, payload: message });
  }
};

export const brandAdd = (brand) => async (dispatch, getState) => {
  dispatch({ type: BRAND_ADD_REQUEST });
  const {
    userSignIn: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.post(`/api/brand/addBrand`, brand, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });

    dispatch({ type: BRAND_ADD_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: BRAND_ADD_FAIL, payload: message });
  }
};

export const listBrandDetails = (brand) => async (dispatch) => {
  dispatch({
    type: BRAND_DETAILS_REQUEST,
  });
  try {
    const { data } = await Axios.get(`/api/brand/${brand}`);
    dispatch({ type: BRAND_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: BRAND_DETAILS_FAIL, payload: error.message });
  }
};

export const brandDelete = (brand) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_DELETE_REQUEST });
  const {
    userSignIn: { userInfo },
  } = getState();
  try {
     await Axios.delete(`/api/brand/brandDelete`, {
      data: {  brandId: brand },
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