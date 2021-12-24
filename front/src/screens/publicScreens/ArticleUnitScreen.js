import React, { useEffect } from "react";
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

  useEffect(() => {
    dispatch(listArticleDetails(articleId));
  }, [dispatch, articleId]);

  return (
    <>
      <h1 className="title is-2 has-text-centered mt-3">Articles</h1>
      {loading ? (
        <LoadingComponent></LoadingComponent>
      ) : error ? (
        <h1 className="title is-2 has-text-centered mt-3">
          This article doesnt exist
        </h1>
      ) : (
        <div className="container">
          <h1 className="title is-3 has-text-centered mt-3">{article.title}</h1>
          <div class="tile is-ancestor">
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
            <div class="tile is-4 is-vertical is-parent">
              <div class="tile is-child box has-text-centered">
                <img
                  src={article.image1}
                  alt={article.title}
                  className="img-article"
                />
              </div>
              <div class="tile is-child box has-text-centered">
                <img
                  src={article.image2}
                  alt={article.title}
                  className="img-article"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
