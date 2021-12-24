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




import CartScreen from "./screens/CartScreen";
import ShippingScreen from "./screens/ShippingScreen";
import CheckoutScreen from "./screens/CheckoutScreen";
import OrderScreen from "./screens/OrderScreen";
import ProfileScreen from "./screens/ProfileScreen";
import OrderListScreen from "./screens/OrderListScreen";
import UpdatePasswordScreen from "./screens/UpdatePasswordScreen";
import Navbar from "./components/Navbar";
import FavoritesScreen from "./screens/FavoritesScreen";
import CoffeeScreen from "./screens/categoriesScreens/CoffeeScreen";


import CupScreen from "./screens/categoriesScreens/CupScreen";
import DashboardScreen from "./screens/DashboardScreen";
import PendingOrders from "./screens/PendingOrders";
import SendOrders from "./screens/SendOrders";

import AdminRoute from "./components/AdminRoute";
import UserSummaryScreen from "./screens/adminScreens/UserSummaryScreen";
import UserOrderSummary from "./screens/adminScreens/UserOrderSummary";
import ProductAdd from "./screens/adminScreens/ProductAdd";
import ProductEdit from "./screens/adminScreens/ProductEdit";
import ArticleAdd from "./screens/adminScreens/ArticleAdd";
import ArticleEdit from "./screens/adminScreens/ArticleEdit";
import BrandModify from "./screens/adminScreens/BrandModify";

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
        <Route path="/profile" component={ProfileScreen}></Route>
        <Route path="/update" component={UpdatePasswordScreen}></Route>
        <Route path="/favorites" component={FavoritesScreen}></Route>
        <Route exact path="/coffee" component={CoffeeScreen}></Route>
        <Route path="/beverages" component={BeveragesScreen}></Route>
        
        <Route path="/cup" component={CupScreen}></Route>
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
      <footer class="footer bg">
        <hr/>
        <div class="content has-text-centered ">
          <p>
            <strong>Bulma</strong> by{" "}
            <a href="https://jgthms.com">Jeremy Thomas</a>. The source code is
            licensed
            <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.
            The website content is licensed{" "}
            <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">
              CC BY NC SA 4.0
            </a>
            .
          </p>
        </div>
      </footer>
    </BrowserRouter>
  );
}

export default App;
