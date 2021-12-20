import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingComponent from "../../components/LoadingComponent";
import { listProducts } from "../../actions/productsActions";
import Card from "../../components/Card";

export default function CoffeeScreen() {
  const dispatch = useDispatch();
  const coffeeList = useSelector((state) => state.productList);

  

  const [filterToogle, setFilterToogle]= useState(true)


  const { loading, coffee } = coffeeList;
  let allCategories = [];
  if (coffee) {
    allCategories = ["All", ...new Set(coffee.map((item) => item.species))];
  }

  useEffect(() => {
    dispatch(listProducts("coffee"));
  }, [dispatch]);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lowestPrice, setLowestPrice] = useState("");
  const [highestPrice, setHighestPrice] = useState("");

  console.log(` lowest - ${lowestPrice}`);
  const handleClick = (category) => setSelectedCategory(category);

  console.log(selectedCategory);

  return (
    <div>
      {loading ? (
        <LoadingComponent></LoadingComponent>
      ) : (
        <div>
          
          

          <div className="container">
            <div className="content is-medium has-text-centered">
              <h1 className="py-3">Products screen</h1>
              <hr />
            </div>
            <button onClick={()=> setFilterToogle(!filterToogle)} className="button is-rounded btn-prim">Turn filter {filterToogle && true ? 'on' :'off'}</button>
            <section class={`hero bg ${filterToogle ? 'nerodyti': ''}`}>
            <div class="hero-body">
              <div class="container">
                <div className="columns is-vcentered">
                  <div className="column is-5 ">
                    <h1 class="title">Filter: </h1>
                    <div className="buttons">
                      {allCategories.map((item) => (
                        <button
                          onClick={() => handleClick(item)}
                          key={item}
                          className="button is-info"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="column is-2">
                    <div class="field">
                      <label htmlFor="lowprice" class="label">
                        Set lowest price
                      </label>
                      <div class="control">
                        <input
                          id="lowprice"
                          type="email"
                          class="input"
                          style={{ width: "50%" }}
                          onChange={(e) => setLowestPrice(e.target.value)}
                          autocomplete="off"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="column is-2 is-offset-1">
                  <div class="field">
                  <label htmlFor="highprice" class="label">
                    Set highest price
                  </label>
                  <div class="control">
                    <input
                      id="highprice"
                      type="email"
                      class="input"
                      style={{ width: "50%" }}
                      onChange={(e) => setHighestPrice(e.target.value)}
                      autocomplete="off"
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
