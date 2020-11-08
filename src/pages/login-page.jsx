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
import { Logging } from "../http/http-calls";
import { connect } from "react-redux";
import { logUser } from "../redux/actions/user_data";
import { toast, toasts } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
const items = [
  {
    header: "Title",
    caption:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam mattis bibendum orci sit amet aliquam.",
  },
];

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      user: {
        username: "",
        password: "",
        token: "",
      },
      isTrue: {
        username: false,
        password: false,
      },
      errors: {},
    };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  notify = () => {
    toast.success("Logged-In Successfully", {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  };

  errNotify = () => {
    toast.error("Credential Mismatch", {
      position: toast.POSITION.BOTTOM_CENTER,
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

  forgotPassword = () => {
    this.props.history.push("/forgot-password");
  };

  requestDemo = () => {
    this.props.history.push("/signup");
  };

  users = () => {
    const { username, password } = this.state.user;
    const userLoginData = {
      handle: username,
      password: password,
    };
    Logging(userLoginData)
      .then((res) => {
        let userLoginData = {
          userName: res.handle,
          token: res.token,
        };
        console.log("userLoginData: ", userLoginData);
        this.props.logUser({ userLoginData });
        this.notify();
        this.props.history.push("/links");
      })
      .catch((err) => {
        console.log(err);
        this.errNotify();
        this.props.history.push("/login");
      });
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
    const { user, isTrue, errors } = this.state;
    Object.keys(user).forEach((each) => {
      switch (each) {
        case "username": {
          if (isTrue.username) {
            if (!user.username.trim().length) {
              errors[each] = "*Field Cannot Be Empty";
            } else {
              delete errors[each];
              isTrue.username = false;
            }
          }
          break;
        }
        case "password": {
          if (isTrue.password) {
            if (!user.password.trim().length) {
              errors.password = "*Field Cannot Be Empty";
            } else {
              delete errors[each];
              isTrue.password = false;
            }
          }
          break;
        }
        default: {
          console.log("Error");
          break;
        }
      }
    });
    this.setState({ errors });
    return Object.keys(errors).length ? errors : null;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let isTrue = {
      username: true,
      password: true,
    };
    this.setState({ isTrue }, () => {
      let errors = this.validation();
      console.log(errors);
      if (!errors) {
        const { user } = this.state;
        console.log("Final API call: ", user);
        // this.notify();
        this.users();
      }
    });
  };

  render() {
    const { activeIndex, user, errors } = this.state;

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
                src={"assets/img/login-img.svg"}
                alt="Login Img"
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
              <img
                src={"assets/img/company-logo.png"}
                alt="Login Img"
                className="projectLogo pl-3"
              />

              <div className="w-100 justify-content-center d-flex flex-column align-items-center">
                <Form className="loginFormWrapper" onSubmit={this.handleSubmit}>
                  <h4>Login to your account</h4>
                  <FormGroup>
                    <Label>Username</Label>
                    <Input
                      type="text"
                      placeholder="Your Username"
                      value={user.username}
                      onChange={(e) =>
                        this.handleChange("username", e.target.value)
                      }
                    />
                    {errors && (
                      <Fragment>
                        <small className="d-flex">{errors.username}</small>
                      </Fragment>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <Label>Password</Label>
                    <Input
                      type="password"
                      placeholder="Your Password"
                      value={user.email}
                      onChange={(e) =>
                        this.handleChange("password", e.target.value.trim())
                      }
                    />
                    {errors && (
                      <Fragment>
                        <small className="d-flex">{errors.password}</small>
                      </Fragment>
                    )}
                  </FormGroup>

                  <Button
                    className="recruitechThemeBtn loginBtn"
                    onClick={this.handleSubmit}
                  >
                    Login
                  </Button>
                </Form>

                <div className="registerWrap">
                  <div className="ml-3"></div>

                  <a
                    href="javascript:void(0)"
                    className="forgotPassword"
                    onClick={this.forgotPassword}
                  >
                    Forgot Password?
                  </a>
                </div>

                <div className="register">
                  Don't have an account?{" "}
                  <a href="javascript:void(0)" onClick={this.requestDemo}>
                    Sign Up!
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

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logUser: (userLoginData) => dispatch(logUser(userLoginData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
