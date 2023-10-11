import React from "react";
import { Helmet } from "react-helmet";
import useApi from "../../Hooks/useApi";
import PageLoading from "./../Loading/PageLoading";
import Swal from "sweetalert2";
import Popup from "reactjs-popup";

export default function Brands() {
  let { data, isLoading } = useApi("brands", "brands");

  if (isLoading) {
    return <PageLoading />;
  } else {
    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Brands</title>
        </Helmet>

        <div className="brands my-5">
          <h1 className="text-center fw-bolder fa-3x">All Brands</h1>
          <div className="row">
            {data?.data.data.map((brand) => (
              <div
                key={brand._id}
                className="col-md-3 cursor-pointer  brand my-3 rounded-4"
              >
                <Popup
                  trigger={
                    <button className="d-block border-0 bg-white">
                      {" "}
                      <img
                        src={brand.image}
                        className="w-100"
                        alt="brand-image"
                      />
                    </button>
                  }
                  modal
                  nested
                >
                  <div className="profile">
                    <div className="profile-image p-2 d-flex flex-column justify-content-center align-items-center">

                    <img
                        src={brand.image}
                        className="w-50"
                        alt="brand-image"
                      />
                      <p className="text-center fw-bold fa-2x">{brand.name}</p>


                    </div>


                  </div>

                  {() => <div className="modal"></div>}
                </Popup>
                <p className="text-center fw-bold">{brand.name}</p>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
}
