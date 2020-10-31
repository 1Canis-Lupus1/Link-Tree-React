import React, { Component } from "react";
import { Col, Container, Row, Button, Label, Card, CardBody } from "reactstrap";

class ProfilePreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      button: [],
    };
  }
  componentDidMount() {
    const user = localStorage.getItem("username");
    const btns = JSON.parse(localStorage.getItem("button"));
    console.log("USERNAME", user);
    console.log("Buttons", btns);
    this.setState({
      username: user,
      button: [...this.state.button, localStorage.getItem("button")],
    });
    // this.setState({
    //   username: user,
    // });
    console.log("USERNAME in profile-preview:", this.state.username);
    console.log("Buttons in profile-preview:", this.state.button);
  }

  render() {
    const handlePreviewLinks = () => {
      return (
        <>
          {this.state.button.map((item) => {
            return (
              <>
                <Button className="btnOrange">
                  <strong>{item.toUpperCase()}</strong>
                  <br />
                </Button>
              </>
            );
          })}
        </>
      );
    };
    return (
      <div className="app flex-row animated fadeIn innerPagesBg">
        <Container>
          <Row className="justify-content-center">
            <Col md="10" xl="8">
              <div className="d-flex justify-content-start align-items-center my-3">
                <h4 className="pg-title">Profile</h4>
              </div>

              <Card className="userDetails mb-4">
                <CardBody>
                  <div className="text-center">
                    <Label className="btn uploadBtnProfile">
                      <input type="file" style={{ display: "none" }} />
                      <img
                        alt=""
                        className=""
                        src={"assets/img/user-img-default.png"}
                      />
                    </Label>
                    <h5>@{this.state.username}</h5>
                  </div>

                  <div className="mt-4">
                    {this.state.button ? (
                      <strong>LINKS EMPTY</strong>
                    ) : (
                      <strong>{handlePreviewLinks()}</strong>
                    )}
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default ProfilePreview;
