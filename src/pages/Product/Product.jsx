import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import ImageSlider from "../../components/ImageSlider/ImageSlider";
import { addToCart } from "../../rtk/slices/cartSlice";
import { useDispatch } from "react-redux";
import Slider from "react-slick";
import swal from "sweetalert";
import "./Product.css";
import { TbSquareRoundedPlusFilled } from "react-icons/tb";
function Product() {
  const URL = import.meta.env.VITE_REACT_APP_API_KEY;
  const [data, setData] = useState();
  const id = useParams().id;
  const dispatch = useDispatch();
  const getCategory = async () => {
    try {
      const res = await axios.get(`${URL}/api/product/${id}`);
      console.log(res.data);
      setData(res.data.product);
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

  ///addithion

  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [addithion, setSelectedAdditions] = useState([]);
  const [addithionPrice, setAdditionPrice] = useState(0);

  // const handleCheckboxChange = (index, id, price) => {
  //   // Create a copy of the selectedCheckboxes array
  //   const updatedCheckboxes = [...selectedCheckboxes];

  //   // Toggle the checkbox at the specified index
  //   if (updatedCheckboxes.includes(index)) {
  //     updatedCheckboxes.splice(updatedCheckboxes.indexOf(index), 1);
  //   } else {
  //     updatedCheckboxes.push(index);
  //   }
  //   console.log(price, "p");
  //   console.log(addithionPrice);
  //   setaddithionPrice((pre) => pre + price);
  //   setaddithion(id);
  //   // setaddithion({ ...addithion, id });

  //   // Update the state with the new array
  //   setSelectedCheckboxes(updatedCheckboxes);
  // };

  const handleCheckboxChange = (index, id, price) => {
    const updatedCheckboxes = [...selectedCheckboxes];

    if (updatedCheckboxes.includes(index)) {
      // Checkbox is being unchecked
      updatedCheckboxes.splice(updatedCheckboxes.indexOf(index), 1);
      setAdditionPrice((prev) => prev - price);

      // Remove the unchecked addition from the selectedAdditions array
      setSelectedAdditions((prev) => prev.filter((item) => item.id !== id));
    } else {
      // Checkbox is being checked
      updatedCheckboxes.push(index);
      setAdditionPrice((prev) => prev + price);

      // Add the checked addition to the selectedAdditions array
      setSelectedAdditions((prev) => [...prev, { id, price }]);
    }
    console.log(addithionPrice);

    setSelectedCheckboxes(updatedCheckboxes);
  };

  useEffect(() => {
    console.log(selectedCheckboxes);
  }, [selectedCheckboxes]);
  return (
    <Row className=" d-flex align-items-center">
      <div className="product d-flex align-items-center">
        {data?.price_after_discount ? (
          <>
            {" "}
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
                  خصم{" "}
                  {Math.round(parseFloat(data?.discount_percentage)).toString()}{" "}
                  %{" "}
                </span>
                <h4 className="mb-0">{data?.name}</h4>
                <p className="mb-0">{data?.product_description}</p>
                <span
                  className="mb-0"
                  style={{ textDecoration: "line-through" }}
                >
                  {Math.round(parseFloat(data?.price)).toString()} د.ع
                </span>
                <span
                  className="mb-0"
                  style={{ fontSize: "20px", fontWeight: "500" }}
                >
                  {Math.round(
                    parseFloat(data?.price_after_discount)
                  ).toString()}{" "}
                  د.ع
                </span>
              </div>
            </Col>
            <Col className="col-md-6 col-12 align-items-center justify-content-center">
              {" "}
              <Slider {...settings}>
                {data?.image?.map((product, i) => (
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
          </>
        ) : (
          <>
            {" "}
            <Col className="col-md-6 col-12 d-flex flex-column ">
              <div className="d-flex flex-column ">
                <h4 className="mb-0">{data?.name}</h4>
                <p className="mb-0">{data?.description}</p>

                <span
                  className="mb-0"
                  style={{ fontSize: "20px", fontWeight: "500" }}
                >
                  {Math.round(parseFloat(data?.price)).toString()} د.ع
                </span>
              </div>
            </Col>
            <Col className="col-md-6 col-12 align-items-center justify-content-center">
              {" "}
              <Slider {...settings}>
                {data?.image?.map((product, i) => (
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
          </>
        )}
      </div>

      {/* <Col className="col-12 d-flex align-items-center justify-content-center ">
        <Button
          variant="outline-success"
          style={{ width: "200px" }}
          onClick={() => {
            dispatch(addToCart({ ...data, addithionPrice, addithion }));

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
        >
          اضف الى السله
        </Button>
      </Col> */}
      {/* {data?.additions &&
        data?.additions.map((e, i) => (
          <Col className="col-md-6 col-12 ">
            <label
              htmlFor={`checkbox${i}`}
              className="d-flex p-2 gap-3 justify-content-between mb-3"
              style={{ border: "1px solid #ccc" }}
            >
              <div className="d-flex p-2 gap-3 justify-content-between align-items-center mb-3 w-100">
                <div className="d-flex p-2 gap-3 align-items-center">
                  <Form.Check
                    inline
                    name={`checkbox${i}`}
                    type={"checkbox"}
                    id={`checkbox${i}`}
                    checked={selectedCheckboxes.includes(i)}
                    onChange={() =>
                      handleCheckboxChange(i, e.id, +e.additional_price)
                    }
                  />

                  <img
                    style={{ width: "60px" }}
                    src={`${URL}/storage/` + e.image}
                    alt=""
                  />
                  <div>{e.name}</div>
                </div>
                <div>
                  {" "}
                  <div>{e.additional_price} د.ع</div>
                </div>
              </div>
            </label>
          </Col>
        ))} */}
      <TbSquareRoundedPlusFilled
        onClick={() => {
          dispatch(addToCart({ ...data, addithionPrice, addithion }));

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
      {data?.additions?.length > 0 && <h3>الاضافات</h3>}
      <div className="offers">
        {data?.additions?.length > 0 ? (
          data?.additions?.map((c, i) => (
            <Col className="col-md-6 col-12 p-2" key={i}>
              <div
                className="d-flex p-2  gap-3 justify-content-between"
                style={{ border: "1px solid #ccc" }}
              >
                <div className="d-flex flex-column">
                  <h4 className="cursor-pointer">{c?.name}</h4>
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

export default Product;
