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

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { loading: true };
    case ORDER_CREATE_SUCCESS:
      return { loading: false, success: true, order: action.payload };
    case ORDER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { loading: true };
    case ORDER_DETAILS_SUCCESS:
      return { loading: false, order: action.payload };
    case ORDER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderListReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return { loading: true };
    case ORDER_LIST_SUCCESS:
      return { loading: false, orderList: action.payload };
    case ORDER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderListByStatusReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case ORDER_LIST_BY_STATUS_REQUEST:
      return { loading: true };
    case ORDER_LIST_BY_STATUS_SUCCESS:
      return { loading: false, orderList: action.payload };
    case ORDER_LIST_BY_STATUS_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_LIST_BY_STATUS_REFRESH:
      return {
        ...state,
        orderList: state.orderList.filter(
          (x) => x.paymentResult.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export const orderChangeStatusReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_STATUS_CHANGE_REQUEST:
      return {};
    case ORDER_STATUS_CHANGE_SUCCESS:
      return { message: action.payload, success: true };
    case ORDER_STATUS_CHANGE_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};

export const orderListByUserReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case ORDER_LIST_BY_USER_REQUEST:
      return { loading: true };
    case ORDER_LIST_BY_USER_SUCCESS:
      return { loading: false, summary: action.payload };
    case ORDER_LIST_BY_USER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};


