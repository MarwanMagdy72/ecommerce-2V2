import React from "react";

export default function Footer() {
  return (
    <footer className="py-4 bg-dark text-white footer " id="footer">
      {/* <div className="container py-5">
        <h1 className='my-4'>Get the freshCart app</h1>
       <p>share your link Lorem ipsum dolor sit.</p>
       <div className="row">
        <div className="col-md-9">
          <input type="text" className='form-control' placeholder='share link' />
        </div>
        <div className="col-md-3">
          <button className='btn btn-success form-control'>share your link</button>
        </div>
       </div>
        </div> */}
      <div className="info text-center">
        © 2023 Powered by <span className="fw-bold"> Eng Marwan Magdy</span>
      </div>
      <div className="social-links text-center my-2  ">
        <a href="https://www.facebook.com/marawan.magdy.58910/" target="_blank">
          {" "}
          <i className="fa-brands fa-facebook text-white fa-2x"></i>
        </a>
        <a href="https://www.linkedin.com/in/marwan-magdy72" target="_blank">
          {" "}
          <i className="fa-brands fa-linkedin mx-3 text-white fa-2x"></i>
        </a>
        <a href="https://github.com/MarwanMagdy72" target="_blank">
          {" "}
          <i className="fa-brands fa-github text-white fa-2x"></i>
        </a>
      </div>
    </footer>
  );
}
