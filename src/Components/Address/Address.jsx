import { Formik, useFormik } from "formik";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";

export default function Address() {
  const navigate = useNavigate();
  let { onlinePayment } = useContext(CartContext);


   async function handleSubmitAddress(){
    // let response = await onlinePayment('650d47bc45ed4b248c166c22' , 'http://localhost:3000' , values); 
    // console.log(response?.data.session.url);
    navigate('/checkout');
    // window.location.href = response?.data.session.url ;
  

  }


  let formik = useFormik({

    initialValues:{
      details:'',
      phone:'',
      city:''
    },
    onSubmit:handleSubmitAddress

  })

  return (
    <>
     
          <form onSubmit={formik.handleSubmit} className="my-5 w-75 m-auto">
                <h1 className="text-center fw-bold"> Enter Your Address</h1>

            
            <label className="mt-3 fw-bold" htmlFor="phone"> Phone:  </label>

            <input
              type="tel"
              name="phone"
              id="phone"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              className="form-control "
            />
            <label className="mt-3 fw-bold" htmlFor="city"> City:  </label>

            <input
              type="text"
              name="city"
              id="city"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.city}
              className="form-control "
            />
            <label className="mt-3 fw-bold" htmlFor="details"> Address in details:  </label>
            <textarea
              type="text"
              name="details"
              id="details"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.details}
              className="form-control "
            />

            <button
              type="submit"
              className="btn btn-success m-3"
            >
              Submit
            </button>
          </form>
        
      
    </>
  );
}
