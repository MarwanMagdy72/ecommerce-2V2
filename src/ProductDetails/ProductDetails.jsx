import axios from "axios";
import React, { useContext } from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import PageLoading from "../Components/Loading/PageLoading";
import { CartContext } from "../Context/CartContext";
import { UserToken } from "../Context/UserToken";
import toast from "react-hot-toast";

export default function ProductDetails() {
  let { addToCart , setNumOfCartItems } = useContext(CartContext);
  let { isLogin } = useContext(UserToken);

  async function addToCartFunc(id) {
    let res = await addToCart(id);

    if (isLogin) {
      toast.success(res.data.message);
    } else {
      toast.error(res.response.data.message);
    }
    setNumOfCartItems(res?.data.numOfCartItems);

  }
  let { id } = useParams();

  function ProductDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  const { data, isLoading } = useQuery("productDetails", ProductDetails);
  if (isLoading) {
    return <PageLoading />;
  } else {
    return (
      <>
        <div className="container py-5">
          <div className="row">
            <div className="col-md-3">
              <img
                src={data?.data.data.imageCover}
                className="w-100 rounded-4"
                alt='product cover'
              />
            </div>
            <div className="col-md-8 d-flex align-items-center justify-content-center">
              <div className="details">
                <p className="fw-bold ">{data?.data.data.title}</p>
                <p className="font-sm text-main">
                  {data?.data.data.description}
                </p>
                <p>{data?.data.data.category.name}</p>
                <div className="price/rate d-flex justify-content-between">
                  <p>
                    Price: {data?.data.data.price}{" "}
                    <span className="fw-bold font-sm">EGP</span>
                  </p>
                  <p>
                    {data?.data.data.ratingsAverage}{" "}
                    <span>
                      <i className="fa-solid fa-star rating-color"></i>
                    </span>
                  </p>
                </div>
                <button className=" btn w-100 fw-bold my-3 bg-main text-white" onClick={()=>{addToCartFunc(data?.data.data._id)}}>
                  {" "}
                  Add To Cart +{" "}
                </button>
                <Link to={'/'} className=" btn w-100 fw-bold btn-outline-success " >
                  Add More Items 
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
