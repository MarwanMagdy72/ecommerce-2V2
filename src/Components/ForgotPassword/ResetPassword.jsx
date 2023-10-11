import React, {  useState } from 'react'
import axios from 'axios';
import * as Yup from "yup";
import { useFormik } from 'formik';
import { Helmet } from 'react-helmet';
import ComponentLoading from '../Loading/ComponentLoading';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function ResetPassword() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  async function HandleResetPassword(values) {

    let { data } = await axios
      .put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", values)
      .catch((err) => {
        setError(err.response.data.message);
        setLoading(false);
      });
      console.log(data);


      if(data.token){
          toast.success('Password has been reset successfully');
          navigate('/login');
      }
  }

  const validationSchema = Yup.object({
    email: Yup.string().email().required("Email is required"),
    newPassword: Yup.string().required("Password is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: ""
    },
    validationSchema,
    onSubmit: HandleResetPassword,
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
        <label htmlFor="newPassword">New Password: </label>
        <input
          type="password"
          className="form-control mb-3"
          id="newPassword"
          name="newPassword"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.newPassword}
        />
        {formik.errors.newPassword && formik.touched.newPassword ? (
          <p className="alert alert-danger">
            <i className="fa-solid fa-circle-exclamation text-danger me-2"></i>
            {formik.errors.newPassword}
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
