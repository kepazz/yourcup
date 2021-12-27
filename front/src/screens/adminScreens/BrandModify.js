import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { brandAdd, listBrands } from "../../actions/brandActions";
import { productDelete } from "../../actions/productsActions";
import LoadingComponent from "../../components/LoadingComponent";
import Modal from "react-modal";

export default function BrandModify() {
  const dispatch = useDispatch();
  const brandList = useSelector((state) => state.brandList);
  const { loading, error, brands } = brandList;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

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

  return (
    <>
      {loading ? (
        <LoadingComponent></LoadingComponent>
      ) : error ? (
        <p>KLAIDA</p>
      ) : (
        <div className="container">
          <div className="content is-medium has-text-centered">
            <h1 className="py-5">Brands screen</h1>
           
          </div>
          

          <div className="content is-medium has-text-centered">
            <h3 className="py-3">Brands and their products</h3>
            <hr />
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
                          <Link to={`/coffee/${product._id}`}>
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
                <h5 className="">This brand has no products</h5>
              </div>
              )}

              {i + 1 !== length && <hr />}
            </div>
          ))}

          <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            style={customStyles}
            ariaHideApp={false}
          >
            {modalData && (
              <div>
                Are you sure you want to delete product named -{" "}
                <strong>{modalData.name}</strong> ?
                <div className="has-text-centered">
                  <button
                    className="button is-danger mr-2"
                    onClick={() => {
                      setModalIsOpen(false);
                      deleteHandler(modalData._id, modalData.brand);
                    }}
                  >
                    Yes
                  </button>
                  <button
                    className="button is-success ml-2"
                    onClick={() => setModalIsOpen(false)}
                  >
                    no
                  </button>
                </div>
              </div>
            )}
          </Modal>
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
        </div>
      )}
    </>
  );
}
