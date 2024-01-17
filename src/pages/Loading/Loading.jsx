import React, { useEffect } from "react";
import img from "../../assets/ss1121.png";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
function Loading() {
  const navigate = useNavigate();
  const path = window.location.pathname.split("/")[1];
  useEffect(() => {
    if (path == "about-user" || path == "loading") {
      document.body.classList.add("bg-red");
    } else {
      document.body.classList.remove("bg-red");
    }
  }, [path]);
  useEffect(() => {
    setTimeout(() => {
      navigate("/notification");
    }, 4000);
  }, []);
  return (
    <Row
      className="d-flex align-items-center justify-content-center text-center col-md-6 col-12"
      style={{ width: "100%" }}
    >
      <Col className="d-flex align-items-center flex-column justify-content-center text-center col-md-6 col-12">
        <img src={img} style={{ width: "70%", height: "30%" }} alt="" />
        <h2 className="text-white "> طلبك قيد التحضير ....</h2>
      </Col>
    </Row>
  );
}

export default Loading;
