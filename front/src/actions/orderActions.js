import Axios from "axios";
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_LIST_BY_STATUS_FAIL,
  ORDER_LIST_BY_STATUS_REFRESH,
  ORDER_LIST_BY_STATUS_REQUEST,
  ORDER_LIST_BY_STATUS_SUCCESS,
  ORDER_LIST_BY_USER_FAIL,
  ORDER_LIST_BY_USER_REQUEST,
  ORDER_LIST_BY_USER_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_STATUS_CHANGE_FAIL,
  ORDER_STATUS_CHANGE_REQUEST,
  ORDER_STATUS_CHANGE_SUCCESS,
} from "../constants/orderConstants";

export const createOrder = (order) => async (dispatch, getState) => {
  dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
  try {
    const {
      userSignIn: { userInfo },
    } = getState();
    const { data } = await Axios.post("/api/orders", order, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const detailsOrder = (orderId) => async (dispatch, getState) => {
  dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
  const {
    userSignIn: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(`/api/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_DETAILS_FAIL, payload: message });
  }
};

export const listOrder = (userId) => async (dispatch, getState) => {
  dispatch({ type: ORDER_LIST_REQUEST, payload: userId });
  const {
    userSignIn: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(`/api/orders/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_LIST_FAIL, payload: message });
  }
};

export const listOrdersByStatus = (status) => async (dispatch, getState) => {
  dispatch({ type: ORDER_LIST_BY_STATUS_REQUEST });
  const {
    userSignIn: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(`/api/orders/orders/${status}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: ORDER_LIST_BY_STATUS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_LIST_BY_STATUS_FAIL, payload: message });
  }
};

export const OrderStatusChange = (orderToChangeId,orderToChangeStatus) => async (dispatch, getState) =>{
  dispatch({type: ORDER_STATUS_CHANGE_REQUEST});
  
  const {
    userSignIn: { userInfo },
  } = getState();
  try {
     const {data} = await Axios.put(`/api/orders/status/change`,{orderId: orderToChangeId, orderNewStatus:orderToChangeStatus}, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    
    dispatch({ type: ORDER_STATUS_CHANGE_SUCCESS, payload: data});
    dispatch({type:ORDER_LIST_BY_STATUS_REFRESH, payload:data});

  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_STATUS_CHANGE_FAIL, payload: message });
  }
}

export const orderListByUser = (userId) => async (dispatch, getState)=>{
  dispatch({type: ORDER_LIST_BY_USER_REQUEST});

  const {
    userSignIn: { userInfo },
  } = getState();
  try {
     const {data} = await Axios.get(`/api/orders/${userId}/summary`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    
    dispatch({ type: ORDER_LIST_BY_USER_SUCCESS, payload: data});
  

  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_LIST_BY_USER_FAIL, payload: message });
  }
}