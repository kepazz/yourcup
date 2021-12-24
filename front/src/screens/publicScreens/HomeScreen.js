import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

//import logo from '../../public/images/homePageImage.png'
import { listThreeRandomProducts } from "../../actions/productsActions";
import LoadingComponent from "../../components/LoadingComponent";

export default function HomeScreen() {
  const dispatch = useDispatch();

  const coffeeList = useSelector((state) => state.productList);

  const { loading, coffee } = coffeeList;

  useEffect(() => {
    dispatch(listThreeRandomProducts());
  }, [dispatch]);
  return (
    <>
      {loading ? (
        <LoadingComponent></LoadingComponent>
      ) : (
        <div>
          <section class="hero ">
            <div class="hero-body">
              <div class="container">
                <div class="columns is-vcentered">
                  <div class="column is-5 is-offset-1 ">
                    <h1 class="title is-1">Find & Enjoy.</h1>
                    <h2 class="subtitle is-5 ">
                      Find yourself a hot drink that suits your taste desires
                    </h2>
                    <div class="buttons">
                      <Link to='/coffee' class="button  is-rounded btn-prim">Discover</Link>
                      <Link to='/articles' class="button is-rounded btn-prim">Check articles</Link>
                    </div>
                  </div>
                  <div class="column is-4">
                    <figure class="image is-4by3">
                      <img src={'/images/homePageImage.png'} alt="coffee" />
                    </figure>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section class="section ">
            <div class="container">
              <div class=" has-text-centered">
                <h2 class="title is-2">Few of our unique products </h2>
                <h3 class="subtitle is-5 ">
                  Impossible that you won't like it
                </h3>
                <div class="is-centered"></div>
              </div>


              <div class="columns">
                {coffee.map((item) => (
                  <div class="column is-one-third">
                  <div class="card card-home has-text-centered ">
                    <div class="card-title">
                    
                      <h3 className="title is-4 pt-5 pb-3">{item.name}</h3>
                    </div>
                    <div class="card-icon">
                      <img src={item.image} alt="coffee" className="img-home" />
                    </div>
                    <div class="card-text pb-3">
                      <p>
                        Special from <Link to={`/brand/${item.brand}`}>{item.brand}</Link>
                      </p>
                    </div>
                    <div class="card-action">
                      <Link to={`/coffee/${item._id}`}>
                        <button class="button is-rounded btn-prim mb-4">
                          Check this out
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
                ))}
                
              </div>





              
            </div>
          </section>
        </div>
      )}
    </>
  );
}
