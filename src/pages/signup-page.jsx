import React, { Component, Fragment } from "react";
import {
  Col,
  Container,
  Row,
  Carousel,
  CarouselItem,
  CarouselCaption,
  Button,
  Form,
  Input,
  FormGroup,
  Label,
} from "reactstrap";
import { SignUp, validUsername } from "../http/http-calls";
import { toast, toasts } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const items = [
  {
    header: "Title",
    caption:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam mattis bibendum orci sit amet aliquam.",
  },
];
toast.configure();

class RequestDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      user: {
        email: "",
        username: "",
        password: "",
        rptPassword: "",
      },
      isTrue: {
        email: false,
        username: false,
        password: false,
        rptPassword: false,
      },
      errors: {},
      validUsername: false,
      type: "password",
    };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  notify = () => {
    toast.success("User Registration Successful", {
      position: toast.POSITION.TOP_LEFT,
    });
  };

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

  login = (e) => {
    e.preventDefault();
    let isTrue = {
      email: true,
      password: true,
    };
    this.setState({ isTrue }, () => {
      let errors = this.validation();
      console.log("Errors:", errors);
      if (!errors) {
        const signupData = {
          email: this.state.user.email,
          userName: this.state.user.username,
          password: this.state.user.password,
        };
        SignUp(signupData).then((res) => {
          console.log("My Signup Response:", res);
        });
        this.props.history.push("/login");
      }
    });
  };

  login = () => {
    this.props.history.push("/login");
  };

  handleChange = (field, value) => {
    const { user, isTrue } = this.state;
    if (!value && typeof value === "number") {
      user[field] = "";
      isTrue[field] = true;
      this.setState({ user, isTrue }, () => {
        this.validation();
        console.log(this.state);
      });
      return;
    } else {
      user[field] = value;
    }
    isTrue[field] = true;
    this.setState({ user, isTrue }, () => {
      this.validation();
      console.log(this.state);
    });
  };

  validation() {
    const { user, isTrue, errors, validUsername } = this.state;
    Object.keys(user).forEach((entry) => {
      switch (entry) {
        case "email": {
          if (isTrue.email) {
            if (!user.email.trim().length) {
              errors.email = "*Required";
            } else if (
              user.email.trim().length &&
              !new RegExp(
                "^[a-zA-Z0-9]{1}[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,3}$"
              ).test(user.email)
            ) {
              errors.email = "*Invalid Email ID";
            } else {
              delete errors[entry];
              isTrue.email = false;
            }
          }
          break;
        }

        case "password": {
          if (isTrue.password) {
            if (!user.password.trim().length) {
              errors.password = "*Field Cannot Be Empty";
            } else {
              delete errors[entry];
              isTrue.password = false;
            }
          }
          break;
        }

        case "username": {
          const obj = {
            userName: user.username,
          };
          if (isTrue.username) {
            if (!user.username.trim().length) {
              errors[entry] = "*Field Cannot Be Empty";
            } else if (!(this.isValid(obj) && validUsername)) {
              errors[entry] = "Username Already Exists";
            } else {
              delete errors[entry];
              isTrue.username = false;
            }
          }
          break;
        }

        case "rptPassword": {
          if (isTrue.rptPassword) {
            if (!user.rptPassword.trim().length) {
              errors.rptPassword = "*Field Cannot Be Empty";
            } else if (
              user.rptPassword.trim().length &&
              user.rptPassword !== user.password
            ) {
              errors.rptPassword = "*Password Does Not Match";
            } else {
              delete errors[entry];
              isTrue.rptPassword = false;
            }
          }
          break;
        }
        default: {
          console.log("Error in validation():");
          break;
        }
      }
    });
    this.setState({ errors });
    return Object.keys(errors).length ? errors : null;
  }

  isValid = (userName) => {
    validUsername(userName).then((res) => {
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

  handleSubmit = (e) => {
    e.preventDefault();
    let isTrue = {
      email: true,
      username: true,
      password: true,
      rptPassword: true,
    };
    this.setState({ isTrue }, () => {
      let errors = this.validation();
      console.log(errors);
      if (!errors) {
        const { user } = this.state;
        console.log("Value in State 'user':", user);
        this.notify();
        this.login();
      }
    });
  };

  handleClick = () =>
    this.setState(({ type }) => ({
      type: type === "password" ? "text" : "password",
    }));

  render() {
    const { activeIndex, user, errors, validUsername, type } = this.state;

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
                <Form
                  className="loginFormWrapper requestDemoForm"
                  onSubmit={this.handleSubmit}
                >
                  <h4>Sign Up</h4>

                  <FormGroup>
                    <Label>Email</Label>
                    <Input
                      type="email"
                      placeholder="New Email"
                      value={user.email}
                      onChange={(e) =>
                        this.handleChange("email", e.target.value.trim())
                      }
                    />
                    {/* error msg, currently hidden */}
                    {errors && (
                      <Fragment>
                        <small className="d-flex" style={{ color: "red" }}>
                          {errors.email}
                        </small>
                      </Fragment>
                    )}
                  </FormGroup>

                  <FormGroup className="position-relative">
                    <Label>Username</Label>
                    <Input
                      type="text"
                      placeholder="Enter Unique Username"
                      value={user.username}
                      onChange={(e) =>
                        this.handleChange("username", e.target.value)
                      }
                    />
                    {errors && (
                      <Fragment>
                        <small className="d-flex" style={{ color: "red" }}>
                          {errors.username}
                        </small>
                      </Fragment>
                    )}
                  </FormGroup>

                  <FormGroup className="position-relative">
                    <Label>Password</Label>
                    <Input
                      type={type}
                      placeholder="Enter a Password"
                      style={{ paddingRight: 35 }}
                      value={user.password}
                      onChange={(e) =>
                        this.handleChange("password", e.target.value)
                      }
                      required
                    />
                    {errors && (
                      <Fragment>
                        <small className="d-flex" style={{ color: "red" }}>
                          {errors.password}
                        </small>
                      </Fragment>
                    )}
                  </FormGroup>
                  <FormGroup className="position-relative">
                    <Label>Repeat Password</Label>
                    <Input
                      type={type}
                      placeholder="Enter Password Again"
                      value={user.rptPassword}
                      onChange={(e) =>
                        this.handleChange("rptPassword", e.target.value)
                      }
                      required
                    />
                    {errors && (
                      <Fragment>
                        <small className="d-flex" style={{ color: "red" }}>
                          {errors.rptPassword}
                        </small>
                      </Fragment>
                    )}
                  </FormGroup>

                  <Button
                    className="recruitechThemeBtn loginBtn"
                    style={{ marginTop: 30 }}
                    onClick={this.handleSubmit}
                  >
                    Get Started
                  </Button>
                </Form>

                <div className="register mt-0 mb-3">
                  Already have an account?{" "}
                  <a href="javascript:void(0)" onClick={this.login}>
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
