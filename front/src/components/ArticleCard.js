import React from "react";
import { Link } from "react-router-dom";

export default function ArticleCard(props) {
  const { information } = props;
  return (
    <div>
      <div className="card">
        <div className="card-image has-text-centered px-6">
          <figure className="image is-1by1">
            <img src={information.image1} alt={"article"} />
          </figure>
        </div>
        <div className="card-content">
          <p className="is-size-6">
            {information.title}... <Link to={`/articles/${information._id}`}>Read more</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
