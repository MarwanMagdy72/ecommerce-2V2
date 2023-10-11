import axios from "axios";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import PageLoading from "./../Loading/PageLoading";
export default function AllOrders() {
  let [userOrders, setUserOrders] = useState(null);
  let [userName, setUserName] = useState(null);

  useEffect(() => {
    const res = jwtDecode(localStorage.getItem("UserToken"));
    getUserOrders(res.id);
    setUserName(res.name);
  

  }, []);

  async function getUserOrders(userId) {
    try {
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`
      );
      console.log(data);
      setUserOrders(data);
    } catch (error) {
      console.log("error", error);
    }
  }
  if (userOrders === null) {
    return <PageLoading />;
  } else {
    return (
      <>
        <h1 className="text-center fw-bold"> Hello {userName} </h1>
        <div className="row">
          <div className="col-md-12">
            {userOrders.map((order, index) => (
              <>
                <div key={order._id} className="table-responsive">
                  <div className="d-flex">
                    <h5 className="fw-bold me-5"> order: {index + 1} </h5>
                    <h5> created at: {order.createdAt.substring(0,10)} </h5>
                  </div>

                  <table className="table table-striped ">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Title</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Price</th>
                        <th scope="col">Total</th>
                      </tr>
                    </thead>
                    {order.cartItems.map((item, idx) => (
                      <tbody key={item._id}>
                        <>
                          <tr>
                            <td >{idx + 1}</td>
                            <td className="fw-bold  w-25">
                              {item.product.title}
                            </td>
                            <td>{item.count}</td>
                            <td>{item.price}</td>
                            <td>{item.count * item.price}</td>
                          </tr>
                        </>
                      </tbody>
                    ))}
                  </table>
                  <div className=" my-4 bg-success text-white py-2 d-flex justify-content-evenly align-items-center">
                    <h4 className="fw-bold">
                      Total: {order.totalOrderPrice} EGP
                    </h4>
                    <h4 className="fw-bold">
                      Payment: {order.paymentMethodType}
                    </h4>
                  </div>
                </div>



                <hr />
              </>
            ))}
          </div>
        </div>
      </>
    );
    
  }
}
