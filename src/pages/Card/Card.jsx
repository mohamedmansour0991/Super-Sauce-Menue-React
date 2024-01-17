import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Button, Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import {
  addToCart,
  decrese,
  increse,
  removeProduct,
} from "../../rtk/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";

function Card({ value, setShow }) {
  console.log(value);
  const id = useParams().id;
  const { cart, totalPrice } = useSelector((state) => state.cart);
  const user = JSON.parse(localStorage.getItem("userMenu"));
  const URL = import.meta.env.VITE_REACT_APP_API_KEY;
  const path = window.location.pathname.split("/")[1];
  useEffect(() => {
    if (path == "about-user" || path == "loading") {
      document.body.classList.add("bg-red");
    } else {
      document.body.classList.remove("bg-red");
    }
  }, [path]);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    console.log(cart);

    const data = {
      ...user,
      totalPrice,
    };
    for (let i = 0; i < cart.length; i++) {
      const product_id = `order_detail[${i}][product_id]`;
      const quantity = `order_detail[${i}][quantity]`;
      const price = `order_detail[${i}][price]`;
      data[product_id] = cart[i].id;
      data[quantity] = cart[i].count;
      data[price] = cart[i].price;
    }
    console.log(data);
    try {
      const res = await axios.post(`${URL}/api/checkout`, data);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const [about, setAbout] = useState([]);
  const getAbout = async () => {
    try {
      const res = await axios.get(URL + "/api/about");
      console.log(res.data, "h");
      setAbout(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getAbout();
  }, []);
  return (
    <div className="pb-2">
      <Row>
        {cart?.map((c, i) => (
          <Col
            className="offers col-md-6 col-12 p-2"
            key={i}
            //   onClick={() => navigate(`/product/${c.id}`)}
          >
            <div
              className="d-flex p-2 gap-3 justify-content-between"
              style={{ border: "1px solid #ccc" }}
            >
              <div className="d-flex flex-column gap-2">
                {c?.discount_percentage ? (
                  <>
                    <h4
                      className="my-0 py-0"
                      onClick={() => navigate(`/offer/${data.id}`)}
                    >
                      {c?.name}
                    </h4>
                    <span
                      style={{
                        background: "red",
                        width: "fit-content",
                        color: "#fff",
                        borderRadius: "10px",
                        padding: "2px 10px",
                      }}
                    >
                      خصم {c.discount_percentage} %{" "}
                    </span>
                    {/* <p>{c?.description}</p> */}
                    <span
                      style={{ color: "red", textDecoration: "line-through" }}
                    >
                      {Math.round(parseFloat(c?.price)).toString()} د.ع
                    </span>
                    <span style={{ fontSize: "20px", fontWeight: "500" }}>
                      {c?.price_after_discount} د.ع
                    </span>

                    {/* <p>{c?.product_description}</p> */}
                  </>
                ) : (
                  <>
                    <h4>{c?.name}</h4>
                    <p>{c?.dec}</p>
                    <span style={{ fontSize: "20px", fontWeight: "500" }}>
                      {" "}
                      {Math.round(parseFloat(c?.price)).toString()}{" "}
                    </span>
                  </>
                )}

                {/* <Button
                variant="outline-success"
                onClick={() => dispatch(addToCart(c))}
              >
                اضف الى السله
              </Button>{" "} */}
              </div>
              <div
                className="d-flex align-items-center"
                style={{ position: "relative" }}
              >
                <div className="img">
                  {c?.product_image ? (
                    <img
                      style={{ width: "150px", height: "150px" }}
                      src={URL + "/storage/" + c?.img}
                    />
                  ) : (
                    <img
                      style={{ width: "150px", height: "150px" }}
                      src={URL + "/storage/" + c?.img}
                    />
                  )}
                </div>
                <div
                  style={{
                    position: "absolute",
                    zIndex: "111",
                    fontSize: "25px",
                    cursor: "pointer",
                    bottom: "17px",
                  }}
                ></div>
              </div>
            </div>
            <div>
              <div className="d-flex align-items-center gap-3 p-2">
                <Button
                  className="increase"
                  onClick={() => dispatch(increse(c))}
                  variant="outline-success"
                >
                  +
                </Button>
                <span>{c.count}</span>
                <Button
                  variant="outline-danger"
                  className="dec"
                  onClick={() => dispatch(decrese(c))}
                >
                  -
                </Button>
                <Button
                  variant="outline-danger"
                  className="dec"
                  onClick={() => {
                    swal({
                      title: "هل تريد ازاله النتج ؟",
                      icon: "warning",
                      dangerMode: true,
                      buttons: {
                        cancel: "إلغاء",
                        confirm: "نعم، أريد الحذف",
                      },
                    }).then((willDelete) => {
                      if (willDelete) {
                        dispatch(removeProduct(c));
                      }
                    });
                  }}
                >
                  حذف المنتج
                </Button>
              </div>
            </div>
          </Col>
        ))}
      </Row>
      {cart.length > 0 ? (
        <Row className="d-flex align-items-center h-100">
          <Col className="col-md-6 col-12 p-2">
            <div style={{ border: "1px solid #ccc" }} className="p-2">
              <div
                style={{ fontSize: "20px", fontWeight: "bold", color: "gray" }}
              >
                {" "}
                المجموع : {totalPrice} د.ع
              </div>
              <div
                style={{ fontSize: "20px", fontWeight: "bold", color: "gray" }}
              >
                {" "}
                التوصيل : {about.delivery_cost ? about.delivery_cost : 0} د.ع
              </div>
              <div
                style={{ fontSize: "20px", fontWeight: "bold", color: "gray" }}
              >
                {" "}
                قيمه الخصم : {about.discount ? about.discount : 0} د.ع
              </div>
            </div>
          </Col>
          <Col className="col-md-6 col-12 p-2 h-100">
            <div style={{ border: "1px solid #ccc" }} className="p-2">
              <div
                style={{ fontSize: "20px", fontWeight: "bold", color: "gray" }}
              >
                {" "}
                المجموع الكلى :
                {totalPrice + about.delivery_cost - about.discount} د.ع
              </div>
            </div>
          </Col>
          <Col className="col-12 d-flex align-items-center justify-content-center my-4">
            <Button
              variant="outline-success"
              style={{ width: "200px" }}
              onClick={() => {
                if (value) {
                  setShow(false);
                  navigate("/about-user");
                } else {
                  navigate("/about-user");
                }
                // if (!user) {
                // } else {
                //   handleSubmit();
                // }
              }}
            >
              ارسال الطلب
            </Button>
          </Col>
        </Row>
      ) : (
        <div className="mt-5 ">
          <Alert className="text-center" key="warning" variant="warning">
            لا يوجد منتجات
          </Alert>
        </div>
      )}
    </div>
  );
}

export default Card;
