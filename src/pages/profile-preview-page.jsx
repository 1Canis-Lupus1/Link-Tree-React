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
    const btns = JSON.parse(localStorage.getItem("buttons"));
    console.log("USERNAME", user);
    console.log("Buttons", btns);
    const newBtn = this.state.button.concat(btns);
    console.log("New Buttonns:", newBtn);
    this.setState(
      {
        username: user,
        button: newBtn,
      },
      () => console.log("My buttons are:", this.state.button)
    );
  }

  render() {
    const showLink = () => {
      return (
        <>
          {this.state.button.map((item, index) => {
            if (item === undefined) {
              return (
                <Button className="btnOrange">
                  <strong>LINKS EMPTY</strong>
                  <br />
                </Button>
              );
            } else {
              return (
                <>
                  <Button className="btnOrange">
                    <strong>{item}</strong>
                    <br />
                  </Button>
                </>
              );
            }
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
                    <strong>{showLink()}</strong>
                    {/* {!this.state.button.length ? (
                      <Button className="btnOrange">
                        <strong>LINKS EMPTY</strong>
                      </Button>
                    ) : (
                      <strong>{showLink()}</strong>
                    )} */}
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
