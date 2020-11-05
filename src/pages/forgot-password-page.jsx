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
import { validPass } from "../http/http-calls";
const items = [
  {
    header: "Title",
    caption:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam mattis bibendum orci sit amet aliquam.",
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
      myRes: "",
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
  sudoLogin = () => {
    this.props.history.push("/login");
  };

  login = (e) => {
    const { user } = this.state;
    let isTrue = {
      mail: true,
    };
    this.setState({ isTrue }, () => {
      let errors = this.validation();
      console.log("Errors In Validation;", errors);
      if (!errors) {
        const forgot_passData = {
          handle: user.mail,
        };
        validPass(forgot_passData).then((res) => {
          console.log("My response is;", res);
          if (res.error === false) {
            alert("Password Reset Link Sent Successfully");
            this.props.history.push("/login");
          } else {
            alert("Email Not Registered.Create a New User");
            // this.props.history.push("/signup");
          }
        });
      }
    });
  };

  handleChange = (field, value) => {
    const { user, isTrue } = this.state;
    if (!value && typeof value === "number") {
      user[field] = "";
      isTrue[field] = true;
      this.setState({ user, isTrue }, () => {
        this.validation();
      });
      return;
    } else {
      user[field] = value;
    }
    isTrue[field] = true;
    this.setState({ user, isTrue }, () => {
      this.validation();
    });
  };

  validation() {
    // debugger;
    const { user, isTrue, errors } = this.state;
    Object.keys(user).forEach((entry) => {
      switch (entry) {
        case "mail": {
          if (isTrue.mail) {
            if (!user.mail.trim().length) {
              errors.mail = "*Filed Cannot Be Empty";
            } else if (
              user.mail.trim().length &&
              !new RegExp(
                "^[a-zA-Z0-9]{1}[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,3}$"
              ).test(user.mail)
            ) {
              errors.mail = "*Enter Registered Email";
            } else {
              delete errors[entry];
              isTrue.mail = false;
            }
          }
          break;
        }
        default: {
          console.log("Error in validation()");
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
      mail: true,
    };
    this.setState({ isTrue }, () => {
      let errors = this.validation();
      console.log("Errors in Validationg;", errors);
      if (!errors) {
        const { user } = this.state;
        this.login();
        console.log("State value of 'user':", user);
      }
    });
  };

  render() {
    const { activeIndex, user, errors } = this.state;

    const slides2 = items.map((item, i) => {
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
                  onClick={this.sudoLogin}
                >
                  Back to Login
                </a>
              </div>

              <div className="w-100 justify-content-center d-flex flex-column align-items-center">
                <Form className="loginFormWrapper" onSubmit={this.handleSubmit}>
                  <h4>Forgot Password?</h4>
                  <FormGroup>
                    <Label>Email</Label>
                    <Input
                      type="mail"
                      placeholder="Your mail"
                      value={user.mail}
                      onChange={(e) =>
                        this.handleChange("mail", e.target.value.trim())
                      }
                    />
                    {errors && (
                      <Fragment>
                        <small className="d-flex" style={{ color: "red" }}>
                          {errors.mail}
                        </small>
                      </Fragment>
                    )}
                  </FormGroup>

                  <Button
                    className="recruitechThemeBtn loginBtn"
                    onClick={this.handleSubmit}
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
