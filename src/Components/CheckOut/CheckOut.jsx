import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import { UserToken } from "../../Context/UserToken";
import { useFormik } from "formik";
import PageLoading from './../Loading/PageLoading';

export default function CheckOut() {
  let { getCart, onlinePayment, cartId, setCartId } = useContext(CartContext);
  let { isLogin } = useContext(UserToken);
  let [data, setData] = useState();

  async function handleOnlinePayment(values) {
    let response = await onlinePayment(cartId, "http://localhost:3000", values);
    if (response?.data?.status === "success")
      window.location.href = response?.data.session.url;
  }
  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: handleOnlinePayment,
  });

  async function getCartFunc() {
    let res = await getCart();
    if (res?.data?.status === "success") {
      setData(res?.data);
      setCartId(res?.data.data._id);
    }
  }

  useEffect(() => {
    if (isLogin == null) return;
    getCartFunc();
  }, [isLogin]);

if(data === null) {
  return <PageLoading/>;
}else{
  return (
    <>
      <h1 className="text-center fw-bold"> Order Details: </h1>
      <div className="table-responsive">
        <table className="table ">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Amount</th>
              <th scope="col">Price</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>
            {data?.data.products.map((prod, index) => (
              <>
                <tr key={prod._id}>
                  <td>{index + 1}</td>
                  <td className="fw-bold w-25 ">{prod.product.title}</td>
                  <td>{prod.count}</td>
                  <td>{prod.price}</td>
                  <td>{prod.price * prod.count}</td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
        <h4 className="fw-bold my-4">Total: {data?.data.totalCartPrice} EGP</h4>
      </div>

      <div className="buttons d-flex ">
        <form onSubmit={formik.handleSubmit}>
          <button className="btn btn-success m-3 me-1" type="submit">
            {" "}
            online payment <i className=" ms-1 fa-regular fa-credit-card"></i>{" "}
          </button>

          <button className="btn btn-success m-3">
            {" "}
            cash payment <i className=" ms-1 fa-solid fa-money-bill-wave"></i>
          </button>
        </form>
      </div>
    </>
  );
}

}
