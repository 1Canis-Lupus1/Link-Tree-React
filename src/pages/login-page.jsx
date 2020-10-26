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
import {Logging} from '../http/http-calls';

const items = [
  {
    header: "Title",
    caption:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam mattis bibendum orci sit amet aliquam.",
  },
];

//Base Url
// const url = "http://139.59.14.81:4000/api/v1";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      user:{
        userName:"",
        password:"",
        token:""
      },
      isTrue:{
        userName:false,
        password:false
      },
      errors:{}
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

  forgotPassword = () => {
    this.props.history.push("/forgot-password");
  };

  requestDemo = () => {
    this.props.history.push("/signup");
  };

  users = (e) => {
    // console.log("Clicked");
    // console.log("Target:", e.target.value);
    let userData={}
    const data={
      handle: this.state.user.userName,
      password: this.state.user.password
    }
    Logging(data).then(response=>{
      userData={
        userName:response.handle,
        token:response.token
      }
      //SEND USER DATA TO REDUX STORE
      this.props.history.push("/links");
    }).catch(err=>console.log("Error:",err))
  };

  handleChange=(e)=>{
    // console.log(e.target.name,e.target.value);
    const {user,isTrue}=this.state;
    user[e.target.name]=e.target.value;
    isTrue[e.target.name]=true;
    
    this.setState({user,isTrue},()=>{
      this.validation();
    })
  }

  validation=()=>{
    const {user,isTrue,errors}=this.state;
    Object.keys(user).forEach(entry=>{
      if(entry==="userName" && isTrue.userName){
        if(!user.userName.trim().length){
          errors[entry] = "*Field Cannot Be Empty!!";
        } else{
          delete errors[entry];
          isTrue.userName=false;
        }
      } else if(entry ==="password" && isTrue.password){
        if(!user.password.trim().length){
          errors[entry] = "*Field Cannot Be Empty!!";
        } else{
          delete errors[entry];
          isTrue.password=false;
        }
      }
    })
    this.setState({errors});
    return Object.keys(errors).length ? errors:null;
  }

  // //Username valid or not
  // const handleChange = (e) => {
  //   console.log(e.target.value);
  //   fetch(`${url}/check-userName`, {
  //     method: "POST",
  //     // headers:{
  //     //   "Accept":'application/json',
  //     //   "Content-Type":'application/json'
  //     // },
  //     body: {
  //       "userName": "e.target.value",
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((resText) => console.log(resText))
  //     .catch((err) => console.log(err));
  // };
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
                <Form className="loginFormWrapper">
                  <h4>Login to your account</h4>
                  <FormGroup>
                    <Label>Username</Label>
                    <Input
                      type="text"
                      placeholder="Your Username"
                      name="userName"
                      value={this.state.user.userName}
                      onChange={this.handleChange}
                    />
                    {this.state.errors && (
                      <p style={{color:"red"}}>
                        {this.state.errors.userName}</p>
                    )}
                    {/* error msg, currently hidden */}
                    {/* <small className="d-none">Enter a valid username</small> */}
                  </FormGroup>
                  <FormGroup>
                    <Label>Password</Label>
                    <Input
                      type="password"
                      placeholder="Your Password"
                      name="password"
                      value={this.state.user.password}
                      onChange={this.handleChange}
                    />
                    {this.state.errors && (
                      <p style={{color:"red"}}>
                        {this.state.errors.password}</p>
                    )}
                    {/* error msg, currently hidden */}
                    {/* <small className="d-none">
                      Password entered is incorrect
                    </small> */}
                  </FormGroup>

                  <Button
                    className="recruitechThemeBtn loginBtn"
                    onClick={this.users}
                  >
                    Login
                  </Button>
                </Form>

                <div className="registerWrap">
                  <div className="ml-3">
                    {/* <Input type="checkbox" id="rememberMe" />
                    <Label for="rememberMe" className="mb-0">Remember Me</Label> */}
                  </div>

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

export default Login;
