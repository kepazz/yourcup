import React from "react";
import { Link } from "react-router-dom";

export default function ArticleCard(props) {
  const { information } = props;
  return (
    <div>
      {/*<div className="card">
        <div className="card-image has-text-centered px-6">
          <figure className="image is-1by1">
            <img src={information.image1} alt={"article"} />
          </figure>
        </div>
        <div className="card-content">
          <p className="is-size-6">
            {information.title}...{" "}
            <Link to={`/articles/${information._id}`}>Read more</Link>
          </p>
        </div>
      </div>*/}

      <div className="card mx-2">
        <div className="card-header-title is-centered">
        {information.title}
        <br/>
        </div>
        <div className="columns">
          <br/>
          <div className="column is-half is-offset-one-quarter is-6-mobile is-offset-3-mobile">
            <figure className="image is-1by1">
              <img src={information.image1} alt={"article"} />
            </figure>
          </div>
        </div>
        <div className="card-content">
          <p className="is-size-6">
            {information.subtitle}...{" "}
            <Link to={`/articles/${information._id}`}>Read more</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
