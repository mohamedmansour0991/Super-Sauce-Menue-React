import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  FormControl,
  FormLabel,
  Row,
} from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import { useDispatch, useSelector } from "react-redux";
import { removeAllProduct } from "../../rtk/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import img from "../../assets/ss1121.png";
import * as Yup from "yup";

import { useFormik } from "formik";
function FormUser() {
  const { cart, totalPrice } = useSelector((state) => state.cart);
  const URL = import.meta.env.VITE_REACT_APP_API_KEY;
  const user = JSON.parse(localStorage.getItem("userMenu"));
  const [name, setName] = useState(user?.name);
  const [email, setemail] = useState(user?.color);
  const [phone, setphone] = useState(user?.phone);
  const [address, setaddress] = useState(user?.address);
  const [message, setmessage] = useState(user?.message);
  const [loading, setloading] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const path = window.location.pathname.split("/")[1];
  useEffect(() => {
    if (path == "about-user" || path == "loading") {
      document.body.classList.add("bg-red");
    } else {
      document.body.classList.remove("bg-red");
    }
  }, [path]);
  const handleSubmit = async (value) => {
    setloading(true);
    // console.log(phone);
    console.log(cart);
    localStorage.setItem(
      "userMenu",
      JSON.stringify({
        name,
        color: email,
        address,
        phone: value.phone,
        message,
      })
    );
    const data = {
      ...user,
      total: totalPrice,
      order_detail: [
        {
          product_id: 1,
          quantity: 2,
          price: 10.99,
        },
        {
          product_id: 2,
          quantity: 1,
          price: 19.99,
        },
      ],
    };

    if (name) {
      data.name = name;
    }
    if (email) {
      data.color = email;
    }
    if (address) {
      data.address = address;
    }
    if (phone) {
      data.phone = phone;
    } else {
      data.phone = value.phone;
    }
    if (message) {
      data.message = message;
    }
    console.log(data);
    const order_detail = [];

    for (let i = 0; i < cart.length; i++) {
      order_detail.push({
        product_id: cart[i].id,
        quantity: cart[i].count,
        price: cart[i].price,
      });
    }
    data.order_detail = order_detail;
    console.log(order_detail, "o");
    // console.log(data);
    try {
      const res = await axios.post(`${URL}/api/checkout`, data);
      console.log(res);
      setloading(false);
      localStorage.removeItem("cart");
      // localStorage.removeItem("userMenu");
      dispatch(removeAllProduct());
      navigate("/loading");
      // swal({
      //   title: res.data.message,
      //   icon: "success",
      //   dangerMode: true,
      //   buttons: {
      //     cancel: "إلغاء",
      //   },
      // });
    } catch (err) {
      console.log(err);
      setloading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      phone: user?.phone || "",
    },
    validationSchema: Yup.object({
      phone: Yup.string()
        .matches(/^\d{11}$/, "يجب أن يحتوي رقم الهاتف على 11 رقمًا")
        .required("مطلوب"),
    }),
    onSubmit: (values) => {
      const { file, ...otherValues } = values;
      // يمكنك تنفيذ الإجراءات المطلوبة باستخدام القيمة الملف والقيم الأخرى.
      console.log("Form submitted with values:", otherValues, "File:", file);
      handleSubmit(values);
      // handleSubmit(e);
    },
  });
  return (
    <Form
      className="form mx-3"
      onSubmit={formik.handleSubmit}
      // onSubmit={(e) => {
      //   e.preventDefault();
      //   handleSubmit(e);
      // }}
    >
      <Col className="d-flex align-items-center w-100 flex-column justify-content-center text-center col-md-6 col-12">
        <img src={img} style={{ width: "50%" }} alt="" className="my-3" />
      </Col>
      <Row>
        <div className="col-md-6 col-12 ">
          <div className="d-flex gap-1  text-center m-auto mb-2 align-items-center flex-wrap">
            {/* <FormLabel>الاسم</FormLabel> */}
            <FormControl
              required
              type="text"
              placeholder="الاسم"
              className="mr-sm-2 text-center"
              onChange={(e) => setName(e.target.value)}
              defaultValue={user?.name}
            />
          </div>
        </div>
        <div className="col-md-6 col-12">
          <div className="d-flex gap-1  text-center m-auto mb-2 align-items-center flex-wrap">
            {/* <FormLabel>لون السياره</FormLabel> */}
            <FormControl
              required
              type="text"
              placeholder="لون السياره"
              className="mr-sm-2 text-center"
              onChange={(e) => setemail(e.target.value)}
              defaultValue={user?.color}
            />
          </div>
        </div>

        <div className="col-md-6 col-12">
          <div className=" d-flex gap-1  text-center m-auto mb-2 align-items-center flex-wrap">
            {/* <FormLabel>موديل و رقم السياره</FormLabel> */}
            <FormControl
              required
              type="text"
              placeholder="موديل و رقم السياره"
              className="mr-sm-2 text-center"
              onChange={(e) => setaddress(e.target.value)}
              defaultValue={user?.address}

              // onChange={handleSearch}
            />
          </div>
        </div>
        <div className="col-md-6 col-12">
          <div className="d-flex gap-1  text-center m-auto mb-2 align-items-center flex-wrap">
            {/* <FormLabel>الرساله</FormLabel> */}
            <FormControl
              required
              type="text"
              placeholder="الرساله"
              className="mr-sm-2 text-center"
              onChange={(e) => setmessage(e.target.value)}
              defaultValue={user?.message}

              // onChange={handleSearch}
            />
          </div>
        </div>
        <div className="col-md-6 col-12">
          <div className="d-flex gap-1  text-center m-auto mb-2 align-items-center flex-wrap">
            {/* <FormLabel>رقم التليفون</FormLabel> */}
            <FormControl
              // required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              style={
                formik.touched.phone &&
                formik.errors.phone && { border: "1px solid #000" }
              }
              type="text"
              name="phone"
              placeholder="رقم التليفون"
              className="mr-sm-2 text-center"
              // onChange={(e) => setphone(e.target.value)}
              // defaultValue={user?.phone}

              // onChange={handleSearch}
            />
            {formik.touched.phone && formik.errors.phone ? (
              <div className="text-white">{formik.errors.phone}</div>
            ) : null}
          </div>
        </div>
        <Col className="col-12 d-flex align-items-center justify-content-center my-4">
          <Button
            type="submit"
            variant="warning"
            style={{ width: "200px" }}
            disabled={loading}
            //   onClick={() => dispatch(addToCart(data))}
          >
            ارسال
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default FormUser;
