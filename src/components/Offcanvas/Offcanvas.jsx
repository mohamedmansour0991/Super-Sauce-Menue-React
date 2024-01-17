import { useState } from "react";
import { Navbar } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Card from "../../pages/Card/Card";

function OffcanvasComp() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {/* <Button variant="primary">Launch</Button> */}
      <Navbar.Toggle className="text-white" onClick={handleShow} />

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>السله</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Card setShow={setShow} value="mobile" />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default OffcanvasComp;
