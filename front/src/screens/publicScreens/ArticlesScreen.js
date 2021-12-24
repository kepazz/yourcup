import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listArticles } from "../../actions/articleActions";
import ArticleCard from "../../components/ArticleCard";
import LoadingComponent from "../../components/LoadingComponent";

export default function ArticlesScreen() {
  const dispatch = useDispatch();
  const articlesData = useSelector((state) => state.articleList);
  const { loading, error, articles } = articlesData;

  useEffect(() => {
    dispatch(listArticles());
  }, [dispatch]);

  return (
    <div className="container">
      <h1 className="title is-2 has-text-centered pt-3">Articles</h1>
      {loading ? (
        <LoadingComponent></LoadingComponent>
      ) : (
        <div>
          <hr />
          <div className="columns is-multiline">
            {articles.map((article) => (
              <div className="column is-one-third is-8-mobile is-offset-2-mobile">
                <ArticleCard
                  key={article._id}
                  information={article}
                ></ArticleCard>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
