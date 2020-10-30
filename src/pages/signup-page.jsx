import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Col,
  Container,
  Row,
  Carousel,
  CarouselIndicators,
  CarouselItem,
  CarouselCaption,
  Button,
  Form,
  Input,
  FormGroup,
  Label,
} from "reactstrap";
import { SignUp, validUsername } from "../http/http-calls";

const items = [
  {
    header: "Title",
    caption:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam mattis bibendum orci sit amet aliquam.",
  },
];

class RequestDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      user: {
        email: "",
        userName: "",
        password: "",
        rptPassword: "",
      },
      isTrue: {
        email: false,
        userName: false,
        password: false,
        rptPassword: false,
      },
      errors: {},
      validUsername: false,
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
      email: true,
      password: true,
    };
    this.setState({ isTrue }, () => {
      let errors = this.validation();
      console.log("Error:", errors);
      if (!errors) {
        const signupData = {
          email: this.state.user.email,
          userName: this.state.user.userName,
          password: this.state.user.password,
        };
        SignUp(signupData).then((res) => console.log(res));
        this.props.history.push("/login");
      }
    });
  };

  userLogin = () => {
    this.props.history.push("/login");
  };

  //handling input here
  handleChange = (name, value) => {
    const { user, isTrue } = this.state;
    user[name] = value;
    isTrue[name] = true;
    this.setState({ user, isTrue }, () => {
      this.validation();
    });
  };

  //for validation
  validation() {
    const { user, errors, isTrue } = this.state;
    Object.keys(user).forEach((entry) => {
      if (entry === "email" && isTrue.email) {
        if (!user.email.trim().length) {
          errors.email = "*Field Cannot Be Empty";
        } else if (
          user.email.trim().length &&
          !new RegExp(
            "^[a-zA-Z0-9]{1}[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,3}$"
          ).test(user.email)
        ) {
          errors.email = "Enter a valid email ID";
        } else {
          delete errors[entry];
          isTrue.email = false;
        }
      } else if (entry === "password" && isTrue.password) {
        if (!user.password.trim().length) {
          errors[entry] = "*Field Cannot Be Empty";
        } else {
          delete errors[entry];
          isTrue.password = false;
        }
      } else if (entry === "userName" && isTrue.userName) {
        const obj = {
          userName: user.userName,
        };
        if (!user.userName.trim().length) {
          errors[entry] = "*Field Cannot Be Empty";
        } else if (!(this.isValid(obj) && this.state.validUsername)) {
          console.log();
          errors[entry] = "Enter Unique Username";
        } else {
          delete errors[entry];
          isTrue.userName = false;
        }
      } else if (entry === "rptPassword" && isTrue.rptPassword) {
        if (!(user.rptPassword === user.password)) {
          errors[entry] = "*Password Does Not Match";
        } else {
          delete errors[entry];
          isTrue.rptPassword = false;
        }
      }
    });
    this.setState({ errors });
    return Object.keys(errors).length ? errors : null;
  }

  isValid = (userName) => {
    validUsername(userName).then((res) => {
      console.log("My response", res);
      if (res.isAvailable) {
        this.setState({
          validUsername: true,
        });
      } else {
        this.setState({
          validUsername: false,
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
                src={"assets/img/signup-img.svg"}
                alt="Sign Up Img"
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

            <Col md="6" lg="6" className="loginPgRightSide signupPgRightSide">
              <img
                src={"assets/img/company-logo.png"}
                alt="Login Img"
                className="projectLogo pl-3 mb-3"
              />

              <div className="w-100 justify-content-center d-flex flex-column align-items-center">
                <Form className="loginFormWrapper requestDemoForm">
                  <h4>Sign Up</h4>

                  <FormGroup>
                    <Label>Email</Label>
                    <Input
                      type="email"
                      placeholder="Enter Email"
                      name="email"
                      value={this.state.user.email}
                      onChange={(e) =>
                        this.handleChange(e.target.name, e.target.value)
                      }
                    />
                    {this.state.errors && (
                      <small style={{ color: "red" }}>
                        {this.state.errors.email}
                      </small>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <Label>Username</Label>
                    <Input
                      type="text"
                      placeholder="Enter userName"
                      name="userName"
                      value={this.state.user.userName}
                      onChange={(e) =>
                        this.handleChange(e.target.name, e.target.value)
                      }
                    />
                    {this.state.errors && (
                      <small style={{ color: "red" }}>
                        {this.state.errors.userName}
                      </small>
                    )}
                  </FormGroup>

                  <FormGroup className="position-relative">
                    <Label>Password</Label>
                    <Input
                      type="password"
                      placeholder="Enter Password"
                      style={{ paddingRight: 35 }}
                      name="password"
                      value={this.state.user.password}
                      onChange={(e) =>
                        this.handleChange(e.target.name, e.target.value)
                      }
                    />
                    {this.state.errors && (
                      <small style={{ color: "red" }}>
                        {this.state.errors.password}
                      </small>
                    )}
                    {/* eye icon for viewing the entered password */}
                    {/* <span className="fa fa-eye-slash eyeIcon"></span> */}
                    {/* toggle the above icon with the below icon */}
                    {/* <span className="fa fa-eye eyeIcon d-none"></span> */}
                  </FormGroup>
                  <FormGroup className="position-relative">
                    <Label>Repeat Password</Label>
                    <Input
                      type="password"
                      placeholder="Repeat Password"
                      style={{ paddingRight: 35 }}
                      name="rptPassword"
                      value={this.state.user.rptPassword}
                      onChange={(e) =>
                        this.handleChange(e.target.name, e.target.value)
                      }
                    />
                    {this.state.errors && (
                      <small style={{ color: "red" }}>
                        {this.state.errors.rptPassword}
                      </small>
                    )}
                    {/* eye icon for viewing the entered password */}
                    {/* <span className="fa fa-eye-slash eyeIcon"></span> */}
                    {/* toggle the above icon with the below icon */}
                    {/* <span className="fa fa-eye eyeIcon d-none"></span> */}
                  </FormGroup>

                  <Button
                    className="recruitechThemeBtn loginBtn"
                    style={{ marginTop: 30 }}
                    onClick={this.login}
                  >
                    Get Started
                  </Button>
                </Form>

                <div className="register mt-0 mb-3">
                  Already have an account?{" "}
                  <a href="javascript:void(0)" onClick={this.userLogin}>
                    Login
                  </a>
                </div>
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

export default RequestDemo;
