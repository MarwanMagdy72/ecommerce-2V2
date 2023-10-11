import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate, NavLink, json } from "react-router-dom";
import * as Yup from "yup";
import ComponentLoading from "./../Loading/ComponentLoading";
import { Helmet } from "react-helmet";

export default function Register() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function submitRegister(values) {
    setLoading(true);
    let { data } = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .catch((err) => {
        setError(err.response.data.message);
        setLoading(false);
      });

    if (data.message === "success") {
      setError("");
      setLoading(false);
      navigate("/login");
    }
  }

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must has at least 3 characters")
      .max(10, "Name must has maximum 10 characters")
      .required("Name is required"),
    email: Yup.string().email().required("Email is required"),
    password: Yup.string()
      .matches(
        /^[A-Z][a-z0-9]{5,10}$/,
        "Password must start with capital letter "
      )
      .required("Password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Two Passwords not matched!")
      .required("rePassword is required"),
    phone: Yup.string().matches(/^(002)?01[0-25][0-9]{8}/, "Phone not match"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: submitRegister,
  });
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Fresh Cart-Register</title>
      </Helmet>
      <form className="w-75 mx-auto my-5" onSubmit={formik.handleSubmit}>
        <h1 className="text-center">Register Now:</h1>

        {error ? <p className="alert alert-danger">{error}</p> : ""}

        <label htmlFor="name">Name: </label>
        <input
          type="text"
          className="form-control mb-3"
          id="name"
          name="name"
          onChange={formik.handleChange}
          value={formik.values.name}
          onBlur={formik.handleBlur}
        />

        {formik.errors.name && formik.touched.name ? (
          <p className="alert alert-danger">
            <i className="fa-solid fa-circle-exclamation text-danger me-2"></i>
            {formik.errors.name}
          </p>
        ) : (
          ""
        )}

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

        <label htmlFor="rePassword">rePassword: </label>
        <input
          type="password"
          className="form-control mb-3"
          id="rePassword"
          name="rePassword"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.rePassword}
        />
        {formik.errors.rePassword && formik.touched.rePassword ? (
          <p className="alert alert-danger">
            <i className="fa-solid fa-circle-exclamation text-danger me-2"></i>
            {formik.errors.rePassword}
          </p>
        ) : (
          ""
        )}

        <label htmlFor="phone">Phone: </label>
        <input
          type="tel"
          className="form-control mb-3"
          id="phone"
          name="phone"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.phone}
        />
        {formik.errors.phone && formik.touched.phone ? (
          <p className="alert alert-danger">
            <i className="fa-solid fa-circle-exclamation text-danger me-2"></i>
            {formik.errors.phone}
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
            Register
          </button>
        )}

        <p>
          Already have an account? <NavLink to={"/login"}>SignIn</NavLink>
        </p>
      </form>
    </>
  );
}
