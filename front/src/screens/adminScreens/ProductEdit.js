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
  const {  brands } = brandList;

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
    dispatch(listBrands());
  }, [dispatch]);

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
      setSale(JSON.parse(!coffeeUnit.sale))
      setSaleAmount(coffeeUnit.saleAmount)
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
      saleAmount: saleAmount
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
          <h1 className="title has-text-centered">Product edit screen</h1>
          <hr />

          <div className="columns   is-centered">
            <div className="column is-5 ml-4">
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
                      value={coffeeUnit._id}
                      disabled="true"
                    />
                  </div>
                </div>

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


                <div class="field">
                  <label htmlFor="brand" class="label">
                    Brand
                  </label>
                  <div class="select">
                    <select
                      id="brand"
                      required
                      onChange={(e) => setBrand(e.target.value)}
                      defaultValue={coffeeUnit.brand.name}
                    >
                      
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
                      defaultValue={coffeeUnit.species}
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
                    style={{ width: "20%" }}
                    placeholder="amount"
                    defaultValue={coffeeUnit.packageSize}
                    onChange={(e) => setPackageSize(e.target.value)}
                    required
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
                    style={{ width: "20%" }}
                    placeholder="amount"
                    defaultValue={coffeeUnit.price}
                    onChange={(e) => setPrice(e.target.value)}
                    step="0.01"
                    required
                  />
                </div>

                
                <div className="field">
                  <label class="label">Set sale</label>
                </div>
                <button
                  type="button"
                  onClick={() => setSale(!sale)}
                  className="button "
                >
                  Set sale
                </button>

                <div class="field">
                  <label htmlFor="saleAmount" class="label">
                    Sale amount ( % )
                  </label>
                  <input
                    id="saleAmount"
                    className="input "
                    type="number"
                    style={{ width: "20%" }}
                    placeholder="amount"
                    defaultValue={coffeeUnit.saleAmount}
                    onChange={(e) => setSaleAmount(e.target.value)}
                    step="5"
                    min="0"
                    max="100"
                    required
                    disabled={sale}
                  />
                </div>

                <div class="field">
                  <label htmlFor="brand" class="label">
                    Image{" "}
                    <span className="has-text-weight-normal is-size-7">
                      [On the left current image, on the right possible new
                      image]
                    </span>
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
                <br />

                <div className="columns">
                  <div className="column has-text-centered">
                    <img
                      src={coffeeUnit.image}
                      alt={coffeeUnit.name}
                      className="img-cart"
                    />
                  </div>
                  <div className="column has-text-centered">
                    <img
                      src={image}
                      alt="Possible new pic"
                      className="img-cart"
                    />
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
                      defaultValue={coffeeUnit.description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>

                <div class="field has-text-centered">
                  <button class="button is-success is-rounded">Submit</button>
                </div>
              </form>
              <p>{name}</p>
              <p>{brand}</p>
              <p>{price}</p>
              <p>{packageSize}</p>
              <p>{image}</p>
              <p>{description}</p>
              <p>{type}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
