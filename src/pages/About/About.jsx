import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { FaInstagram } from "react-icons/fa";
import { CiPhone } from "react-icons/ci";
import { CiMail } from "react-icons/ci";
import { FaWhatsapp } from "react-icons/fa";
import { CiTwitter } from "react-icons/ci";

function About() {
  const URL = import.meta.env.VITE_REACT_APP_API_KEY;
  const path = window.location.pathname.split("/")[1];
  useEffect(() => {
    if (path == "about-user" || path == "loading") {
      document.body.classList.add("bg-red");
    } else {
      document.body.classList.remove("bg-red");
    }
  }, [path]);
  const [data, setData] = useState([]);
  const getCategory = async () => {
    try {
      const res = await axios.get(URL + "/api/about");
      console.log(res.data, "h");
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getCategory();
  }, []);
  return (
    <div className="pt-4">
      <Row>
        <Col className="col-md-6 col-12 m-auto text-center">
          <img
            style={{ width: "40%" }}
            src={URL + "/storage/" + data.logo}
            alt=""
            className="mb-3 w-40"
          />
          <h1>{data.name}</h1>
        </Col>
      </Row>
      <Row>
        <Col className="col-md-6 col-12 m-auto text-center">
          <div>
            {data.insta && (
              <a target="_blank" href={data.insta}>
                {" "}
                <FaInstagram
                  className="fs-2 mx-2 cursor-pointer"
                  style={{ color: "#E1306C" }}
                />
              </a>
            )}
            {/* <a target="_blank" href={data.phone}>
              {" "}
              <CiPhone  className="fs-2 mx-2 cursor-pointer" style={{color:"#3498db"}}/>
            </a> */}
            {data.mail && (
              <a target="_blank" href={data.mail}>
                {" "}
                <CiMail
                  className="fs-2 mx-2 cursor-pointer"
                  style={{ color: "#FF5733" }}
                />
              </a>
            )}
            {data.whats && (
              <a target="_blank" href={data.whats}>
                {" "}
                <FaWhatsapp
                  className="fs-2 mx-2 cursor-pointer"
                  style={{ color: "#25D366" }}
                />
              </a>
            )}
            {data.twitter && (
              <a target="_blank" href={data.twitter}>
                {" "}
                <CiTwitter
                  className="fs-2 mx-2 cursor-pointer"
                  style={{ color: "#1DA1F2" }}
                />
              </a>
            )}
            {/* <a target="_blank" href={data.insta}>
              {" "}
              <CiPhone
                className="fs-2 mx-2 cursor-pointer"
                style={{ color: "#3498db" }}
              />
            </a> */}
          </div>
        </Col>
      </Row>
      <Row>
        {data.open ? (
          <>
            <Col className="col-md-6 col-12 m-auto text-center my-4 fs-4 fw-bold">
              موعد الفتح : {data.open}
            </Col>
            <Col className="col-md-6 col-12 m-auto text-center my-4 fs-4 fw-bold">
              موعد الغلق : {data.close}
            </Col>
          </>
        ) : (
          <>
            <Col className="col-md-6 col-12 m-auto text-center my-4 fs-4 fw-bold">
              مفتوح 24 ساعه
            </Col>
          </>
        )}
      </Row>
    </div>
  );
}

export default About;
