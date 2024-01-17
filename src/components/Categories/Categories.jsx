import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Search from "../Search/Search";

function Categories() {
  const URL = import.meta.env.VITE_REACT_APP_API_KEY;
  const [search, setSearch] = useState();
  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);

  const getCategory = async () => {
    try {
      const res = await axios.get(`${URL}/api/categories`);
      console.log(res);
      setData(res.data);
      setCategory(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getCategory();
  }, []);
  const navigate = useNavigate();
  useEffect(() => {
    console.log(search);
    console.log(data?.filter((d) => d.name.includes(search)));
    if (search == "") {
      setData(category);
    } else {
      setData(category?.filter((d) => d.name.toLowerCase().includes(search)));
    }
  }, [search]);
  return (
    <>
      <Row>
        {data?.map((c, i) => (
          <Col
            className=" categories col-md-6 col-12 p-1"
            key={i}
            onClick={() => navigate(`/category/${c.id}`)}
          >
            <div
              className="d-flex align-items-center p-2 cursor-pointer"
              style={{ border: "1px solid #ccc" }}
            >
              <div className="img">
                <img
                  style={{ width: "200px", height: "100px" }}
                  src={URL + "/storage/" + c.image}
                />
              </div>
              <h4>{c.name}</h4>
            </div>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Categories;
