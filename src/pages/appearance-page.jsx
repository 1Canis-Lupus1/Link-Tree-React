import React, { Component } from "react";
import {
  Col,
  Container,
  Row,
  Button,
  Card,
  CardBody,
  CustomInput,
  Label,
} from "reactstrap";
import { useHistory } from "react-router";

class Appearance extends Component {
  // const [myImg, setMyImg] = useState("");
  state = {
    myImg: "",
  };

  // _toggleModal = (index) => {
  //   const { modals } = this.state;
  //   modals[index] = !modals[index];
  //   this.setState({
  //     modals,
  //   });
  // };

  imgUpload = async (e) => {
    const uploadFile = e.target.files[0];
    const formData = new FormData();

    formData.append("file", uploadFile);
    formData.append("upload_preset", "companyImages");

    fetch("https://api.cloudinary.com/v1_1/djt6ve0ac/image/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("api res: ", res);
        this.setState({
          myImg: res.url,
        });
        // setMyImg(res.url);
      })
      .catch((err) => {
        alert("something went wrong");
        console.log("api error: ", err);
      });
  };

  Share = () => {
    // const history = useHistory();
    this.props.history.push("/profile-preview");
  };

  render() {
    return (
      <div className="app flex-row animated fadeIn innerPagesBg">
        <Container>
          <Row>
            <Col md="12">
              <div className="addedLinksWrapper">
                <div className="d-flex justify-content-start align-items-center my-3">
                  <h4 className="pg-title">Appearance</h4>
                </div>

                <Card className="userDetails mb-4">
                  <CardBody>
                    <h4 style={{ fontWeight: 600, marginBottom: 0 }}>
                      Profile
                    </h4>
                    <div className="text-center">
                      {/* <Label className="btn uploadBtnProfile"> */}
                      <input
                        type="file"
                        name="file"
                        placeholder="Upload an Image"
                        onChange={this.imgUpload}
                      />
                      {this.state.myImg ? (
                        <div>
                          <img
                            src={this.state.myImg}
                            width="100"
                            height="100"
                            alt="uploaded img"
                          />
                        </div>
                      ) : null}
                      {/* </Label> */}
                    </div>
                  </CardBody>
                </Card>

                <Card className="userDetails mb-4">
                  <CardBody>
                    <h4 style={{ fontWeight: 600, marginBottom: 0 }}>Themes</h4>
                    <Row>
                      <Col md={6} lg={4}>
                        <Button className="selectTheme themeSeleted">
                          <div className="themeLight">
                            <div className="themeLightBtn"></div>
                            <div className="themeLightBtn"></div>
                            <div className="themeLightBtn"></div>
                          </div>
                        </Button>
                        <p className="themeName">Light</p>
                      </Col>
                      <Col md={6} lg={4}>
                        <Button className="selectTheme">
                          <div className="themeDark">
                            <div className="themeDarkBtn"></div>
                            <div className="themeDarkBtn"></div>
                            <div className="themeDarkBtn"></div>
                          </div>
                        </Button>
                        <p className="themeName">Dark</p>
                      </Col>
                      <Col md={6} lg={4}>
                        <Button className="selectTheme">
                          <div className="themeScooter">
                            <div className="themeScooterBtn"></div>
                            <div className="themeScooterBtn"></div>
                            <div className="themeScooterBtn"></div>
                          </div>
                        </Button>
                        <p className="themeName">Scooter</p>
                      </Col>
                      <Col md={6} lg={4}>
                        <Button className="selectTheme">
                          <div className="themeLeaf">
                            <div className="themeLeafBtn"></div>
                            <div className="themeLeafBtn"></div>
                            <div className="themeLeafBtn"></div>
                          </div>
                        </Button>
                        <p className="themeName">Leaf</p>
                      </Col>
                      <Col md={6} lg={4}>
                        <Button className="selectTheme">
                          <div className="themeMoon">
                            <div className="themeMoonBtn"></div>
                            <div className="themeMoonBtn"></div>
                            <div className="themeMoonBtn"></div>
                          </div>
                        </Button>
                        <p className="themeName">Moon</p>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </div>

              <div className="profilePreviewWrap">
                <Button className="shareProfileBtn" onClick={this.Share}>
                  Share
                </Button>
                {/* change the theme class name accordingly, default is previewLight */}
                <div className="profilePreview previewLight">
                  <div className="text-center">
                    <Label className="btn uploadBtnProfile">
                      <input type="file" style={{ display: "none" }} />
                      <img
                        alt=""
                        className=""
                        src={"assets/img/user-img-default.png"}
                      />
                    </Label>
                    {/* use class text-white in Dark and Scooter theme*/}
                    <h5 className="text-black">@johndoe</h5>
                  </div>

                  <div className="mt-4">
                    {/* change the button class name accordingly */}
                    <Button className="btnOrange">LinkedIn</Button>
                    <Button className="btnOrange">Facebook</Button>
                  </div>
                </div>{" "}
                {/* profilePreview */}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Appearance;
