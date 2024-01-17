import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import ImageSlider from "../../components/ImageSlider/ImageSlider";
import { addToCart } from "../../rtk/slices/cartSlice";
import { useDispatch } from "react-redux";
import Slider from "react-slick";
import swal from "sweetalert";
import { TbSquareRoundedPlusFilled } from "react-icons/tb";

function Offer() {
  const URL = import.meta.env.VITE_REACT_APP_API_KEY;
  const path = window.location.pathname.split("/")[1];
  useEffect(() => {
    if (path == "about-user" || path == "loading") {
      document.body.classList.add("bg-red");
    } else {
      document.body.classList.remove("bg-red");
    }
  }, [path]);
  const [data, setData] = useState();
  const id = useParams().id;
  const dispatch = useDispatch();
  const getCategory = async () => {
    try {
      const res = await axios.get(`${URL}/api/product/${id}`);
      console.log(res.data.data);
      setData(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getCategory();
  }, []);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // nextArrow: <NextArrow />,
    // prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
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
  const navigate = useNavigate();
  return (
    <Row className="d-flex align-items-center">
      <Row className="product align-items-center ">
        <Col className="col-md-6 col-12 d-flex flex-column ">
          <div className="d-flex flex-column ">
            <span
              className="mb-0"
              style={{
                background: "red",
                width: "fit-content",
                color: "#fff",
                borderRadius: "10px",
                padding: "2px 10px",
              }}
            >
              خصم {Math.round(parseFloat(data?.discount_percentage)).toString()}{" "}
              %{" "}
            </span>
            <h4 className="mb-0" onClick={() => navigate(`/offer/${data.id}`)}>
              {data?.offer_name}
            </h4>
            <p className="mb-0">{data?.product_description}</p>
            <span className="mb-0" style={{ textDecoration: "line-through" }}>
              {data?.price}
            </span>
            <span
              className="mb-0"
              style={{ fontSize: "20px", fontWeight: "500" }}
            >
              {data?.price_after_discount}
            </span>
          </div>
        </Col>
        <Col className="col-md-6 col-12 align-items-center justify-content-center">
          {" "}
          <Slider {...settings}>
            {data?.product_image?.map((product, i) => (
              <div key={i} className="product-slide ">
                {/* Render your product content here */}
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{ position: "relative" }}
                >
                  <div className="img">
                    <img
                      preload="true"
                      style={{ width: "100%", maxHeight: "250px" }}
                      src={`${URL}/storage/` + product.path}
                      alt={product.name}
                    />
                  </div>
                </div>

                {/* <h3>{product.name}</h3>
            <p>{product.description}</p> */}
              </div>
            ))}
          </Slider>
          {/* <img
          style={{ width: "70%" }}
          src={`${URL}/storage/" + data?.image[0].path}
        /> */}
        </Col>
      </Row>
      <TbSquareRoundedPlusFilled
        onClick={() => {
          dispatch(addToCart(data));
          swal({
            title: "تم الاضافه بنجاح . هل تريد الذهاب الى السله",
            icon: "success",
            buttons: {
              cancel: "لا",
              confirm: "نعم",
            },
            dangerMode: true,
          }).then((willDelete) => {
            if (willDelete) {
              navigate("/card");
            }
          });
        }}
        style={{
          zIndex: "111",
          fontSize: "50px",
          cursor: "pointer",
        }}
      />
      {data?.additions_item?.length > 0 && <h3>الاضافات</h3>}
      <div className="offers">
        {data?.additions_item?.length > 0 ? (
          data?.additions_item?.map((c, i) => (
            <Col className="col-md-6 col-12 p-2" key={i}>
              <div
                className="d-flex p-2  gap-3 justify-content-between"
                style={{ border: "1px solid #ccc" }}
              >
                <div className="d-flex flex-column">
                  <h4
                    className="cursor-pointer"
                    onClick={() => navigate(`/product/${c.id}`)}
                  >
                    {c?.name}
                  </h4>
                  <p className="cursor-pointer"> {c?.description}</p>
                  <span style={{ fontSize: "20px", fontWeight: "500" }}>
                    {Math.round(parseFloat(c?.price)).toString()} د.ع
                  </span>
                </div>
                <div
                  className="d-flex align-items-center"
                  style={{ position: "relative" }}
                >
                  <div className="img">
                    <img
                      className="cursor-pointer"
                      onClick={() => navigate(`/product/${c.id}`)}
                      style={{ width: "120px", height: "120px" }}
                      src={`${URL}/storage/` + c.image[0].path}
                    />
                  </div>
                  <TbSquareRoundedPlusFilled
                    onClick={() => {
                      dispatch(addToCart(c));
                      swal({
                        title: "تم الاضافه بنجاح . هل تريد الذهاب الى السله",
                        icon: "success",
                        buttons: {
                          cancel: "لا",
                          confirm: "نعم",
                        },
                        dangerMode: true,
                      }).then((willDelete) => {
                        if (willDelete) {
                          navigate("/card");
                        }
                      });
                    }}
                    style={{
                      position: "absolute",
                      zIndex: "111",
                      fontSize: "25px",
                      cursor: "pointer",
                      bottom: "17px",
                    }}
                  />
                </div>
              </div>
            </Col>
          ))
        ) : (
          <div></div>
        )}
      </div>
    </Row>
  );
}

export default Offer;
