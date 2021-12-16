import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../actions/cartActions";
import {
  createComment,
  deleteComment,
  listProductDetails,
} from "../actions/productsActions";
import { favoritesAdd, favoritesDelete } from "../actions/userActions";
import LoadingComponent from "../components/LoadingComponent";

export default function CoffeeItemScreen(props) {
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const [text, setText] = useState("");
  const coffeeId = props.match.params.id;
  console.log(props.match.params);
  const coffeeDetails = useSelector((state) => state.productDetails);
  const { loading, error, coffeeUnit } = coffeeDetails;
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

  useEffect(() => {
    dispatch(listProductDetails(coffeeId));
  }, [dispatch, coffeeId]);

  const addToCartHandler = () => {
    dispatch(addToCart(coffeeUnit._id, qty));
    console.log(qty);
  };

  const commentAddHandler = () => {
    console.log(text);
    dispatch(createComment(coffeeId, { comment: text }));
    //window.location.reload();
  };

  const commentDeleteHandler = (commentId) => {
    console.log(commentId);
    dispatch(deleteComment(coffeeId, commentId));
  };

  const favoriteAddHandler = () => {
    dispatch(favoritesAdd(coffeeId));
  };

  const favoriteDeleteHandler = () => {
    dispatch(favoritesDelete(coffeeId));
  };

  return (
    <div>
      {loading ? (
        <LoadingComponent></LoadingComponent>
      ) : error ? (
        <p>Sorry this item doesnt exist</p>
      ) : (
        <>
          <div className="container">
            <div className="content is-medium has-text-centered">
              <h1>Coffee item screen</h1>
            </div>
            <div className="columns">
              <div className="column is-5 has-text-centered">
                <img
                  src={coffeeUnit.image}
                  alt={coffeeUnit.name}
                  className="px-6"
                />
              </div>
              <div className="column is-7 ">
                <div class="content is-size-5 ml-5">
                  <p class="">
                    <strong>{coffeeUnit.name}</strong>
                    {userInfo && (
                      <div>
                        {" "}
                        {/*  WHAT IF THERE IS NOTHING               */}
                        {userInfo.favorites.some(
                          (item) => item.product === coffeeUnit._id
                        ) ? (
                          <button
                            onClick={favoriteDeleteHandler}
                            className="button is-warning"
                          >
                            Delete from favorites
                          </button>
                        ) : (
                          <button
                            onClick={favoriteAddHandler}
                            className="button is-warning"
                          >
                            Add to favorites
                          </button>
                        )}
                      </div>
                    )}
                  </p>
                  <p>Brand: <Link to={`/brand/${coffeeUnit.brand.name}`}>{coffeeUnit.brand.name}</Link> </p>

                  {coffeeUnit.sale === false ? (
                    <p>Price: {coffeeUnit.price.toFixed(2)} €</p>
                  ) : (
                    <p>
                      Price:
                      <span className="line-through has-text-danger">
                        {coffeeUnit.price.toFixed(2)} €
                      </span>{" "}
                      <span>
                        {(
                          ((100 - coffeeUnit.saleAmount) / 100) *
                          coffeeUnit.price
                        ).toFixed(2)}{" "}
                        €
                      </span>
                    </p>
                  )}
                  <p>Package size: {coffeeUnit.packageSize}g.</p>
                  <p>Package size: {coffeeUnit.description}g.</p>
                  <p>
                    Description: Lorem Ipsum is simply dummy text of the
                    printing and typesetting industry. Lorem Ipsum has been the
                    industry's standard dummy text ever since the 1500s, when an
                    unknown printer took a galley of type and scrambled it to
                    make a type specimen book. It has survived not only five
                    centuries, but also the leap into electronic typesetting,
                    remaining essentially unchanged. It was popularised in the
                    1960s with the release of Letraset sheets containing Lorem
                    Ipsum passages, and more recently with desktop publishing
                    software like Aldus PageMaker including versions of Lorem
                    Ipsum.
                  </p>
                  <div className="has-text-centered ">
                    <input
                      className="input has-text-centered mr-5"
                      type="number"
                      style={{ width: "15%" }}
                      placeholder="amount"
                      defaultValue="1"
                      onChange={(e) => setQty(e.target.value)}
                    />
                    <button
                      class="button is-info is-rounded  "
                      onClick={addToCartHandler}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {coffeeUnit.comments.map((item) => (
              <article class="media">
                <div class="media-content mx-3">
                  <div class="content">
                    <p>
                      <strong>{item.name}: </strong>---- {item.comment}------
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Duis porta eros lacus, nec ultricies elit blandit non.
                      Suspendisse pellentesque mauris sit amet dolor blandit
                      rutrum. Nunc in tempus turpis.
                      {userInfo && (
                        <div>
                          {userInfo._id === item.user && (
                            <p>
                              <small>
                                <a
                                  onClick={() => commentDeleteHandler(item._id)}
                                >
                                  Delete
                                </a>{" "}
                                · 3 hrs
                              </small>
                            </p>
                          )}
                        </div>
                      )}
                    </p>
                  </div>
                </div>
              </article>
            ))}

            {userInfo && (
              <article class="media mx-2 has-text-centered">
                <div class="media-content">
                  <div class="field">
                    <p class="control">
                      <textarea
                        class="textarea"
                        placeholder="Add a comment..."
                        onChange={(e) => setText(e.target.value)}
                      ></textarea>
                    </p>
                  </div>
                  <div class="field">
                    <p class="control">
                      <button
                        class="button is-info is-rounded mt-2 "
                        onClick={commentAddHandler}
                      >
                        Post comment
                      </button>
                    </p>
                  </div>
                </div>
              </article>
            )}
          </div>
        </>
      )}
    </div>
  );
}
