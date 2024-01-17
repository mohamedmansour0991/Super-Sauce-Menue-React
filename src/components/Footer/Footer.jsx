import React from "react";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import { BiSolidOffer } from "react-icons/bi";

import "./Footer.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { HiOutlineInformationCircle } from "react-icons/hi2";
import { Nav } from "react-bootstrap";
import { IoMdNotificationsOutline } from "react-icons/io";
function Footer() {
  const { cart } = useSelector((state) => state.cart);
  return (
    <div className="bg-header footer   align-items-center justify-content-around ">
      {/* <Nav.Link href="/" className="text-white d-flex  align-items-center justify-content-center"> */}
      <NavLink
        className="text-white d-flex  align-items-center justify-content-center"
        to="/"
      >
        <IoHomeOutline className="fs-1 text-white cursor-pointer" />
      </NavLink>
      {/* </Nav.Link> */}
      {/* <Nav.Link eventKey={2} href="#memes" className="text-white d-flex  align-items-center justify-content-center"> */}
      <NavLink
        className="text-white d-flex  align-items-center justify-content-center"
        to="/offers"
      >
        <BiSolidOffer className="fs-1 text-white cursor-pointer" />
      </NavLink>
      {/* </Nav.Link> */}
      {/* <Nav.Link eventKey={2} href="#memes" className="text-white d-flex  align-items-center justify-content-center"> */}
      <NavLink
        className="text-white d-flex  align-items-center justify-content-center"
        to="/card"
      >
        <span
          className="d-flex align-items-center justify-content-center"
          style={{
            position: "absolute",
            background: "#ccc",
            color: "red",
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            top: "10px",
          }}
        >
          {cart.length}
        </span>
        <MdOutlineLocalGroceryStore className="fs-1 text-white cursor-pointer" />
      </NavLink>
      {/* </Nav.Link> */}
      <NavLink
        className="text-white d-flex  align-items-center justify-content-center"
        to="/about"
      >
        <HiOutlineInformationCircle className="fs-1 text-white cursor-pointer" />
      </NavLink>
      <NavLink
        className="text-white d-flex  align-items-center justify-content-center"
        to="/notification"
        style={{ position: "relative" }}
      >
        <div class="pulse-css"></div>
        <IoMdNotificationsOutline className="fs-1 text-white cursor-pointer" />
      </NavLink>
    </div>
  );
}

export default Footer;
