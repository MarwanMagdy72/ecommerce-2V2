import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import { UserToken } from "../../Context/UserToken";
import { Link } from "react-router-dom";
import PageLoading from "./../Loading/PageLoading";

export default function Cart() {
  let { getCart, deleteItem, clearCart, updateCart } = useContext(CartContext);
  let { isLogin } = useContext(UserToken);
  let [data, setData] = useState(null);
  let { numOfCartItems, setNumOfCartItems } = useContext(CartContext);

  // Display Cart Items
  async function getCartFunc() {
    let res = await getCart();
    if (res?.data?.status === "success") {
      setData(res?.data);
      setNumOfCartItems(res?.data.numOfCartItems);
    }
  }

  // Remove Item from Cart
  async function deleteItemFunc(id) {
    let res = await deleteItem(id);
    if (res?.data?.status === "success") {
      getCartFunc();
    }
  }
  // Clear Cart
  async function clearCartFunc() {
    await clearCart();
  }

  //Update on Cart
  async function updateCartFunc(id, count) {
    let res = await updateCart(id, count);

    if (res.data.status === "success") {
      getCartFunc();
    }
  }

  // Get cart only for loggedIn users
  useEffect(() => {
    if (isLogin == null) return;
    getCartFunc();
  }, [isLogin]);

  if (data === null) {
    
      return <PageLoading />;

   
  } else if (numOfCartItems === 0) {
    return (    <>
      <div className="empty-cart my-4 d-flex flex-column align-items-center justify-content-center ">
        <h1 className="text-center fw-bold text-danger ">
          Your Cart Is Empty !
        </h1>
        <Link
          to={"/products"}
          className=" btn btn-danger  fw-bold  w-25 "
        >
          {" "}
          Go Fill It{" "}
        </Link>
      </div>
    </>);

 
  } else {
    return (
      <>
        <div className="container">
          <h1 className="fw-bold my-5">Your Cart Items: </h1>
          {data?.data.products.map((prod) => (
            <div key={prod.product._id} className="container">
              <div className="row align-items-center text-start ">
                <div className="col-md-9">
                  <div className="row align-items-center">
                    <div className="col-md-2">
                      <img
                        src={prod.product.imageCover}
                        className="w-100 rounded-4 my-3"
                        alt="image product"
                      />
                    </div>
                    <div className="col-md-10 ">
                      <p className="fw-bolder h5">{prod.product.title}</p>
                      <p className=" fw-bold">Price: {prod.price} EGP </p>
                      <span
                        className="text-danger cursor-pointer "
                        onClick={() => deleteItemFunc(prod.product._id)}
                      >
                        <i className="fa-solid fa-trash-can"></i> Remove
                      </span>
                    </div>
                  </div>
                </div>

                <div className="col-md-3 mt-3">
                  {prod.count <= 0 ? (
                    <button
                      className={` btn btn-outline-danger fw-bolder`}
                      onClick={() =>
                        updateCartFunc(prod.product._id, prod.count - 1)
                      }
                      disabled
                    >
                      -
                    </button>
                  ) : (
                    <button
                      className={` btn btn-outline-danger fw-bolder`}
                      onClick={() =>
                        updateCartFunc(prod.product._id, prod.count - 1)
                      }
                    >
                      -
                    </button>
                  )}

                  <span className="mx-2 fw-bold">{prod.count}</span>

                  <button
                    className="btn btn-outline-success fw-bolder"
                    onClick={() =>
                      updateCartFunc(prod.product._id, prod.count + 1)
                    }
                  >
                    +
                  </button>
                </div>
                <hr className="m-4" />
              </div>
            </div>
          ))}

          <button
            className="btn btn-outline-danger d-block mx-auto my-3 fw-bold"
            onClick={clearCartFunc}
          >
            {" "}
            Clear Cart <i className="fa-solid fa-trash-can mx-2"></i>
          </button>

          <Link
            to={"/"}
            className="btn my-3 btn-outline-dark w-75 m-auto fw-bold d-block"
          >
            {" "}
            Continue Shopping
          </Link>
          <Link
            to={"/address"}
            className="btn my-3 btn-outline-dark w-75 m-auto fw-bold d-block"
          >
            {" "}
            Check out now{" "}
          </Link>
        </div>
      </>
    );
  }
}
