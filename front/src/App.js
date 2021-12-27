import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "bulma/css/bulma.css";

import HomeScreen from "./screens/publicScreens/HomeScreen";
import RegisterScreen from "./screens/publicScreens/RegisterScreen";
import ArticlesScreen from "./screens/publicScreens/ArticlesScreen";
import ArticleUnitScreen from "./screens/publicScreens/ArticleUnitScreen";
import BrandScreen from "./screens/publicScreens/BrandScreen";
import BeveragesScreen from "./screens/publicScreens/BeveragesScreen";
import CoffeeItemScreen from "./screens/publicScreens/CoffeeItemScreen";
import SignInScreen from "./screens/publicScreens/SignInScreen";

import CartScreen from "./screens/userScreens/CartScreen";
import ShippingScreen from "./screens/userScreens/ShippingScreen";
import CheckoutScreen from "./screens/userScreens/CheckoutScreen";
import OrderScreen from "./screens/userScreens/OrderScreen";
import OrderListScreen from "./screens/userScreens/OrderListScreen";
import UpdatePasswordScreen from "./screens/userScreens/UpdatePasswordScreen";
import FavoritesScreen from "./screens/userScreens/FavoritesScreen";
import CupScreen from "./screens/publicScreens/CupScreen";
import MachinesSceen from "./screens/publicScreens/MachinesSceen";


import CoffeeScreen from "./screens/categoriesScreens/CoffeeScreen";

import DashboardScreen from "./screens/DashboardScreen";

import Navbar from "./components/Navbar";
import AdminRoute from "./components/AdminRoute";
import UserSummaryScreen from "./screens/adminScreens/UserSummaryScreen";
import UserOrderSummary from "./screens/adminScreens/UserOrderSummary";
import ProductAdd from "./screens/adminScreens/ProductAdd";
import ProductEdit from "./screens/adminScreens/ProductEdit";
import ArticleAdd from "./screens/adminScreens/ArticleAdd";
import ArticleEdit from "./screens/adminScreens/ArticleEdit";
import BrandModify from "./screens/adminScreens/BrandModify";
import PendingOrders from "./screens/adminScreens/PendingOrders";
import SendOrders from "./screens/adminScreens/SendOrders";


function App() {
  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <main className="bg">
        <Route exact path="/coffee/:id" component={CoffeeItemScreen}></Route>
        <Route path="/register" component={RegisterScreen}></Route>
        <Route path="/signin" component={SignInScreen}></Route>
        <Route path="/cart" component={CartScreen}></Route>
        <Route path="/shipping" component={ShippingScreen}></Route>
        <Route path="/checkout" component={CheckoutScreen}></Route>
        <Route path="/order/:id" component={OrderScreen}></Route>
        <Route path="/orders" component={OrderListScreen}></Route>

        <Route path="/update" component={UpdatePasswordScreen}></Route>
        <Route path="/favorites" component={FavoritesScreen}></Route>
        <Route exact path="/coffee" component={CoffeeScreen}></Route>
        <Route path="/beverages" component={BeveragesScreen}></Route>

        <Route path="/cup" component={CupScreen}></Route>
        <Route path="/machines" component={MachinesSceen}></Route>
        <Route exact path="/articles" component={ArticlesScreen}></Route>
        <Route exact path="/articles/:id" component={ArticleUnitScreen}></Route>
        <Route path="/brand/:brand" component={BrandScreen}></Route>
        <AdminRoute path="/dashboard" component={DashboardScreen}></AdminRoute>
        <AdminRoute
          path="/pendingorders"
          component={PendingOrders}
        ></AdminRoute>
        <AdminRoute path="/sendorders" component={SendOrders}></AdminRoute>
        <AdminRoute
          path="/user_summary/:id"
          component={UserSummaryScreen}
        ></AdminRoute>
        <AdminRoute
          path="/order_summary/:id"
          component={UserOrderSummary}
        ></AdminRoute>
        <AdminRoute path="/product_add" component={ProductAdd}></AdminRoute>
        <AdminRoute
          path="/product_edit/:id"
          component={ProductEdit}
        ></AdminRoute>
        <AdminRoute path="/article_add" component={ArticleAdd}></AdminRoute>
        <AdminRoute
          path="/article_edit/:id"
          component={ArticleEdit}
        ></AdminRoute>
        <AdminRoute path="/brand_modify" component={BrandModify}></AdminRoute>
        <Route path="/" component={HomeScreen} exact></Route>
      </main>
      <footer class="footer">
        <hr className="mx-4" />
        <div class="content has-text-centered">
          <p>
            <strong>Your Cup</strong> by{" "}
            <a href="https://jgthms.com">Edvinas Jakstas</a>. Vilnius, 2022.
            Source code <a href="https://github.com/kepazz/yourcup">Link</a>
          </p>
        </div>
      </footer>
    </BrowserRouter>
  );
}

export default App;
