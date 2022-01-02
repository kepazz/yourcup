import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listBrandDetails } from "../../actions/brandActions";
import Card from "../../components/Card";
import LoadingComponent from "../../components/LoadingComponent";

export default function BrandScreen(props) {
  const brandName = props.match.params.brand;
  const dispatch = useDispatch();
  const articleDetails = useSelector((state) => state.brandDetails);
  const { loading, error, details } = articleDetails;

  useEffect(() => {
    dispatch(listBrandDetails(brandName));
  }, [dispatch]);
  return (
    <>
      {loading ? (
        <LoadingComponent></LoadingComponent>
      ) : error ? (
        <p>klaida</p>
      ) : (
        <div className="container">
          
            <h1 className="title has-text-centered pt-4">{details.name}</h1>
            <div class="content">
            <h1 className="subtitle  pt-5">Description</h1>
            <p>{details.description} Lorem Ipsum is simply dummy text of the printing and typesetting industry.
             Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
              when an unknown printer took a galley of type and scrambled it to make a type specimen book.
               It has survived not only five centuries, but also the leap into electronic typesetting,
                remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                 and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </div>
            <hr className="mx-4" />
           

            {
              <div className="columns is-multiline">
              {details.products
                
                .map((productUnit) => (
                  <div className="column is-one-quarter ">
                    <Card
                      key={productUnit._id}
                      information={productUnit}
                    ></Card>
                  </div>
                ))}
            </div>
            }
        </div>
      )}
    </>
  );
}
