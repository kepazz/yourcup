import Axios from "axios";
import {  CART_ADD_ITEM, CART_REMOVE_SINGLE_ITEM, CART_SHIPPING_CREATE, CART_SHIPPING_REMOVE, CART_REMOVE_ITEMS } from "../constants/cartConstants";

export const addToCart = (coffeeId, qty) => async (dispatch, getState) => {
  const { data } = await Axios.get(`/api/products/${coffeeId}`);
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      name: data.name,
      price: data.price,
      product: data._id,
      sale: JSON.parse(data.sale),
      saleAmount:data.saleAmount,
      qty,
      image: data.image,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeItemsFromCart = () => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEMS });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};


export const removeFromCartSingleItem = (coffeeId) => (dispatch, getState) =>{
  dispatch ({type:CART_REMOVE_SINGLE_ITEM, payload:coffeeId});
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}

export const createShippingInformation = (shippingInfo) => (dispatch, getState) =>{
  dispatch ({type:CART_SHIPPING_CREATE, payload:shippingInfo});
  localStorage.setItem("shippingInformation", JSON.stringify(getState().cart.shippingInformation));
}

export const removeShippingInformation = () => (dispatch,getState) =>{
  dispatch ({type:CART_SHIPPING_REMOVE});
  localStorage.setItem("shippingInformation", JSON.stringify(getState().cart.shippingInformation));
}


