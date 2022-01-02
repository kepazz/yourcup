import React, { useState } from "react";
import { useDispatch } from "react-redux";
import FileBase64 from "react-file-base64";
import { articleAdd } from "../../actions/articleActions";
import { toast } from "react-toastify";
import ToastComponent from "../../components/ToastComponent";

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
      toast("Article added");
    } else {
      toast("Please add images");
    }
  };

  return (
    <>
      <div className="container">
        <h1 className="title has-text-centered mt-3">Article add page</h1>
        <hr className="mx-4" />
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
                  Image 1 <span className="has-text-weight-normal is-size-7">
                            [ Preview]
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
                  Image 2 <span className="has-text-weight-normal is-size-7">
                            [ Preview]
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
                  <div className="column is-6  is-offset-3  is-6-mobile is-offset-3-mobile">
                    <img src={image2} alt={image2} />
                  </div>
                </div>

              <div class="field">
                <label htmlFor="content" class="label">
                  Content <span className="has-text-weight-normal is-size-7">
                            [ Seperate paragraph with " > " symbol ]
                          </span>
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
                <ToastComponent/>
              </div>
            </form>
            
          </div>
        </div>
      </div>
    </>
  );
}
