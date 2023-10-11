import React from "react";
import Slider from "react-slick";
import PageLoading from "../Loading/PageLoading";
import useApi from "../../Hooks/useApi";

export default function CategorySlider() {
  let { data, isLoading } = useApi("categories", "categories");

  const settings = {
    className: "center",
    dots: true,
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 7,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 1500,

  };
  if (isLoading) {
    return <PageLoading />;
  } else {
    return (
      <>
        <div className="container categ-slider">
          <h1 className="mb-1">Shop Popular Categories</h1>
          <Slider {...settings} className="cursor-pointer">
            {data?.data.data.map((img) => (
              <img
                key={img._id}
                src={img.image}
                height={"200px"}
                className="w-100"
                alt="slider image"
              />
            ))}
          </Slider>
        </div>
      </>
    );
  }
}
