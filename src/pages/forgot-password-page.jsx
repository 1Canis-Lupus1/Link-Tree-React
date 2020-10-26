import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Col, Container, Row, Carousel, CarouselIndicators, CarouselItem, CarouselCaption, Button, Form, Input, FormGroup, Label } from 'reactstrap';
import { validPass } from "../http/http-calls";

const items = [
  {
    header: 'Title',
    caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam mattis bibendum orci sit amet aliquam.',    
  },
];

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      user: {
        mail: "",
      },
      isTrue: {
        mail: false,
      },
      errors: {},
      validMail: false,
    };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === items.length - 1
        ? 0
        : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === 0
        ? items.length - 1
        : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  login = () => {
    let isTrue = {
      mail: true,
    };
    this.setState({ isTrue }, () => {
      let errors = this.validation();
      console.log("Error:", errors);
      if (!errors) {
        alert("Password Reset Link Sent Successfully");
        this.props.history.push("/login");
      }
    });
  };

  sudologin=()=>{
    this.props.history.push("/login");
  }

  handleChange = (name, value) => {
    const { user, isTrue } = this.state;
    user[name] = value;
    isTrue[name] = true;
    this.setState({ user, isTrue }, () => {
      this.validation();
    });
  };

  validation = () => {
    const { user, errors, isTrue } = this.state;
    Object.keys(user).forEach((entry) => {
      if (entry === "mail" && isTrue.mail) {
        const obj = {
          handle: user.mail,
        };
        if (!user.mail.trim().length) {
          errors[entry] = "*Field Cannot Be Empty!!";
        } else if (!(this.isValid(obj) && this.state.validMail)) {
          errors[entry] = "*Enter Registered Email";
        } else {
          delete errors[entry];
          isTrue.mail = false;
        }
      }
    });
    this.setState({ errors });
    return Object.keys(errors).length ? errors : null;
  };

  isValid = (email) => {
    validPass(email).then((response) => {
      if (!response.error) {
        this.setState({
          validMail: true,
        });
      } else {
        this.setState({
          validMail: false,
        });
      }
    });
    return true;
  };

  render() {
    const { activeIndex } = this.state;

    const slides2 = items.map((item) => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
        >
          <CarouselCaption
            captionText={item.caption}
            captionHeader={item.header}
          />
        </CarouselItem>
      );
    });

    return (
      <div className="app flex-row animated fadeIn">
        <Container fluid>
          <Row>
            <Col md="6" lg="6" className="loginPgLeftSide lightBlueBg">
              {/* don't remove the below div */}
              <div style={{ visibility: "hidden" }}>
                <h3 className="pl-4">Link Tree</h3>
              </div>

              <img
                src={"assets/img/forgot-password-img.svg"}
                alt="Forgot Password Img"
                className="img-fluid loginImg"
              ></img>

              <div className="loginContentLeftSide">
                <Carousel
                  activeIndex={activeIndex}
                  next={this.next}
                  previous={this.previous}
                >
                  {/* <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} /> */}
                  {slides2}
                </Carousel>
              </div>
            </Col>

            <Col md="6" lg="6" className="loginPgRightSide">
              <div className="d-flex justify-content-between align-items-center pr-2 pl-3">
                <img
                  src={"assets/img/company-logo.png"}
                  alt="Login Img"
                  className="projectLogo"
                />

                <a
                  href="javascript:void(0)"
                  className="backToLogin"
                  onClick={this.sudologin}
                >
                  Back to Login
                </a>
              </div>

              <div className="w-100 justify-content-center d-flex flex-column align-items-center">
                <Form className="loginFormWrapper">
                  <h4>Forgot Password?</h4>
                  <FormGroup>
                    <Label>Email</Label>
                    <Input
                      type="email"
                      placeholder="Your Email"
                      name="mail"
                      value={this.state.user.mail}
                      onChange={(e) =>
                        this.handleChange(e.target.name, e.target.value)
                      }
                    />
                    {this.state.errors && (
                      <p style={{ color: "red" }}>{this.state.errors.mail}</p>
                    )}
                    {/* error msg, currently hidden */}
                    {/* <small className="d-none">Enter a valid email ID</small> */}
                  </FormGroup>

                  <Button
                    className="recruitechThemeBtn loginBtn"
                    onClick={this.login}
                  >
                    Reset Password
                  </Button>
                </Form>
              </div>

              {/* Footer */}
              <div>
                <div className="loginFooterLinks pl-3">
                  <a href="javascript:void(0)">Terms</a>
                  <a href="javascript:void(0)">Privacy</a>
                  <a href="javascript:void(0)">Support</a>
                </div>
                <div className="copyrightWrap pl-3">
                  Link Tree &#169; 2020.
                  <div>
                    Powered By:{" "}
                    <a
                      href="https://www.logic-square.com/"
                      target="_blank"
                      className="lsWebsite"
                    >
                      Logic Square
                    </a>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default ForgotPassword;
