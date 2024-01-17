import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Button, Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { addToCart, decrese, increse } from "../../rtk/slices/cartSlice";
import { useDispatch } from "react-redux";
import Search from "../../components/Search/Search";
import swal from "sweetalert";
import { TbSquareRoundedPlusFilled } from "react-icons/tb";

function Category() {
  const URL = import.meta.env.VITE_REACT_APP_API_KEY;
  const path = window.location.pathname.split("/")[1];
  useEffect(() => {
    if (path == "about-user" || path == "loading") {
      document.body.classList.add("bg-red");
    } else {
      document.body.classList.remove("bg-red");
    }
  }, [path]);
  const id = useParams().id;
  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);
  const dispatch = useDispatch();
  const [search, setSearch] = useState();
  const getCategory = async () => {
    try {
      const res = await axios.get(`${URL}/api/categories`);
      console.log(res.data.filter((f) => f.id == id)[0].products, "h");
      setData(res.data.filter((f) => f.id == id)[0].products);
      setCategory(res.data.filter((f) => f.id == id)[0].products);
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
        <Search setSearch={setSearch} />
      </Row>
      <Row>
        {data.length > 0 ? (
          data?.map((c, i) => (
            <>
              {c?.discount_percentage ? (
                <Col className="offers col-md-6 col-12 p-2" key={i}>
                  <div
                    className="d-flex p-2  gap-3 justify-content-between"
                    style={{ border: "1px solid #ccc" }}
                  >
                    <div className="d-flex flex-column ">
                      <h4 onClick={() => navigate(`/offer/${c.id}`)}>
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
                        {c?.price} د.ع
                      </span>
                      <span style={{ fontSize: "20px", fontWeight: "500" }}>
                        {c?.price_after_discount} د.ع
                      </span>
                      {/* <Button
                    className="my-2"
                    variant="outline-success"
                    
                  >
                    اضف الى السله
                  </Button>{" "} */}
                    </div>
                    <div
                      className="d-flex align-items-center"
                      style={{ position: "relative" }}
                    >
                      <div className="img">
                        <img
                          className="cursor-pointer"
                          src={`${URL}/storage/` + c.image[0].path}
                          onClick={() => navigate(`/product/${c.id}`)}
                          style={{ width: "120px", height: "120px" }}
                        />
                      </div>
                      <TbSquareRoundedPlusFilled
                        onClick={() => {
                          dispatch(addToCart(c));
                          swal({
                            title:
                              "تم الاضافه بنجاح . هل تريد الذهاب الى السله",
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
              ) : (
                <Col className="offers col-md-6 col-12 p-2" key={i}>
                  <div
                    className="d-flex p-2  gap-3 justify-content-between"
                    style={{ border: "1px solid #ccc" }}
                  >
                    <div className="d-flex flex-column ">
                      <h4
                        className="cursor-pointer"
                        onClick={() => navigate(`/product/${c.id}`)}
                      >
                        {c?.name}
                      </h4>
                      <p
                        className="cursor-pointer"
                        onClick={() => navigate(`/product/${c.id}`)}
                      >
                        {" "}
                        {c?.description}
                      </p>
                      <span style={{ fontSize: "20px", fontWeight: "500" }}>
                        {Math.round(parseFloat(c?.price)).toString()} د.ع
                      </span>{" "}
                    </div>
                    <div
                      className="d-flex align-items-center"
                      style={{ position: "relative" }}
                    >
                      <div className="img">
                        <img
                          className="cursor-pointer"
                          src={`${URL}/storage/` + c.image[0].path}
                          onClick={() => navigate(`/product/${c.id}`)}
                          style={{ width: "120px", height: "120px" }}
                        />
                      </div>
                      <TbSquareRoundedPlusFilled
                        onClick={() => {
                          dispatch(addToCart(c));
                          swal({
                            title:
                              "تم الاضافه بنجاح . هل تريد الذهاب الى السله",
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
              )}
            </>
          ))
        ) : (
          <div>
            <Alert className="text-center" key="warning" variant="warning">
              لا يوجد بيانات
            </Alert>
          </div>
        )}
      </Row>
    </>
  );
}

export default Category;
