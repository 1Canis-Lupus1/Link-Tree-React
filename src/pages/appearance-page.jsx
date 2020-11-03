import React, { Component, Fragment } from "react";
import { Col, Container, Row, Button, Card, CardBody, Label } from "reactstrap";
import { uploadProfilePic, updatePic } from "../http/http-calls";
import { picUpload } from "../redux/action/user-data";
import { connect } from "react-redux";

class Appearance extends Component {
  state = {
    modals: [false, false],
    defaultChange: "Light",
    selectChange: "",
    myBtn: [],
    myImg: "",
  };

  componentDidMount() {
    this.setState(
      {
        myBtn: JSON.parse(localStorage.getItem("button")),
      },
      () => {
        console.log("After Set State Btns:", this.state.myBtn);
      }
    );
  }

  _uploadImage = (e) => {
    if (e) {
      const uploadFile = e.target.files[0];
      const formData = new FormData();

      formData.append("file", uploadFile);
      formData.append("upload_preset", "companyImages");

      // setLoading(true)

      fetch("https://api.cloudinary.com/v1_1/cirus/image/upload", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((res) => {
          console.log("api res: ", res);
          this.setState({
            myImg: res.url,
          });
        })
        .catch((err) => {
          alert("something went wrong");
          console.log("api error: ", err);
        });
    }
  };

  _toggleModal = (index) => {
    const { modals } = this.state;
    modals[index] = !modals[index];
    this.setState({
      modals,
    });
  };

  handleShare = () => {
    this.props.history.push("/profile-preview");
  };

  render() {
    const { selectChange, defaultChange } = this.state;
    const showButton = () => {
      if (this.state.myBtn !== null) {
        return this.state.myBtn.map((btn) => {
          return (
            <Fragment>
              {console.log("Buttons:", btn)}
              <Button
                className={
                  selectChange === "Moon"
                    ? "btnOrange btn btnMoon"
                    : selectChange === "Dark" || selectChange === "Scooter"
                    ? "btnOrange btn btnLight"
                    : selectChange === "Leaf"
                    ? "btnOrange btn btnLeaf"
                    : "btnOrange"
                }
              >
                {btn}
              </Button>
            </Fragment>
          );
        });
      }
    };

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
                      <Label className="btn uploadBtnProfile">
                        <input
                          type="file"
                          name="file"
                          placeholder="Upload an Image"
                          onChange={this._uploadImage()}
                        />
                        {this.state.myImg ? (
                          <div>
                            <p>
                              Image Url: <b>{this.state.myImg}</b>
                            </p>
                            <img
                              src={this.state.myImg}
                              width="100"
                              height="100"
                              alt="uploaded img"
                            />
                          </div>
                        ) : null}
                      </Label>
                    </div>
                  </CardBody>
                </Card>

                <Card className="userDetails mb-4">
                  <CardBody>
                    <h4 style={{ fontWeight: 600, marginBottom: 0 }}>Themes</h4>
                    <Row>
                      <Col md={6} lg={4}>
                        <Button
                          className="selectTheme themeSeleted"
                          onClick={() =>
                            this.setState({ selectChange: "Light" })
                          }
                        >
                          <div className="themeLight">
                            <div className="themeLightBtn"></div>
                            <div className="themeLightBtn"></div>
                            <div className="themeLightBtn"></div>
                          </div>
                        </Button>
                        <p className="themeName">Light</p>
                      </Col>
                      <Col md={6} lg={4}>
                        <Button
                          className="selectTheme"
                          onClick={() =>
                            this.setState({ selectChange: "Dark" })
                          }
                        >
                          <div className="themeDark">
                            <div className="themeDarkBtn"></div>
                            <div className="themeDarkBtn"></div>
                            <div className="themeDarkBtn"></div>
                          </div>
                        </Button>
                        <p className="themeName">Dark</p>
                      </Col>
                      <Col md={6} lg={4}>
                        <Button
                          className="selectTheme"
                          onClick={() =>
                            this.setState({ selectChange: "Scooter" })
                          }
                        >
                          <div className="themeScooter">
                            <div className="themeScooterBtn"></div>
                            <div className="themeScooterBtn"></div>
                            <div className="themeScooterBtn"></div>
                          </div>
                        </Button>
                        <p className="themeName">Scooter</p>
                      </Col>
                      <Col md={6} lg={4}>
                        <Button
                          className="selectTheme"
                          onClick={() =>
                            this.setState({ selectChange: "Leaf" })
                          }
                        >
                          <div className="themeLeaf">
                            <div className="themeLeafBtn"></div>
                            <div className="themeLeafBtn"></div>
                            <div className="themeLeafBtn"></div>
                          </div>
                        </Button>
                        <p className="themeName">Leaf</p>
                      </Col>
                      <Col md={6} lg={4}>
                        <Button
                          className="selectTheme"
                          onClick={() =>
                            this.setState({ selectChange: "Moon" })
                          }
                        >
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
                <Button className="shareProfileBtn" onClick={this.handleShare}>
                  Share
                </Button>
                <div
                  className={`profilePreview` + ` ` + `preview${selectChange}`}
                >
                  <div className="text-center">
                    <Label className="btn uploadBtnProfile">
                      <input type="file" style={{ display: "none" }} />
                      {this.props.userData.avatarLink ? (
                        <img
                          src={this.props.userData.avatarLink}
                          alt="chosen"
                          style={{ height: "100px", width: "100px" }}
                        />
                      ) : (
                        <img
                          alt=""
                          className=""
                          src={"assets/img/user-img-default.png"}
                        />
                      )}
                    </Label>
                    <h5
                      className={
                        selectChange === "Dark" || selectChange === "Scooter"
                          ? "text-white"
                          : "text-black"
                      }
                    >{`@${this.props.userData.userName}`}</h5>
                  </div>

                  <div className="mt-4">{showButton()}</div>
                </div>{" "}
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
    contentData: state.contentData,
    userData: state.userData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    picUpload: (avatarLink) => dispatch(picUpload(avatarLink)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Appearance);
