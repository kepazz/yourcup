import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  articleUpdate,
  listArticleDetails,
} from "../../actions/articleActions";
import LoadingComponent from "../../components/LoadingComponent";
import FileBase64 from "react-file-base64";
import { toast } from "react-toastify";
import ToastComponent from "../../components/ToastComponent";

export default function ArticleEdit(props) {
  const articleId = props.match.params.id;
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const dispatch = useDispatch();
  const articleDetails = useSelector((state) => state.articleDetails);
  const { loading, error, article } = articleDetails;

  useEffect(() => {
    dispatch(listArticleDetails(articleId));
  }, [dispatch, articleId]);

  useEffect(() => {
    if (article) {
      setTitle(article.title);
      setSubtitle(article.subtitle);
      setContent(article.content);
      setImage1(article.image1);
      setImage2(article.image2);
    }
  }, [article]);

  const submitHandler = (e) => {
    e.preventDefault();

    const article = {
      id: articleId,
      title: title,
      subtitle: subtitle,
      content: content,
      image1: image1,
      image2: image2,
    };
    dispatch(articleUpdate(article));
    toast("Article updated");
  };

  return (
    <>
      {loading ? (
        <LoadingComponent></LoadingComponent>
      ) : error ? (
        <div className="content is-medium has-text-centered">
          <h1 className="py-5">Sorry this article doesnt exist</h1>
          
        </div>
      ) : (
        <div className="container">
          <div className="content is-medium has-text-centered">
            <h1 className="py-5">Article edit</h1>
            <hr className="mx-4" />
          </div>

          <div className="columns   is-centered">
            <div className="column is-5 mx-4">
              <form onSubmit={submitHandler}>
                <div class="field">
                  <label htmlFor="id" class="label">
                    Id
                  </label>
                  <div class="control">
                    <input
                      id="id"
                      type="type"
                      class="input"
                      value={article._id}
                      disabled="true"
                    />
                  </div>
                </div>

                <div class="field">
                  <label htmlFor="title" class="label">
                    Title
                  </label>
                  <div class="control">
                    <input
                      id="title"
                      type="type"
                      class="input"
                      placeholder="Enter title"
                      defaultValue={article.title}
                      required
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                </div>

                <div class="field">
                  <label htmlFor="subtitle" class="label">
                    Subtitle
                  </label>
                  <div class="control">
                    <input
                      id="subtitle"
                      type="text"
                      class="input"
                      placeholder="Enter subtitle"
                      required
                      defaultValue={article.subtitle}
                      onChange={(e) => setSubtitle(e.target.value)}
                    />
                  </div>
                </div>

                <div class="field">
                  <label htmlFor="brand" class="label">
                    Image first{" "}
                    <span className="has-text-weight-normal is-size-7">
                      [Preview]
                    </span>
                  </label>
                  <div class="file has-name">
                    <label class="file-label">
                      <FileBase64
                        type="file"
                        multiple={false}
                        onDone={({ base64 }) => setImage1(base64)}
                      />
                    </label>
                  </div>
                </div>

                <div className="columns has-text-centered">
                  <div className="column is-6  is-offset-3  is-6-mobile is-offset-3-mobile">
                    <img src={image1} alt={image1} />
                  </div>
                </div>

                <div class="field">
                  <label htmlFor="brand" class="label">
                    Image second{" "}
                    <span className="has-text-weight-normal is-size-7">
                      [Preview]
                    </span>
                  </label>
                  <div class="file has-name">
                    <label class="file-label">
                      <FileBase64
                        type="file"
                        multiple={false}
                        onDone={({ base64 }) => setImage2(base64)}
                      />
                    </label>
                  </div>
                </div>

                <div className="columns has-text-centered">
                  <div className="column is-6  is-offset-3 is-6-mobile is-offset-3-mobile">
                    <img src={image2} alt={image2} />
                  </div>
                </div>

                <div class="field">
                  <label htmlFor="content" class="label">
                    Content
                  </label>
                  <div class="control">
                    <textarea
                      id="content"
                      type="text"
                      class="textarea"
                      placeholder="Specie"
                      required
                      defaultValue={article.content}
                      onChange={(e) => setContent(e.target.value)}
                    />
                  </div>
                </div>

                <div class="field has-text-centered mt-5">
                  <button class="button is-success is-rounded">Submit</button>
                  <ToastComponent />
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
