import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FileBase64 from "react-file-base64";
import { productAdd } from "../../actions/productsActions";
import { listBrands } from "../../actions/brandActions";
import LoadingComponent from "../../components/LoadingComponent";
import ToastComponent from "../../components/ToastComponent";
import { toast } from 'react-toastify';

export default function ProductAdd() {
  const brandList = useSelector((state) => state.brandList);
  const { loading, error, brands } = brandList;
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [packageSize, setPackageSize] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  //const [type, setType] = useState("");
  //const [species, setSpecies] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listBrands());
    setImage('')
  }, [dispatch]);

  const selectableVariables = {
    coffee: [
      { value: "arabica", displayName: "Arabica" },
      { value: "robusta", displayName: "Robusta" },
      { value: "liberica", displayName: "Liberica" },
      { value: "excelsa", displayName: "Excelsa" },
    ],
    tea: [
      { value: "white", displayName: "White" },
      { value: "green", displayName: "Green" },
      { value: "black", displayName: "Black" },
    ],
    cups: [
      { value: "mug", displayName: "Mug" },
      { value: "teacup", displayName: "Teacup" },
    ],
    machines: [
      { value: "percolator", displayName: "Percolator" },
      { value: "kettle", displayName: "Kettle" },
    ],
  };

  const [type, setType] = useState("Coffee");
  const [specie, setSpecie] = useState("arabica");
  const [species, setSpecies] = useState(selectableVariables["coffee"]);

  const handleChangeType = (e) => {
    setType(e.target.value);
    setSpecies(selectableVariables[e.target.value]);
    setSpecie(selectableVariables[e.target.value][0].value);
  };

  const handleChangeSpecie = (e) => {
    setSpecie(e.target.value);
  };

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
        species: specie,
        
      };
      console.log(product);
      dispatch(productAdd(product));
      toast("Product added");
    } else {
      toast("Product add failed")
    }
    
  };

  return (
    <>
      {loading ? (
        <LoadingComponent></LoadingComponent>
      ) : error ? (
        <p>klaida</p>
      ) : (
        <div className="container">
          <div className="content is-medium has-text-centered">
              <h1 className="py-5">Product add</h1>
              <hr />
            </div>
          
          <div className="columns  ">
            <div className="column is-half is-offset-one-quarter">
              <form onSubmit={submitHandler} autoComplete="off">
                <div class="field">
                  <label htmlFor="name" class="label">
                    Name
                  </label>

                  <input
                    id="name"
                    type="type"
                    class="input"
                    placeholder="Name "
                    required
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div class="field is-horizontal is-vcentered">
                  <div class="field-body">
                    <div class="field">
                      <label htmlFor="brand" class="label">
                        Brand
                      </label>
                      <p class="control is-expanded">
                        <span class="select is-fullwidth">
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
                        </span>
                      </p>
                    </div>
                    <div class="field">
                      <label htmlFor="type" class="label">
                        Type
                      </label>
                      <p class="control is-expanded">
                        <span class="select is-fullwidth">
                          <select
                            id="type"
                            required
                            onChange={handleChangeType}
                            value={type}
                          >
                            <option value="coffee">Coffee</option>
                            <option value="tea">Tea</option>
                            <option value="cups">Cups</option>
                            <option value="machines">Machines</option>
                          </select>
                        </span>
                      </p>
                    </div>
                    <div class="field">
                      <label htmlFor="species" class="label">
                        Option
                      </label>
                      <p class="control is-expanded">
                        <span class="select is-fullwidth">
                          <select
                            id="species"
                            required
                            onChange={handleChangeSpecie}
                          >
                            {species.map((specie) => (
                              <option value={specie.value}>
                                {specie.displayName}
                              </option>
                            ))}
                          </select>
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                <div class="level">
                  <div className="level-left">
                    <div class="level-item">
                      <div class="field">
                        <label htmlFor="package" class="label">
                          Package size ( g. )
                        </label>
                        <div class="control">
                          <input
                            id="package"
                            className="input "
                            type="number"
                            placeholder="amount"
                            defaultValue="1"
                            style={{ width: "90%" }}
                            onChange={(e) => setPackageSize(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div class="level-item">
                      <div class="field">
                        <label htmlFor="package" class="label">
                          Price ( € )
                        </label>
                        <div class="control">
                          <input
                            id="package"
                            className="input "
                            type="number"
                            placeholder="amount"
                            defaultValue="1"
                            style={{ width: "90%" }}
                            onChange={(e) => setPrice(e.target.value)}
                            step="0.01"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
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
                  <ToastComponent/>
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
