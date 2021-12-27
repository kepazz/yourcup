import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingComponent from "../../components/LoadingComponent";
import { listProducts } from "../../actions/productsActions";
import Card from "../../components/Card";

export default function BeveragesScreen() {
  const dispatch = useDispatch();
  const coffeeList = useSelector((state) => state.productList);

  const [filterToogle, setFilterToogle] = useState(true);

  const { loading, coffee } = coffeeList;
  let allTypes = [];
  let allTeaCategories = [];
  let allCoffeeCategories = [];
  if (coffee) {
    allTypes = ["All", ...new Set(coffee.map((item) => item.type))];
    allTeaCategories = [
      "All",
      ...new Set(
        coffee.map((item) => {
          if (item.type === "tea") {
            return item.species;
          }
          return undefined;
        })
      ),
    ].filter(Boolean);
    allCoffeeCategories = [
      "All",
      ...new Set(
        coffee.map((item) => {
          if (item.type === "coffee") {
            return item.species;
          }
          return undefined;
        })
      ),
    ].filter(Boolean);
  }

  useEffect(() => {
    dispatch(listProducts("drinks"));
  }, [dispatch]);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedType, setType] = useState("All");

  const [lowestPrice, setLowestPrice] = useState("");
  const [highestPrice, setHighestPrice] = useState("");

  console.log(` lowest - ${lowestPrice}`);
  const handleTypeClick = (type) => {
    setType(type);
    setSelectedCategory("All");
  };
  const handleCategoryClick = (category) => setSelectedCategory(category);

  console.log(selectedCategory);

  return (
    <div>
      {loading ? (
        <LoadingComponent></LoadingComponent>
      ) : (
        <div>
          <div className="container">
            <div className="content is-medium has-text-centered">
              <h1 className="py-5">Products screen</h1>
              <hr className="mx-4"/>
            </div>
            <button
              onClick={() => setFilterToogle(!filterToogle)}
              className="button is-rounded btn-prim ml-5"
            >
              Turn filter {filterToogle && true ? "on" : "off"}
            </button>
            <section class={`hero bg ${filterToogle ? "nerodyti" : ""}`}>
              <div class="hero-body">
                <div class="container">
                  <div className="columns ">
                    <div className="column is-4">
                      <h1 class="title ">Filter by type: </h1>
                      <div className="buttons">
                        {allTypes.map((item) => (
                          <button
                            onClick={() => handleTypeClick(item)}
                            key={item}
                            className="button btn-prim is-rounded"
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                      </div>
                      <div className="column is-4">
                      <h1 class="title">Filter by spicies: </h1>
                      {selectedType === "coffee" ? (
                        <>
                          
                          <div className="buttons">
                            {allCoffeeCategories.map((item) => (
                              <button
                                onClick={() => handleCategoryClick(item)}
                                key={item}
                                className="button btn-prim is-rounded"
                              >
                                {item}
                              </button>
                            ))}
                          </div>
                        </>
                      ) : selectedType === "tea" ? (
                        <>
                          
                          <div className="buttons">
                            {allTeaCategories.map((item) => (
                              <button
                                onClick={() => handleCategoryClick(item)}
                                key={item}
                                className="button btn-prim is-rounded"
                              >
                                {item}
                              </button>
                            ))}
                          </div>
                        </>
                      ) : (
                        <></>
                      )}</div>
                    
                    <div className="column is-2 has-text-centered">
                      <div class="field">
                        <label htmlFor="lowprice" class="label">
                          Lowest price
                        </label>
                        <div class="control">
                          <input
                            id="lowprice"
                            type="number"
                            class="input"
                            style={{ width: "50%" }}
                            onChange={(e) => setLowestPrice(e.target.value)}
                            autoComplete="off"
                            step="1"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="column is-2 has-text-centered">
                      <div class="field">
                        <label htmlFor="highprice" class="label">
                         Highest price
                        </label>
                        <div class="control">
                          <input
                            id="highprice"
                            type="number"
                            class="input"
                            style={{ width: "50%" }}
                            onChange={(e) => setHighestPrice(e.target.value)}
                            autoComplete="off"
                            step="1"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <hr />
            <div className="columns is-multiline">
              {coffee

                .filter(
                  (product) =>
                    selectedType === "All" || product.type === selectedType
                )
                .filter(
                  (product) =>
                    selectedCategory === "All" ||
                    product.species === selectedCategory
                )
                .filter(
                  (product) =>
                    highestPrice === "" || product.price <= highestPrice
                )
                .filter(
                  (product) =>
                    lowestPrice === "" || product.price >= lowestPrice
                )
                .map((productUnit) => (
                  <div className="column is-one-quarter is-four-fifths-mobile is-offset-1-mobile">
                    <Card
                      key={productUnit._id}
                      information={productUnit}
                    ></Card>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
