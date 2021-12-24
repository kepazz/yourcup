import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import thunk from "redux-thunk";
import {
  articleAddReducer,
  articleDetailsReducer,
  articleListReducer,
  articleUpdateReducer,
} from "./reducers/articleReducers";
import {
  brandAddReducer,
  brandDetailsReducer,
  brandListReducer,
} from "./reducers/brandReducers";
import { cartReducer } from "./reducers/cartReducers";
import {
  orderChangeStatusReducer,
  orderCreateReducer,
  orderDetailsReducer,
  orderListByStatusReducer,
  orderListByUserReducer,
  orderListReducer,
} from "./reducers/orderReducer";
import {
  productDetailsReducer,
  productListReducer,
  commentDeleteReducer,
  productCommentCreateReducer,
  productAddReducer,
  productUpdateReducer,
  productDeleteReducer,
} from "./reducers/productReducers";
import {
  favoritesUpdateReducer,
  userRegisterReducer,
  userSignInReducer,
  userUpdatePasswordReducer,
} from "./reducers/userReducers";

const initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInformation: localStorage.getItem("shippingInformation")
      ? JSON.parse(localStorage.getItem("shippingInformation"))
      : [],
  },
  userSignIn: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
};

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  userSignIn: userSignInReducer,
  cart: cartReducer,
  userRegister: userRegisterReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderList: orderListReducer,
  userUpdatePassword: userUpdatePasswordReducer,
  productCommentCreate: productCommentCreateReducer,
  commentDelete: commentDeleteReducer,
  favoritesUpdate: favoritesUpdateReducer,
  orderListByStatus: orderListByStatusReducer,
  orderChangeStatus: orderChangeStatusReducer,
  orderListByUser: orderListByUserReducer,
  productAdd: productAddReducer,
  productUpdate: productUpdateReducer,
  productDelete: productDeleteReducer,
  articleList: articleListReducer,
  articleAdd: articleAddReducer,
  articleDetails: articleDetailsReducer,
  articleUpdate: articleUpdateReducer,
  brandList: brandListReducer,
  brandAdd: brandAddReducer,
  brandDetails: brandDetailsReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
