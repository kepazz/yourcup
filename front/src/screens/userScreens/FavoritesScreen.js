import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { listFavoriteProducts } from "../../actions/productsActions";

import Card from "../../components/Card";
import LoadingComponent from "../../components/LoadingComponent";

export default function FavoritesScreen() {
  const dispatch = useDispatch();
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

  const coffeeList = useSelector((state) => state.productList);

  const { loading, coffee } = coffeeList;

  
  useEffect(() => {
    if (userInfo != null) {
      dispatch(listFavoriteProducts(userInfo.favorites));
    }
  }, [dispatch, userInfo]);

  return (
    <div>
      {!userInfo ? (
        <Redirect to="/"></Redirect>
      ) : loading ? (
        <LoadingComponent></LoadingComponent>
      ) : (
        <div>
          <div className="container">
          <div className="content is-medium has-text-centered">
              <h1 className="py-5">Favorites</h1>
              <hr className="mx-4"/>
            </div>
            <div className="columns is-multiline">
              {coffee.map((productUnit) => (
                <div className="column is-one-quarter ">
                  <Card key={productUnit._id} information={productUnit}></Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
