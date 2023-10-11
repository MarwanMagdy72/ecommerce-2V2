import React, { useContext, useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import { CartContext } from "../../Context/CartContext";

export default function Layout() {
  let { setNumOfCartItems, getCart } = useContext(CartContext);

  async function getCartInfo() {
    const data = await getCart();
    setNumOfCartItems(data.data?.numOfCartItems);
  }

  useEffect(() => {
    getCartInfo();
  }, []);
  return (
    <>
      <div className="app">
        <NavBar />
        <div className="container ">
          {" "}
          <Outlet />
        </div>

        <Footer />
      </div>
    </>
  );
}
