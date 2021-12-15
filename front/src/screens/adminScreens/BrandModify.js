import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { brandAdd, listBrands } from "../../actions/brandActions";
import LoadingComponent from "../../components/LoadingComponent";

export default function BrandModify() {
  const dispatch = useDispatch();
  const brandList = useSelector((state) => state.brandList);
  const { loading, error, brands } = brandList;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    dispatch(listBrands());
  }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();

    const brand = {
      name: name,
      description: description,
    };
    dispatch(brandAdd(brand));
  };

  return (
    <>
      {loading ? (
        <LoadingComponent></LoadingComponent>
      ) : error ? (
        <p>KLAIDA</p>
      ) : (
        <div className="container">
          <hr />
          <div className="columns   is-centered">
            <div className="column is-5 ml-4">
              <form onSubmit={submitHandler} autoComplete="off">
                <div class="field">
                  <label htmlFor="name" class="label">
                    Brand name
                  </label>
                  <div class="control">
                    <input
                      id="title"
                      type="type"
                      class="input"
                      placeholder="Enter brand name "
                      required
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>

                <div class="field">
                  <label htmlFor="desc" class="label">
                    Brand description
                  </label>
                  <div class="control">
                    <textarea
                      id="desc"
                      type="type"
                      class="textarea"
                      placeholder="Enter brand description "
                      required
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>
                <div class="field has-text-centered">
                  <button class="button is-success is-rounded">Submit</button>
                </div>
              </form>
            </div>
          </div>

          <div className="content">
            Brand list:
            <ol type="1">
              {brands.map((item) => (
                <li key={item._id}>{item.name}</li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </>
  );
}
