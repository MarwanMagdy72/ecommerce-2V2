import React from "react";
import { Helmet } from "react-helmet";
import useApi from "../../Hooks/useApi";
import PageLoading from "../Loading/PageLoading";

export default function Categories() {
  let { data, isLoading } = useApi("categories", "categories");
  console.log(data?.data);

  if (isLoading) {
    return <PageLoading />;
  } else {
    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Categories</title>
        </Helmet>

        <div className="categories my-5">
          <div className="row">
            {data?.data.data.map((categ) => (
              <div
              // style={{width: "250px" }}
                key={categ._id}
                className="col-md-4 cursor-pointer  rounded-4"
                
              >
                <img src={categ.image}   className="mx-auto w-100" alt="categ-image" />
                <h4 className="text-center my-2 fw-bold">{categ.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
}
