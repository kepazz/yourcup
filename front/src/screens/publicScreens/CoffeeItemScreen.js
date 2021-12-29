import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../../actions/cartActions";
import {
  createComment,
  deleteComment,
  listProductDetails,
} from "../../actions/productsActions";
import { favoritesAdd, favoritesDelete } from "../../actions/userActions";
import LoadingComponent from "../../components/LoadingComponent";

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

  const dateHandler = (displayDate) => {
    var d = new Date(displayDate);
    var date = d.getDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();
    var newDate = year + "/" + month + "/" + date;
    return newDate;
  };

  const commentAddHandler = () => {
    console.log(text);
    dispatch(createComment(coffeeId, { comment: text }));
    dispatch(listProductDetails(coffeeId));
    //window.location.reload();
  };

  const commentDeleteHandler = (commentId) => {
    console.log(commentId);
    dispatch(deleteComment(coffeeId, commentId));
    dispatch(listProductDetails(coffeeId));
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
        <div className="content is-medium has-text-centered pt-5">
          <h1>Sorry item wasnt found</h1>
        </div>
      ) : (
        <>
          <div className="container">
            <div className="content is-medium has-text-centered pt-5">
              <h1>Product item screen</h1>
            </div>
            <div className="columns">
              <div className="column is-3 is-offset-1 is-8-mobile is-offset-2-mobile has-text-centered">
                <figure class="image is-3by4 ">
                  <img src={coffeeUnit.image} alt={coffeeUnit.name} />
                </figure>
              </div>
              <div className="column is-7  mx-3">
                <div class="content is-size-5 ">
                  <p class="is-size-4">
                    <strong>{coffeeUnit.name}</strong>
                    {userInfo && (
                      <span className="ml-3">
                        {" "}
                        {/*  WHAT IF THERE IS NOTHING               */}
                        {userInfo.favorites.some(
                          (item) => item.product === coffeeUnit._id
                        ) ? (
                          <button
                            onClick={favoriteDeleteHandler}
                            className="button btn-prim is-rounded is-small"
                          >
                            Delete from favorites
                          </button>
                        ) : (
                          <button
                            onClick={favoriteAddHandler}
                            className="button btn-prim is-rounded is-small"
                          >
                            {" "}
                            Add to favorites
                          </button>
                        )}
                      </span>
                    )}
                  </p>
                  <p>
                    Brand:{" "}
                    <Link to={`/brand/${coffeeUnit.brand.name}`}>
                      {coffeeUnit.brand.name}
                    </Link>{" "}
                  </p>

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

                  <p>Description: {coffeeUnit.description}</p>
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
                      class="button  is-rounded btn-prim "
                      onClick={addToCartHandler}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="columns is-multiline">
              {coffeeUnit.comments.map((item) => (
                <div className="column is-3">
                  <article class="media">
                    <div class="media-content mx-3">
                      <div class="content box">
                        <p>
                          <strong>{item.name}: </strong>
                          <br />
                          <p class="subtitle is-6 ">{item.comment}</p>
                          {userInfo && (
                            <>
                              {userInfo.isAdmin === true ? (
                                <>
                                  <small>
                                    <a
                                      onClick={() =>
                                        commentDeleteHandler(item._id)
                                      }
                                      href="/#"
                                    >
                                      Delete
                                    </a>{" "}
                                    ·
                                  </small>
                                </>
                              ) : userInfo._id === item.user ? (
                                <>
                                  <small>
                                    <a
                                      onClick={() =>
                                        commentDeleteHandler(item._id)
                                      }
                                      href="/#"
                                    >
                                      Delete
                                    </a>{" "}
                                    ·
                                  </small>
                                </>
                              ) : (
                                <></>
                              )}
                            </>
                          )}
                          <span> {dateHandler(item.createdAt)} </span>
                        </p>
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </div>

            {userInfo && (
              <div class="columns has-text-centered">
                <div className="column is-6 is-offset-3 is-10-mobile is-offset-1-mobile ">
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
                        class="button btn-prim is-rounded mt-2 "
                        onClick={commentAddHandler}
                      >
                        Post comment
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
