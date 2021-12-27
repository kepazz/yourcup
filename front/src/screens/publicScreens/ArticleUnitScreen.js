import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listArticleDetails } from "../../actions/articleActions";
import LoadingComponent from "../../components/LoadingComponent";

export default function ArticleUnitScreen(props) {
  const dispatch = useDispatch();
  const articleId = props.match.params.id;
  const articleDetails = useSelector((state) => state.articleDetails);
  const { loading, error, article } = articleDetails;
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;
  const [imageActive, setImageActive] = useState(false);
  const [imageData, setImageData] = useState("");

  useEffect(() => {
    dispatch(listArticleDetails(articleId));
  }, [dispatch, articleId]);

  return (
    <>
      <div className="content is-medium has-text-centered">
        <h1 className="py-3">Article screen</h1>

      </div>
      {loading ? (
        <LoadingComponent></LoadingComponent>
      ) : error ? (
        <h1 className="title is-2 has-text-centered mt-3">
          This article doesnt exist
        </h1>
      ) : (
        <div className="container">
          <h1 className="title is-3 has-text-centered mt-3">{article.title}</h1>
          <div class="tile is-ancestor mx-3">
            <div class="tile is-parent">
              <div class="tile is-child box">
                <p class="title">
                  {article.subtitle}
                  {userInfo && userInfo.isAdmin && (
                    <span className="is-size-5 ">
                      <Link to={`/article_edit/${article._id}`}> Edit</Link>
                    </span>
                  )}
                </p>
                <p>{article.content}</p>
              </div>
            </div>
            <div class="tile is-3  is-vertical is-parent">
              <div class="tile is-child box ">
                <figure
                  class="image is-4by3 is-clickable"
                  onClick={() => {
                    setImageActive(!imageActive);
                    setImageData(article.image1);
                  }}
                >
                  <img src={article.image1} alt={article.title} />
                </figure>
              </div>
              <div class="tile is-child box ">
                <figure
                  class="image is-4by3 is-clickable"
                  onClick={() => {
                    setImageActive(!imageActive);
                    setImageData(article.image2);
                  }}
                >
                  <img src={article.image2} alt={article.title} />
                </figure>
              </div>
            </div>
          </div>

          {imageData && (<div
            className={`modal  ${imageActive ? "is-active" : ""}`}
            onClick={() => {
              setImageActive(!imageActive)
              setImageData(null);
            }}
          >
            <div class="modal-background "></div>
            <div class="modal-content ">
              <p class="image is-4by3 mx-2">
                <img src={imageData} alt={"modal"} />
              </p>
            </div>
            <button class="modal-close is-large" aria-label="close"></button>
          </div>)}
        </div>
      )}
    </>
  );
}
