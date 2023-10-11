import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/freshcart-logo.svg";
import { UserToken } from "../../Context/UserToken";
import { CartContext } from "../../Context/CartContext";
import { Avatar } from "@mui/material";
import { toast } from "react-hot-toast";
import jwtDecode from "jwt-decode";
import Popup from "reactjs-popup";

export default function NavBar() {
  let { isLogin, setIsLogin } = useContext(UserToken);
  const navigate = useNavigate();
  let { numOfCartItems   } = useContext(CartContext);
  // let [userName, setUserName] = useState(null);


  // useEffect(() => {
  //   const res = jwtDecode(localStorage.getItem("UserToken"));
  //   setUserName(res.name);
  // }, []);


  function LogOut() {
    localStorage.removeItem("UserToken");
    setIsLogin(null);
    toast("We are waiting for you again  ");
    navigate("/");
  }

  

  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-light bg-light py-3  ">
        <div className="container ">
          <NavLink className="navbar-brand" to={"/"}>
            <img src={logo} className="w-100" alt="logo" />
          </NavLink>
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavId">
            <ul className="navbar-nav m-auto mt-2 align-items-center">
              <li className="nav-item ">
                <NavLink
                  className="nav-link fw-bold"
                  to={"/"}
                  aria-current="page"
                >
                  Home
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  className="nav-link fw-bold"
                  to={"/categories"}
                  aria-current="page"
                >
                  Categories
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link fw-bold"
                  to={"/products"}
                  aria-current="page"
                >
                  Products
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link fw-bold"
                  to={"/wishlist"}
                  aria-current="page"
                >
                  Wish List
                </NavLink>
              </li>
              <li className="nav-item ">
                <NavLink
                  className="nav-link fw-bold"
                  to={"/brands"}
                  aria-current="page"
                >
                  Brands
                </NavLink>
              </li>
              {isLogin ? (
                <>
                  <li className="nav-item cart-icon text-center  ">
                    <NavLink
                      className="nav-link fw-bold p-relative "
                      to={"cart"}
                      aria-current="page"
                    >
                      <i className="fa-solid fa-cart-shopping text-dark mx-1 fs-2 "></i>
                    </NavLink>
                  </li>
                  <div className="numOfCartItems rounded-3 text-white ">
                    <span>{numOfCartItems}</span>
                  </div>
                </>
              ) : (
                ""
              )}
            </ul>
            <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
              {!isLogin ? (
                <>
                  {" "}
                  <li className="nav-item">
                    <NavLink
                      className="nav-link fw-bold"
                      to={"/register"}
                      aria-current="page"
                    >
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link fw-bold"
                      to={"/Login"}
                      aria-current="page"
                    >
                      Login
                    </NavLink>
                  </li>{" "}
                </>
              ) : (
                <div className="d-flex align-items-center justify-content-center">
                  <div>
                    <Popup
                      trigger={
                        <button className="d-block border-0 bg-light">
                          {" "}
                          <Avatar
                            src="/broken-image.jpg"
                            className="bg-success ms-2 me-4 mt-1 "
                          />{" "}
                        </button>
                      }
                      modal
                      nested
                    >
                      <div className="profile">

                        <div className="profile-image p-2 d-flex justify-content-center">
                        <Avatar
                            src="/broken-image.jpg"
                            className="bg-success ms-2 me-4 mt-1 text-center  "
                          />
                        </div>

                        <div className="name text-center fw-bold ">
                          {/* <span className="fa-2x text-center fw-bold ">{userName}</span> */}
                        </div>



                        
                        
                      </div>

                      {() => (
                        <div className="modal">
                          <div className="content ">Welcome to GFG!!!</div>

                        </div>
                      )}
                    </Popup>

                    {/* <span className="fw-bold text-success">{userName}</span> */}
                  </div>
                  <li className="nav-item">
                    <span
                      className="nav-link cursor-pointer fw-bold"
                      aria-current="page"
                      onClick={LogOut}
                    >
                      <i className="fa-solid fa-right-from-bracket fa-2x"></i>
                    </span>
                  </li>
                </div>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
