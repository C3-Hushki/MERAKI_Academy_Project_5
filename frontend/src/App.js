import "./App.css";
import React, { useState } from "react";
import FacebookLogin from "react-facebook-login";
import { Card, Image } from "react-bootstrap";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { FacebookIcon } from "react-share";
import { Button, Container, Header, Segment, Grid } from "semantic-ui-react";

function App() {
  const [login, setLogin] = useState(false);
  const [data, setData] = useState({});
  const [picture, setPicture] = useState("");

  const responseFacebook = (response) => {
    console.log(response);
    setData(response);
    setPicture(response.picture.data.url);
    if (response.accessToken) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  };

  return (
    <>
      <div class="container">
        <Card style={{ width: "600px" }}>
          <Card.Header>
            {!login && (
              <FacebookLogin
                appId="1259903211090202"
                autoLoad={false}
                fields="name,email,picture"
                scope="public_profile,user_friends"
                callback={responseFacebook}
                icon="fa-facebook"
              />
            )}
            {login && <Image src={picture} roundedCircle />}
          </Card.Header>
          {login && (
            <Card.Body>
              <Card.Title>{data.name}</Card.Title>
              <Card.Text>{data.email}</Card.Text>
            </Card.Body>
          )}
        </Card>
      </div>

      <>
        <Container>
          <Segment>
            <FacebookShareButton
              url="https://www.facebook.com/AhmadMuraish"
              quote={"Easy Peasy Lemon Squeezy"}
              hashtag="#facebookshare"
            >
              <FacebookIcon LogoFillColor="white" round={true}></FacebookIcon>
            </FacebookShareButton>
          </Segment>
        </Container>
      </>
    </>
  );
}

export default App;
