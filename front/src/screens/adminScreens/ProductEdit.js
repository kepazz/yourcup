import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listProductDetails,
  productUpdate,
} from "../../actions/productsActions";
import LoadingComponent from "../../components/LoadingComponent";
import FileBase64 from "react-file-base64";
import { listBrands } from "../../actions/brandActions";

export default function ProductEdit(props) {
  const dispatch = useDispatch();
  const coffeeId = props.match.params.id;
  const coffeeDetails = useSelector((state) => state.productDetails);
  const { loading, error, coffeeUnit } = coffeeDetails;

  const brandList = useSelector((state) => state.brandList);
  const { brands } = brandList;

  const [name, setName] = useState(coffeeUnit ? coffeeUnit.name : "");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [packageSize, setPackageSize] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [species, setSpecies] = useState("");
  const [sale, setSale] = useState(false);
  const [saleAmount, setSaleAmount] = useState(0);

  useEffect(() => {
    dispatch(listProductDetails(coffeeId));
  }, [dispatch, coffeeId]);

  useEffect(() => {
    if (coffeeUnit) {
      setName(coffeeUnit.name);
      setBrand(coffeeUnit.brand.name);
      setPrice(coffeeUnit.price);
      setPackageSize(coffeeUnit.packageSize);
      setImage(coffeeUnit.image);
      setDescription(coffeeUnit.description);
      setType(coffeeUnit.type);
      setSpecies(coffeeUnit.species);
      setSale(JSON.parse(!coffeeUnit.sale));
      setSaleAmount(coffeeUnit.saleAmount);
    }
  }, [coffeeUnit]);

  const submitHandler = (e) => {
    e.preventDefault();

    const product = {
      id: coffeeId,
      name: name,
      brand: brand,
      price: price,
      packageSize: packageSize,
      image: image,
      description: description,
      type: type,
      species: species,
      sale: JSON.parse(!sale),
      saleAmount: saleAmount,
    };
    dispatch(productUpdate(product));
    console.log(product);
  };

  console.log(sale);

  return (
    <>
      {loading ? (
        <LoadingComponent></LoadingComponent>
      ) : error ? (
        <h1 className="title has-text-centered">
          {" "}
          Sorry this item doesnt exist
        </h1>
      ) : (
        <div className="container">
           <div className="content is-medium has-text-centered">
              <h1 className="py-5">Product edit</h1>
              <h6>{coffeeUnit._id}</h6>
              <hr />
            </div>

          <div className="columns  ">
            <div className="column is-half is-offset-one-quarter">
              <form onSubmit={submitHandler}>
                <div class="level">
                  <div class="level-left">
                    <div class="level-item">
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
                            defaultValue={coffeeUnit.name}
                            required
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
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
                            defaultValue={coffeeUnit.packageSize}
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
                            defaultValue={coffeeUnit.price}
                            onChange={(e) => setPrice(e.target.value)}
                            step="0.01"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="level">
                  <div class="level-left">
                    <div class="level-item">
                      <div class="field">
                        <label htmlFor="brand" class="label">
                          Brand
                        </label>
                        <div class="control">
                          <input
                            id="brand"
                            type="type"
                            class="input"
                            value={coffeeUnit.brand.name}
                            disabled="true"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="level-item">
                      <div class="field">
                        <label htmlFor="type" class="label">
                          Type
                        </label>
                        <div class="control select">
                          <select
                            id="type"
                            class="select"
                            required
                            onChange={(e) => setType(e.target.value)}
                            defaultValue={coffeeUnit.type}
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
                    </div>
                    <div class="level-item">
                      <div class="field">
                        <label htmlFor="species" class="label">
                          Species
                        </label>
                        <div class="control select">
                          <select
                            id="type"
                            required
                            onChange={(e) => setType(e.target.value)}
                            defaultValue={coffeeUnit.type}
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
                    </div>
                  </div>
                </div>

                <div class="level">
                  <div class="level-left">
                    <div class="level-item">
                      <div class="field">
                        <label class="label">Set sale</label>
                        <div class="control">
                          <button
                            type="button"
                            onClick={() => setSale(!sale)}
                            className="button "
                          >
                            Set sale
                          </button>
                        </div>
                      </div>
                    </div>
                    <div class="level-item">
                      <div class="field">
                        <label htmlFor="saleAmount" class="label">
                          Sale amount ( % )
                        </label>
                        <div class="control">
                          <input
                            id="saleAmount"
                            className="input "
                            type="number"
                            placeholder="amount"
                            defaultValue={coffeeUnit.saleAmount}
                            onChange={(e) => setSaleAmount(e.target.value)}
                            step="5"
                            min="1"
                            max="90"
                            required
                            disabled={sale}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="level">
                  <div class="level-left">
                    <div class="level-item">
                      <div class="field">
                        <label htmlFor="brand" class="label">
                          Image{" "}
                          <span className="has-text-weight-normal is-size-7">
                            [On the left current image, on the right possible
                            new image]
                          </span>
                        </label>
                        <div class="control">
                          <label>
                            <FileBase64
                              type="file"
                              multiple={false}
                              onDone={({ base64 }) => setImage(base64)}
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <label htmlFor="species" class="label">
                  Preview
                </label>

                <div className="columns has-text-centered">
                  <div className="column is-4  is-offset-4 is-6-mobile is-offset-3-mobile">
                    <img src={image} alt={image} />
                  </div>
                </div>

                <div class="field ml-2">
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
                      defaultValue={coffeeUnit.description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>

                <div class="field has-text-centered">
                  <button class="button btn-prim is-rounded">Update</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
