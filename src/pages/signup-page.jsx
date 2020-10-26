import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Col, Container, Row, Carousel, CarouselIndicators, CarouselItem, CarouselCaption, Button, Form, Input, FormGroup, Label } from 'reactstrap';
import {SignUp} from '../http/http-calls';

const items = [
  {
    header: 'Title',
    caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam mattis bibendum orci sit amet aliquam.',    
  },
];

class RequestDemo extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      activeIndex: 0,
      user:{
        email:"",
        username:"",
        password:"",
        rptPassword:""
      },
      isTrue:{
        email:false,
        username:false,
        password:false,
        rptPassword:false
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
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  login=(e)=>{
    let isTrue={
      email:true,
      password:true
    };
    this.setState({isTrue},()=>{
      let errors=this.validation();
      if(!errors){
        const data={
          email:this.state.user.email,
          username:this.state.user.username,
          password:this.state.user.password
        }
        SignUp(data).then(response=>{
          console.log(response);
          this.props.history.push("/login");
        })
      }
    })
  }
  
  handleChange=(e)=>{
    console.log(e.target.value);
    const {user,isTrue}=this.state;
    //Setting State Values
    this.state.user[e.target.name]=e.target.value;
    this.state.isTrue[e.target.name]=true;

    this.setState({user,isTrue},()=>{
      this.validation();
    })
    // this.setState({
    //   ...this.state,
    //   [e.target.name]: e.target.value
    // })

    // console.log("State Email:",this.state.email)
    // console.log("State Username:", this.state.username);
    // console.log("State Password:", this.state.password);
    // console.log("State Repeat-Password:", this.state.rptPassword);
  }

  //Validation
  validation(){
    //Validation here
    console.log("Validating input here");
    const {user,errors,isTrue}=this.state;
    Object.keys(user).forEach((entry)=>{
      if(entry === "email" && isTrue.email){
        if(!user.email.trim().length){
          errors.email="*Cannot Be Empty";
        }else if(
          user.email.trim().length && 
          !new RegExp(
            "^[a-zA-Z0-9]{1}[a-zA-Z0-9._+-]+@[a-zA-Z]{2,3,4}$"
          ).test(user.email) 
        ){
          errors.email="In-Valid Email";
        }else{
          delete errors[entry];
          isTrue.email=false;
        }
      }else if(entry==="username" && isTrue.username){
        if(!user.username.trim().length){
          errors.username="*Cannot be empty";
        }else{
          delete errors[entry];
          isTrue.username=false;
        }
      }else if(entry ==="password" && isTrue.password){
        if(!user.password.trim().length){
          errors[entry]="*Cannot be empty";
        }else{
          delete errors[entry];
          isTrue.password=false;
        }
      }else if(entry ==="rptPassword" && isTrue.rptPassword){
        if(!user.rptPassword.trim().length){
          errors[entry]="*Cannot be empty";
        }else{
          delete errors[entry];
          isTrue.rptPassword=false;
        }
      }
    });
    this.setState({errors});
    return Object.keys(errors).length ? errors:null;
  }

  render() {
    const { activeIndex } = this.state;

    const slides2 = items.map((item) => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
        >
          <CarouselCaption captionText={item.caption} captionHeader={item.header} />
        </CarouselItem>
      );
    });

    return (
      <div className="app flex-row animated fadeIn">
        <Container fluid>
          <Row>
            <Col md="6" lg="6" className="loginPgLeftSide lightBlueBg">
            {/* don't remove the below div */}
              <div style={{visibility: 'hidden'}}>
                <h3 className="pl-4">Link Tree</h3>
              </div>

              <img src={'assets/img/signup-img.svg'} alt="Sign Up Img" className="img-fluid loginImg"></img>

              <div className="loginContentLeftSide">
                <Carousel activeIndex={activeIndex} next={this.next} previous={this.previous}>
                  {/* <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} /> */}
                  {slides2}
                </Carousel>
              </div>
            </Col>

            <Col md="6" lg="6" className="loginPgRightSide signupPgRightSide">
              <img src={'assets/img/company-logo.png'} alt="Login Img" className="projectLogo pl-3 mb-3" />

              <div className="w-100 justify-content-center d-flex flex-column align-items-center">
                <Form className="loginFormWrapper requestDemoForm">
                  <h4>Sign Up</h4>

                  <FormGroup>
                    <Label>Email</Label>
                    <Input type="email" placeholder="Enter Email" name="email" value={this.state.user.email} onChange={this.handleChange} />
                    {this.state.errors && (
                      <p style={{color:"red"}}>
                        {this.state.errors.email}
                      </p>
                    )}
                    {/* error msg, currently hidden */}
                    {/* <small className="d-none">Enter a valid email ID</small> */}
                  </FormGroup>
                  <FormGroup>
                    <Label>Username</Label>
                    <Input type="text" placeholder="Enter Username" name="username" value={this.state.user.username} onChange={this.handleChange} />
                    {this.state.errors && (
                      <p style={{color:"red"}}>
                        {this.state.errors.username}
                      </p>
                    )}
                    {/* error msg, currently hidden */}
                    {/* <small className="d-none"></small> */}
                  </FormGroup>

                  <FormGroup className="position-relative">
                    <Label>Password</Label>
                    <Input type="text" placeholder="Enter Password" style={{paddingRight: 35}} name="password" onChange={this.handleChange}/>
                    {this.state.errors && (
                      <p style={{color:"red"}}>
                        {this.state.errors.password}
                      </p>
                    )}
                    {/* error msg, currently hidden */}
                    {/* <small className="d-none"></small> */}
                    {/* eye icon for viewing the entered password */}
                    {/* <span className="fa fa-eye-slash eyeIcon"></span> */}
                    {/* toggle the above icon with the below icon */}
                    {/* <span className="fa fa-eye eyeIcon d-none"></span> */}
                  </FormGroup>
                  <FormGroup className="position-relative">
                    <Label>Repeat Password</Label>
                    <Input type="text" placeholder="Repeat Password" style={{paddingRight: 35}} name="rptPassword" onChange={this.handleChange} />
                    {this.state.errors && (
                      <p style={{color:"red"}}>
                        {this.state.errors.rptPassword}
                      </p>
                    )}
                    {/* error msg, currently hidden */}
                    {/* <small className="d-none"></small> */}
                    {/* eye icon for viewing the entered password */}
                    {/* <span className="fa fa-eye-slash eyeIcon"></span> */}
                    {/* toggle the above icon with the below icon */}
                    {/* <span className="fa fa-eye eyeIcon d-none"></span> */}
                  </FormGroup>
      
                  <Button className="recruitechThemeBtn loginBtn" style={{marginTop: 30}} onClick={this.login}>Get Started</Button>
                </Form>

                <div className="register mt-0 mb-3">
                  Already have an account? <a href="javascript:void(0)" onClick={this.login}>Login</a>
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
                    Powered By: <a href="https://www.logic-square.com/" target="_blank" className="lsWebsite">
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