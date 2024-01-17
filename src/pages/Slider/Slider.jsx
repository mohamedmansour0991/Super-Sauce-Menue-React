import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch } from "react-redux";
import axios from "axios";
// You can create this CSS file for custom styling

const SliderComp = ({}) => {
  const URL = import.meta.env.VITE_REACT_APP_API_KEY;

  const [products, setData] = useState([]);
  const dispatch = useDispatch();
  const getCategory = async () => {
    try {
      const res = await axios.get(`${URL}/api/slider`);
      console.log(res);
      setData(res.data.advertisements);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getCategory();
  }, []);
  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: products?.length >= 3 ? 3 : products?.length > 1 ? 2 : 1,
    slidesToScroll: 1,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 2000,
    // nextArrow: <NextArrow />,
    // prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      {products?.length > 0 && (
        <div className="p-1 ">
          {products && (
            <Slider {...settings}>
              {products?.map((product) => (
                <div
                  key={product.id}
                  className="product-slide px-1 d-flex align-items-center justify-content-center"
                  style={{ borderRadius: "30px", overflow: "hidden" }}
                >
                  {/* Render your product content here */}
                  <img
                    preload="true"
                    style={{
                      width: "100%",
                      height: "160px",

                      cursor: "grab",
                    }}
                    src={`${URL}/storage/` + product.gallery}
                    alt={product.gallery}
                  />
                  {/* <h3>{product.name}</h3>
            <p>{product.description}</p> */}
                </div>
              ))}
            </Slider>
          )}
        </div>
      )}
    </>
  );
};

const NextArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <span>&#9654;</span>
    </div>
  );
};

const PrevArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <span>&#9664;</span>
    </div>
  );
};

export default SliderComp;
