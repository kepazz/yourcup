import React, { useState } from "react";
import { useDispatch } from "react-redux";
import FileBase64 from "react-file-base64";
import { articleAdd } from "../../actions/articleActions";

export default function ArticleAdd() {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");

  const dispatch = useDispatch();

  console.log(image1);

  const submitHandler = (e) => {
    e.preventDefault();
    if (image1 !== "" && image2 !== "") {
      const article = {
        title: title,
        subtitle: subtitle,
        content: content,
        image1: image1,
        image2: image2,
      };
      console.log(article);
      dispatch(articleAdd(article));
    }
  };

  return (
    <>
      <div className="container">
        <h1 className="title has-text-centered mt-3">Article add page</h1>
        <hr />
        <div className="columns   is-centered">
          <div className="column is-5 ml-4">
            <form onSubmit={submitHandler} autoComplete="off">
              <div class="field">
                <label htmlFor="title" class="label">
                  Title
                </label>
                <div class="control">
                  <input
                    id="title"
                    type="type"
                    class="input"
                    placeholder="Enter title "
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
                    onChange={(e) => setSubtitle(e.target.value)}
                  />
                </div>
              </div>

              <div class="field">
                <label htmlFor="brand" class="label">
                  Image 1
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

              <div class="field">
                <label htmlFor="brand" class="label">
                  Image 2
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

              <div class="field">
                <label htmlFor="content" class="label">
                  Content
                </label>
                <div class="control">
                  <textarea
                    id="content"
                    type="text"
                    class="textarea"
                    placeholder="Enter content"
                    required
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>
              </div>

              <div class="field has-text-centered">
                <button class="button is-success is-rounded">Submit</button>
              </div>
            </form>
            {image1 && (
              <div>
                <img
                  style={{ width: "100%", height: 300 }}
                  alt={image1}
                  src={image1}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
