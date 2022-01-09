import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { brandAdd, brandDelete, listBrands } from "../../actions/brandActions";
import { productDelete } from "../../actions/productsActions";
import LoadingComponent from "../../components/LoadingComponent";

import ToastComponent from "../../components/ToastComponent";

export default function BrandModify() {
  const dispatch = useDispatch();
  const brandList = useSelector((state) => state.brandList);
  const { loading, error, brands } = brandList;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

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

  const deleteHandler = (productId, brandId) => {
    console.log(productId);
    dispatch(productDelete(productId, brandId));
    dispatch(listBrands());
  };

  const deleteBrandHandler = (brandId) => {
    dispatch(brandDelete(brandId));
    dispatch(listBrands());
  };

  return (
    <>
      {loading ? (
        <LoadingComponent></LoadingComponent>
      ) : error ? (
        <div className="content is-medium has-text-centered">
          <h1 className="py-5">Error</h1>
        </div>
      ) : (
        <div className="container">
          <div className="content is-medium has-text-centered">
            <h1 className="py-5">Brands screen</h1>
          </div>

          <div className="content is-medium has-text-centered">
            <h3 className="py-3">Brands and their products</h3>
            <hr className="mx-4" />
          </div>

          {brands.map((item, i, { length }) => (
            <div className="table-container mb-1">
              <div className="content is-medium has-text-centered">
                <h3 className="">{item.name}</h3> 
              </div>
              {item.products.length !== 0 ? (
                <table className="table is-fullwidth is-bordered">
                  <thead>
                    <tr>
                      <th> Name</th>
                      <th> Id</th>
                      <th>Type</th>
                      <th>Price</th>
                      <th> Sale status</th>
                      <th> Edit option</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {item.products.map((product) => (
                      <tr key={product._id}>
                        <td>{product.name}</td>
                        <td>
                          <Link to={`/product/${product._id}`}>
                            {product._id}
                          </Link>
                        </td>
                        <td>{product.type}</td>
                        <td>{product.price}</td>
                        <td>
                          {product.sale === false ? (
                            <p>No</p>
                          ) : (
                            <p>Yes ( {product.saleAmount}% )</p>
                          )}
                        </td>
                        <td>
                          <Link to={`/product_edit/${product._id}`}>Edit</Link>
                        </td>
                        <td>
                          <span
                            className="has-text-link is-clickable "
                            onClick={() => {
                              setModalData(product);
                              setModalIsOpen(true);
                            }}
                          >
                            Delete
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="content is-medium has-text-centered">
                  <h5 className="">This brand has no products </h5>
                  <button className="button btn-prim is-rounded" onClick={()=>deleteBrandHandler(item._id)}>Delete</button>
                </div>
              )}

              {i + 1 !== length && <hr className="mx-4" />}
            </div>
          ))}

          {modalData && (
            <div className={`modal  ${modalIsOpen ? "is-active" : ""}`}>
              <div class="modal-background "></div>
              <div class="modal-content box has-text-centered">
                <div>
                  <p className="title">
                    Are you sure you want to delete product named -{" "}
                    <strong>{modalData.name}</strong> ?
                  </p>

                  <div className="is-centered buttons">
                    <button
                      className="button is-rounded is-danger"
                      onClick={() => {
                        setModalIsOpen(false);
                        deleteHandler(modalData._id, modalData.brand);
                      }}
                    >
                      Yes
                    </button>
                    <button
                      className="button is-rounded is-success "
                      onClick={() => setModalIsOpen(false)}
                    >
                      no
                    </button>
                  </div>
                </div>
              </div>
              <button
                class="modal-close is-large"
                aria-label="close"
                onClick={() => {
                  setModalIsOpen(!modalIsOpen);
                  setModalData(null);
                }}
              ></button>
            </div>
          )}

          <div className="content is-medium has-text-centered">
            <h3 className="py-3">Include new brand</h3>
            <hr className="mx-4" />
          </div>
          <div className="columns   is-centered">
            <div className="column is-5 mx-4">
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
