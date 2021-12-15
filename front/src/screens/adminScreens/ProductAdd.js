import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FileBase64 from "react-file-base64";
import { productAdd } from "../../actions/productsActions";
import { listBrands } from "../../actions/brandActions";
import LoadingComponent from "../../components/LoadingComponent";

export default function ProductAdd() {
  const brandList = useSelector((state) => state.brandList);
  const { loading, error, brands } = brandList;
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [packageSize, setPackageSize] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [species, setSpecies] = useState("");

  const dispatch = useDispatch();

  console.log(image);

  const submitHandler = (e) => {
    e.preventDefault();
    if (image !== "") {
      const product = {
        name: name,
        brand: brand,
        price: price,
        packageSize: packageSize,
        image: image,
        description: description,
        type: type,
        species: species,
      };
      console.log(product);
      dispatch(productAdd(product));
    }
  };

  useEffect(() => {
    dispatch(listBrands());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <LoadingComponent></LoadingComponent>
      ) : error ? (
        <p>klaida</p>
      ) : (
        <div className="container">
          <h1 className="title has-text-centered mt-3">Product add page</h1>
          <hr />
          <div className="columns  is-centered">
            <div className="column is-5 ml-4">
              <form onSubmit={submitHandler} autoComplete="off">
                <div class="field">
                  <label htmlFor="name" class="label">
                    Name
                  </label>
                  <div class="control">
                    <input
                      id="name"
                      type="type"
                      class="input"
                      placeholder="Name "
                      required
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>

                <div class="field">
                  <label htmlFor="brand" class="label">
                    Brand
                  </label>
                  <div class="select">
                    <select
                      id="brand"
                      required
                      onChange={(e) => setBrand(e.target.value)}
                    >
                      <option value="" hidden>
                      Select one
                    </option>
                      {brands.map((item) => {
                        return (
                          <option key={item._id} value={item.name}>
                            {item.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>

                <div class="field">
                  <label htmlFor="type" class="label">
                    Type
                  </label>
                  <div class="select">
                    <select
                      id="type"
                      required
                      onChange={(e) => setType(e.target.value)}
                    >
                      <option value="" hidden>
                        Select product type
                      </option>
                      <option value="coffee">Coffee</option>
                      <option value="tea">Tea</option>
                      <option value="cup">Cup</option>
                    </select>
                  </div>
                </div>

                <div class="field">
                  <label htmlFor="species" class="label">
                    Species
                  </label>
                  <div class="control">
                    <input
                      id="species"
                      type="text"
                      class="input"
                      placeholder="Specie"
                      required
                      onChange={(e) => setSpecies(e.target.value)}
                    />
                  </div>
                </div>

                <div class="field">
                  <label htmlFor="package" class="label">
                    Package size ( g. )
                  </label>
                  <input
                    id="package"
                    className="input "
                    type="number"
                    style={{ width: "15%" }}
                    placeholder="amount"
                    defaultValue="1"
                    onChange={(e) => setPackageSize(e.target.value)}
                  />
                </div>
                <div class="field">
                  <label htmlFor="package" class="label">
                    Price ( € )
                  </label>
                  <input
                    id="package"
                    className="input "
                    type="number"
                    style={{ width: "15%" }}
                    placeholder="amount"
                    defaultValue="1"
                    onChange={(e) => setPrice(e.target.value)}
                    step="0.01"
                  />
                </div>

                <div class="field">
                  <label htmlFor="brand" class="label">
                    Image
                  </label>
                  <div class="file has-name">
                    <label class="file-label">
                      <FileBase64
                        type="file"
                        multiple={false}
                        onDone={({ base64 }) => setImage(base64)}
                      />
                    </label>
                  </div>
                </div>

                <div class="field">
                  <label htmlFor="description" class="label">
                    Description
                  </label>
                  <div class="control">
                    <textarea
                      id="description"
                      type="text"
                      class="textarea"
                      placeholder="Enter description"
                      required
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>

                <div class="field has-text-centered">
                  <button class="button is-success is-rounded">Submit</button>
                </div>
              </form>
              {image && (
                <div>
                  <img
                    style={{ width: "100%", height: 300 }}
                    alt={image}
                    src={image}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
