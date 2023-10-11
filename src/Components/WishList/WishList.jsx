import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import { UserToken } from "../../Context/UserToken";
import toast from "react-hot-toast";
import PageLoading from "../Loading/PageLoading";

export default function WishList() {
  let { getWishList, deleteItemFromWishList  ,addToCart ,setNumOfCartItems} = useContext(CartContext);
  let { isLogin } = useContext(UserToken);
  let [data, setData] = useState(null);

  async function addToCartFunc(id) {
    let res = await addToCart(id);

    if (isLogin) {
      toast.success(res.data.message);
    } else {
      toast.error(res.response.data.message);
    }
    setNumOfCartItems(res?.data.numOfCartItems);

  }

  async function getWishListFun() {
    let res = await getWishList();

    if (res?.data?.status === "success" ) {
      setData(res?.data);
    }

    if (res?.data.count === 0) {
        console.log('WishList is empty');
    }
  }
  async function deleteItemFromWishListFunc(id) {
    let res = await deleteItemFromWishList(id);
    if (res?.data?.status === "success") {
      getWishListFun();
    }
  }

  useEffect(() => {
    if (isLogin == null) return;
    getWishListFun();
  }, [isLogin]);


  if (data === null) {
    return (

      <PageLoading/>
    );
  } else{
    return (
      <>
        <h1 className="fw-bold">My Wish List</h1>
  
        {data?.data.map((prod) => (
          <div key={prod._id} className="row align-items-center text-start">
            <div className="col-md-9">
              <div className="row align-items-center">
                <div className="col-md-2 ">
                  <img
                    src={prod.imageCover}
                    alt="product cover"
                    className="w-100 rounded-4 my-3"
                  />
                </div>
                <div className="col-md-10  ">
                  <p className="fw-bolder h5">{prod.title}</p>
                  <p className=" fw-bold">Price: {prod.price} EGP </p>
                  <span
                    className="text-danger cursor-pointer  my-2"
                    onClick={() => deleteItemFromWishListFunc(prod._id)}
                  >
                    <i className="fa-solid fa-trash-can"></i> Remove
                  </span>
                </div>
              </div>
            </div>
            <div className="col-md-3 mt-3">
              <button className="btn btn-outline-success" onClick={()=> addToCartFunc(prod._id)}> add to cart</button>
            </div>
  
            <hr className="my-5 w-75 mx-auto" />
          </div>
        ))}
      </>
    );
  }

}
