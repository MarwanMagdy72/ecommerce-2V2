import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { UserToken } from "../../Context/UserToken";
import ComponentLoading from "../Loading/ComponentLoading";
import { Helmet } from "react-helmet";

export default function Login() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  let { setIsLogin } = useContext(UserToken);
  async function submitLogin(values) {
    setLoading(true);
    let { data } = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .catch((err) => {
        setError(err.response.data.message);
        setLoading(false);
      });

    if (data.message === "success") {
      setError("");
      setLoading(false);
      localStorage.setItem("UserToken", data.token);
      setIsLogin(data.token);
      navigate("/");
    }
  }

  const validationSchema = Yup.object({
    email: Yup.string().email().required("Email is required"),
    password: Yup.string()
      .matches(
        /^[A-Z][a-z0-9]{5,10}$/,
        "Password must start with capital letter "
      )
      .required("Password is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: submitLogin,
  });
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Fresh Cart-Login</title>
      </Helmet>
      <form className="w-75 mx-auto my-5" onSubmit={formik.handleSubmit}>
        <h1 className="text-center">Login Now:</h1>

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

        <label htmlFor="password">Password: </label>
        <input
          type="password"
          className="form-control mb-3"
          id="password"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.errors.password && formik.touched.password ? (
          <p className="alert alert-danger">
            <i className="fa-solid fa-circle-exclamation text-danger me-2"></i>
            {formik.errors.password}
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
            Login
          </button>
        )}



        <p className=" text-center">
          Don't have an account? <NavLink to={"/register"}>SignUp</NavLink>
        </p>
        <p className=" text-center">
          <NavLink className='link-primary' to={'/forgotpassword'}>Forget Your Password ? </NavLink>
        </p>
      </form>
    </>
  );
}
