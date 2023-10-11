import React from "react";
import imgSlider1 from "../../assets/images/slider-image-1.jpeg";
import imgSlider2 from "../../assets/images/slider-image-2.jpeg";
import imgSlider3 from "../../assets/images/slider-image-3.jpeg";
import img1 from '../../assets/images/blog-img-1.jpeg'
import img2 from '../../assets/images/blog-img-2.jpeg'
import Slider from "react-slick";

export default function MainSlider() {
  let images = [imgSlider1, imgSlider2, imgSlider3];

  const settings = {
    dots: false ,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 1500,   
  };
  return (
    <>
      <div className="container ">
        <div className="row gx-0 py-4">
          <div className="col-md-10">
            <Slider {...settings} className="cursor-pointer">
              {images.map((image)=> <img key={image} src={image} className="w-100 main-slider-img" alt="slider image"/> )}
            </Slider>
          </div>
          <div className="col-md-2">
            <img src={img1} className="w-100" height={'150px'} alt="slider image" />
            <img src={img2} className="w-100" height={'150px'}  alt="slider image" />
          </div>
        </div>
      </div>
    </>
  );
}
