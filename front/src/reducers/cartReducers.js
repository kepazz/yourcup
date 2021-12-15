import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEMS,
  CART_REMOVE_SINGLE_ITEM,
  CART_SHIPPING_CREATE,
  CART_SHIPPING_REMOVE,
} from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      console.log(item);
      const existItem = state.cartItems.find((x) => x.name === item.name);
      if(item.sale ===true){
        item.price = (((100-item.saleAmount)/100)*item.price).toFixed(2);
      }

      if (existItem) {
        existItem.qty = (+existItem.qty) + (+item.qty);
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.name === existItem.name ? existItem : x
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, item] };
      }
    case CART_REMOVE_ITEMS:
      console.log(action.payload);
      return { ...state, cartItems: [] };
    case CART_REMOVE_SINGLE_ITEM:
      const itemId = action.payload;
      const removedSingleItem = state.cartItems.find(
        (x) => x.product === itemId
      );
      if (removedSingleItem.qty === 1) {
        return {
          ...state,
          cartItems: state.cartItems.filter(
            (x) => x.product !== action.payload
          ),
        };
      } else {
        removedSingleItem.qty--;
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.name === removedSingleItem.name ? removedSingleItem : x
          ),
        };
      }
    case CART_SHIPPING_CREATE:
      const info = action.payload;
      console.log(info);
      return { ...state, shippingInformation: info };
    case CART_SHIPPING_REMOVE:
      return { ...state, shippingInformation: {} };
    default:
      return state;
  }
};
