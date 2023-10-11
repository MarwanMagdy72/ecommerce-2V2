import React, {  useState } from 'react'
import axios from 'axios';
import * as Yup from "yup";
import { useFormik } from 'formik';
import { Helmet } from 'react-helmet';
import ComponentLoading from '../Loading/ComponentLoading';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function ForgetPassword() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  async function HandleForgotPass(values) {

    let { data } = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", values)
      .catch((err) => {
        setError(err.response.data.message);
        setLoading(false);
      });


    if (data.statusMsg === "success") {
      setError("");
      setLoading(false);
      toast.success(data.message);
      navigate("/resetcode");

    }
  }

  const validationSchema = Yup.object({
    email: Yup.string().email().required("Email is required")
  });

  let formik = useFormik({
    initialValues: {
      email: ""
    },
    validationSchema,
    onSubmit: HandleForgotPass,
  });
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Fresh Cart-Login</title>
      </Helmet>
      <form className="w-75 mx-auto my-5" onSubmit={formik.handleSubmit}>

        <h1 className='text-center fw-bold' >Forgot Password</h1>


        {error ? <p className="alert alert-danger">{error}</p> : ""}

        <label htmlFor="email">Email: </label>
        <input
          type="email"
          className="form-control mb-3"
          id="email"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.errors.email && formik.touched.email ? (
          <p className="alert alert-danger">
            <i className="fa-solid fa-circle-exclamation text-danger me-2"></i>
            {formik.errors.email}
          </p>
        ) : (
          ""
        )}

        {loading ? (
          <ComponentLoading />
        ) : (
          <button
            type="submit"
            disabled={!(formik.isValid && formik.dirty)}
            className="btn btn-success ms-auto d-block"
          >
            Submit
          </button>
        )}

      </form>
    </>
  );
}
