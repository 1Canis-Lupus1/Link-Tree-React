import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Col, Container, Row, Carousel, CarouselIndicators, CarouselItem, CarouselCaption, Button, Form, Input, FormGroup, Label } from 'reactstrap';

const items = [
  {
    header: 'Title',
    caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam mattis bibendum orci sit amet aliquam.',    
  },
];

class RequestDemo extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
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

  login=()=>{
    this.props.history.push('/login')
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
                    <Input type="email" placeholder="Enter Email" />
                    {/* error msg, currently hidden */}
                    <small className="d-none">Enter a valid email ID</small>
                  </FormGroup>

                  <FormGroup>
                    <Label>Username</Label>
                    <Input type="text" placeholder="Enter Username" />
                    {/* error msg, currently hidden */}
                    <small className="d-none"></small>
                  </FormGroup>

                  <FormGroup className="position-relative">
                    <Label>Password</Label>
                    <Input type="text" placeholder="Enter Password" style={{paddingRight: 35}} />
                    {/* error msg, currently hidden */}
                    <small className="d-none"></small>
                    {/* eye icon for viewing the entered password */}
                    <span className="fa fa-eye-slash eyeIcon"></span>
                    {/* toggle the above icon with the below icon */}
                    <span className="fa fa-eye eyeIcon d-none"></span>
                  </FormGroup>
                  <FormGroup className="position-relative">
                    <Label>Repeat Password</Label>
                    <Input type="text" placeholder="Repeat Password" style={{paddingRight: 35}} />
                    {/* error msg, currently hidden */}
                    <small className="d-none"></small>
                    {/* eye icon for viewing the entered password */}
                    <span className="fa fa-eye-slash eyeIcon"></span>
                    {/* toggle the above icon with the below icon */}
                    <span className="fa fa-eye eyeIcon d-none"></span>
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