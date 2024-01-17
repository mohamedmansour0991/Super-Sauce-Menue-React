import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Download from "./Download";

function Notification() {
  const URL = import.meta.env.VITE_REACT_APP_API_KEY;
  const user = JSON.parse(localStorage.getItem("userMenu"));
const path = window.location.pathname.split("/")[1];
useEffect(() => {
  if (path == "about-user" || path == "loading") {
    document.body.classList.add("bg-red");
  } else {
    document.body.classList.remove("bg-red");
  }
}, [path]);
  const [data, setData] = useState([]);
  const getNotification = async () => {
    try {
      const res = await axios.get(
        URL + `/api/getAllOrders-status/${user?.phone}`
      );
      console.log(res.data, "h");
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getNotification();
  }, []);
  setTimeout(() => {
    getNotification();
  }, 20000);

  return (
    <Row className="gap-1 d-flex ">
      {data?.map((e, i) => (
        <Col className="col-12">
          <div
            style={
              e.accept == 0
                ? { border: "3px solid #ccc" }
                : e.accept == 1
                ? { border: "3px solid blue" }
                : e.accept == 3
                ? { border: "3px solid green" }
                : e.accept == 2
                ? { border: "3px solid orange" }
                : e.accept == 4
                ? { border: "3px solid red" }
                : { border: "3px solid #ccc" }
            }
            className="p-2 d-flex flex-md-row flex-column"
          >
            <div>
              <h4 className="mb-0">{e.message}</h4>
              <p
                style={
                  e.accept == 0
                    ? { color: "#ccc" }
                    : e.accept == 1
                    ? { color: "blue" }
                    : e.accept == 3
                    ? { color: "green" }
                    : e.accept == 2
                    ? { color: "orange" }
                    : e.accept == 4
                    ? { color: "red" }
                    : { color: "#ccc" }
                }
                className="fs-15 mb-0"
              >
                {e.status}
              </p>
              <p
                className="fs-15 d-flex mb-0"
                style={{ flexDirection: "row-reverse", direction: "ltr" }}
              >
                {new Date(e.created_at).toLocaleString()}
              </p>
              <p className="mb-0">اجمالى الفاتوره : {e.total} د.ع</p>
            </div>
            {/* <Download e={e} /> */}
          </div>
        </Col>
      ))}
    </Row>
  );
}

export default Notification;
