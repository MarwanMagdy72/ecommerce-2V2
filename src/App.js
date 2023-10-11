import "./App.css";
import React, { useContext, useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Brands from "./Components/Brands/Brands";
import Cart from "./Components/Cart/Cart";
import Categories from "./Components/Categories/Categories";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import NotFound from "./Components/NotFound/NotFound";
import { UserToken } from "./Context/UserToken";
import ProtectedRoute from "./Components/ProtectedRoute";
import ProductDetails from "./ProductDetails/ProductDetails";
import { Toaster } from "react-hot-toast";
import Address from "./Components/Address/Address";
import CheckOut from "./Components/CheckOut/CheckOut";
import AllOrders from './Components/AllOrders/AllOrders';
import Products from "./Components/Products/Products";
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
import WishList from "./Components/WishList/WishList";
import ResetCode from "./Components/ForgotPassword/ResetCode";
import ResetPassword from "./Components/ForgotPassword/ResetPassword";


function App() {

  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "brands", element: <Brands /> },
        { path: "cart", element: <ProtectedRoute> <Cart /></ProtectedRoute> },
        { path: "categories", element: <Categories /> },
        { path: "products", element: <Products /> },
        { path: "wishlist", element: <WishList /> },
        { path: "productdetails/:id", element: <ProductDetails /> },
        { path: "address", element: <ProtectedRoute><Address /></ProtectedRoute> },
        { path: "checkout", element: <ProtectedRoute><CheckOut /></ProtectedRoute> },
        { path: "allorders", element: <ProtectedRoute><AllOrders /> </ProtectedRoute> },
        { path: "login", element: <Login /> },
        { path: "forgotpassword", element: <ForgotPassword /> },
        { path: "resetcode", element: <ResetCode/> },
        { path: "resetpassword", element: <ResetPassword/> },
        { path: "register", element: <Register /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={routes}></RouterProvider>
      <Toaster />
    </>
  );
}

export default App;
