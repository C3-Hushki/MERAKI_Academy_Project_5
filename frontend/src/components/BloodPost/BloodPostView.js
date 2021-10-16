import { React, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { MdBloodtype } from 'react-icons/md';

function BloodPostView() {
  const [show, setShow] = useState(false);
  const [bloodPosts, setBloodPosts] = useState([]);
  let tokenSave = localStorage.getItem("token");
  let userIdSave = localStorage.getItem("CurrentUserId");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/bloodpost/`, {
        headers: {
          Authorization: `Bearer ${tokenSave}`,
        },
      })
      .then((result) => {
        console.log("result here", result.data.Data);
        setBloodPosts(result.data.Data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <>
     
        <Button variant="success" onClick={handleShow}>
        < MdBloodtype/>
        </Button>

        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Offcanvas</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {bloodPosts &&
              bloodPosts.map((elem, index) => {
                return (
                  <Card key = {index} style={{ width: "18rem" }}>
                    <Card.Img variant="top" src={elem.img} />
                    <Card.Body>
                      <Card.Title>{elem.title}</Card.Title>
                      <Card.Text>{elem.descriptionn}</Card.Text>
                      
                    </Card.Body>
                  </Card>
                );
              })}
          </Offcanvas.Body>
        </Offcanvas>
      </>
    </div>
  );
}

export default BloodPostView;
