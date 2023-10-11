import React, { useContext, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import { toast } from "react-hot-toast";
import useApi from "../../Hooks/useApi";
import { UserToken } from "../../Context/UserToken";
import PageLoading from "../Loading/PageLoading";
import { Link } from "react-router-dom";

export default function Products() {
  let { addToCart ,addToWishList ,setNumOfCartItems } = useContext(CartContext);
  let { isLogin } = useContext(UserToken);
  let [search, setSearch] = useState("");
  let [isLike , setIsLike ] = useState([]);


  async function addToCartFunc(id) {
    let res = await addToCart(id);


    if (isLogin) {
      toast.success(res.data.message);
    } else {
      
      toast.error(res.response.data.message);
    }
    setNumOfCartItems(res?.data.numOfCartItems);
  }
  async function addToWishListFunc(id) {
    let res = await addToWishList(id);
    
    
    if (res.data.status === 'success') {
      toast.success(res?.data?.message);

      setIsLike(true);
      
    } else {
      toast.error(res?.response?.data?.message);
      setIsLike(false , id);
      
    }

  }
  let { data, isLoading } = useApi("products", "products");



  return (
    <>
      <div className="container py-5 ">
        <div className="row">
          <h1 className="text-center fw-bold">Latest Products</h1>
          <div className="my-3 ">
            <input
              type="search"
              className="form-control p-2 w-50 d-block mx-auto"
              name="search"
              id="search"
              aria-describedby="helpId"
              placeholder="Search..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </div>
          {isLoading ? (
            <PageLoading />
          ) : (
            data?.data.data
              .filter((row) => {
                if (search === "") {
                  return row;
                } else if (
                  row.title.toLowerCase().includes(search.toLowerCase())
                ) {
                  return row;
                }
              })
              .sort((a, b) => b.ratingsAverage - a.ratingsAverage)
              .map((product) => (
                <div className="col-md-3 " key={product._id}>
                  <div className="product m-3 p-2 rounded-4 cursor-pointer">
                    <Link
                      className="text-dark"
                      to={`productdetails/${product._id}`}
                    >
                      <img
                        src={product.imageCover}
                        alt=""
                        className="w-100 rounded-4"
                      />
                        <p className="text-main">{product.category.name}</p>


                      <h6 className="fw-bold">
                        {product.title.split(" ").slice(0, 2).join(" ")}
                      </h6>
                      <div className="product-price d-flex justify-content-between">
                        <span className="fw-bolder">{product.price} EGP</span>
                        <span>
                          {" "}
                          <i className="fa-solid fa-star rating-color"></i>{" "}
                          {product.ratingsAverage}
                        </span>
                      </div>
                    </Link>

                    <div className="box d-flex justify-content-between align-items-center mt-3 ">
                    <button
                      className="btn bg-main text-white d-block mx-auto my-2"
                      onClick={() => {
                        addToCartFunc(product._id);
                      }}
                    >
                      Add To Cart{" "}
                    </button>
                        <i className={isLike? "fa-solid fa-heart fs-3  text-danger" : "fa-regular fa-heart fs-3  text-danger"} onClick={()=>addToWishListFunc(product._id)}></i>
                      </div>

                  </div>
                </div>
              ))
          )}
        </div>
      </div>
    </>
  );
}
