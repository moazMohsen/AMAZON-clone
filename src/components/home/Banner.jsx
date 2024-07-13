import React from "react";
import Slider from "react-slick";
import {
  bannerImgOne,
  bannerImgTwo,
  bannerImgThree,
  bannerImgFour,
  bannerImgFive,
} from "../../assets/index";

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: (dots) => (
      <div
        style={{
          position: "absolute",
          top: "60%",
        }}
      >
        <ul> {dots} </ul>
      </div>
    ),
  };
  return (
    <div className="overflow-hidden relative">
      <Slider {...settings}>
        <div>
          <img src={bannerImgOne} alt="" />
        </div>
        <div>
          <img src={bannerImgTwo} alt="" />
        </div>
        <div>
          <img src={bannerImgThree} alt="" />
        </div>
        <div>
          <img src={bannerImgFour} alt="" />
        </div>
        <div>
          <img src={bannerImgFive} alt="" />
        </div>
      </Slider>
    </div>
  );
};

export default Banner;
