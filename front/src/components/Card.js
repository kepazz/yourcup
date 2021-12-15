import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../actions/cartActions";

export default function Card(props) {
  const dispatch = useDispatch();
  const { information } = props;
  const userSignin = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignin;

  const addToCartHandler = () => {
    dispatch(addToCart(information._id, 1));
  };

  return (
    <div className="card" key={information._id}>
      <div className="card-image has-text-centered px-6">
        <Link to={`/coffee/${information._id}`}>
          <figure className="image is-3by5">
            <img src={information.image} alt={information.name} />
          </figure>
        </Link>
      </div>
      <div className="card-content">
        {information.sale === false ? (
          <p>{information.price.toFixed(2)} €</p>
        ) : (
          <p>
            <span className="line-through has-text-danger">{information.price.toFixed(2)} €</span>{" "}
            <span>{(((100-information.saleAmount)/100)*information.price).toFixed(2)} €</span>
          </p>
        )}

        <p className="is-size-4">
          <strong>{information.name}</strong>
        </p>
        <p className="is-size-6">{information.species}</p>
      </div>
      <footer className="card-footer">
        <p className="card-footer-item">
          <button class="button is-info is-rounded" onClick={addToCartHandler}>
            Add to cart
          </button>
        </p>
      </footer>
      {userInfo && userInfo.isAdmin && (
        <div className="has-text-centered">
          <Link to={`/product_edit/${information._id}`}>Edit</Link>
          <hr />
        </div>
      )}
    </div>
  );
}
