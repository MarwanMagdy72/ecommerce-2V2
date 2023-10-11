import React, {  useState } from 'react'
import axios from 'axios';
import * as Yup from "yup";
import { useFormik } from 'formik';
import { Helmet } from 'react-helmet';
import ComponentLoading from '../Loading/ComponentLoading';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function ResetCode() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  async function HandleResetCode(values) {

    let { data } = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", values)
      .catch((err) => {
        setError(err.response.data.message);
        setLoading(false);
      });


    if (data.status === "Success") {
      setError("");
      setLoading(false);
      toast.success(data.status);
      navigate("/resetpassword");
    }
  }

  const validationSchema = Yup.object({
    resetCode: Yup.string().required("Reset code is required")
  });

  let formik = useFormik({
    initialValues: {
        resetCode: ""
    },
    validationSchema,
    onSubmit: HandleResetCode,
  });
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Fresh Cart-Login</title>
      </Helmet>
      <form className="w-75 mx-auto my-5" onSubmit={formik.handleSubmit}>

        <h1 className='text-center fw-bold' >Reset Code</h1>


        {error ? <p className="alert alert-danger">{error}</p> : ""}

        <label htmlFor="resetCode">Reset Code: </label>
        <input
          type="text"
          className="form-control mb-3"
          id="resetCode"
          name="resetCode"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.resetCode}
        />
        {formik.errors.resetCode && formik.touched.resetCode ? (
          <p className="alert alert-danger">
            <i className="fa-solid fa-circle-exclamation text-danger me-2"></i>
            {formik.errors.resetCode}
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
