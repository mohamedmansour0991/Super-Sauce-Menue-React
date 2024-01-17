import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../../assets/ss1121.png";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import { BiSolidOffer } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { HiOutlineInformationCircle } from "react-icons/hi2";
import OffcanvasComp from "../Offcanvas/Offcanvas";
import { IoMdNotificationsOutline } from "react-icons/io";

function Header() {
  const { cart } = useSelector((state) => state.cart);
  console.log(cart);

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-header text-white mb-1">
      <Container className="">
        <Navbar.Brand href="#home " className="text-white">
          <Link to="/">
            {" "}
            <img src={logo} alt="" style={{ width: "50px", height: "30px" }} />
          </Link>
        </Navbar.Brand>
        <OffcanvasComp />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>

          <Nav className="d-none d-md-flex">
            {/* <Nav.Link href="/" className="text-white mx-4"> */}
            <NavLink className="text-white mx-5" to="/">
              <IoHomeOutline className="fs-1 text-white cursor-pointer" />
            </NavLink>
            {/* </Nav.Link> */}
            {/* <Nav.Link eventKey={2} href="#memes" className="text-white mx-4"> */}{" "}
            <NavLink className="text-white mx-5" to="/about">
              <HiOutlineInformationCircle className="fs-1 text-white cursor-pointer" />
            </NavLink>
            {/* </Nav.Link> */}
            {/* <Nav.Link eventKey={2} href="#memes" className="text-white mx-4"> */}
            <NavLink className="text-white mx-5" to="/card">
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
            {/* <Nav.Link eventKey={2} href="#memes" className="text-white mx-4"> */}
            <NavLink className="text-white mx-5" to="/offers">
              <BiSolidOffer className="fs-1 text-white cursor-pointer" />
            </NavLink>
            <NavLink
              className="text-white mx-5"
              to="/notification"
              style={{ position: "relative" }}
            >
              <div class="pulse-css"></div>
              <IoMdNotificationsOutline className="fs-1 text-white cursor-pointer" />
            </NavLink>
            {/* </Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
