import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../actions/cartActions";
import LoadingComponent from "./LoadingComponent";

export default function Card(props) {
  const dispatch = useDispatch();
  const { information } = props;
  const userSignin = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignin;

  const addToCartHandler = () => {
    dispatch(addToCart(information._id, 1));
  };

  return (
    <>
      {information && (
        <div className="card card-categories mx-2 " key={information._id}>
          <div class="card-title has-text-centered">
            <h3 className="title is-4 pt-5 pb-3 is-size-3-mobile">
              {information.name}
            </h3>
          </div>
          <div className="card-image has-text-centered px-5 ">
            <Link to={`/coffee/${information._id}`}>
              <figure className="image is-3by4">
                <img src={information.image} alt={information.name} />
              </figure>
            </Link>
          </div>
          <div className="card-content">
            {information.sale === false ? (
              <p>{information.price} €</p>
            ) : (
              <p>
                <span className="line-through has-text-danger">
                  {information.price} €
                </span>{" "}
                <span>
                  {((100 - information.saleAmount) / 100) * information.price}.toFixed(2) €
                </span>
              </p>
            )}

            {information.type === "coffee" || information.type === "tea" ? (
              <p className="is-size-5"> Species: {information.species}</p>
            ) : (
              <p className="is-size-5">{information.species}</p>
            )}
          </div>
          <footer className="card-footer">
            <p className="card-footer-item">
              <button
                class="button btn-prim is-rounded"
                onClick={addToCartHandler}
              >
                Add to cart
              </button>
            </p>
          </footer>
          {userInfo && userInfo.isAdmin && (
            <div className="has-text-centered pb-2">
              <Link to={`/product_edit/${information._id}`}>Edit</Link>
            </div>
          )}
        </div>
      ) }
    </>
  );
}
