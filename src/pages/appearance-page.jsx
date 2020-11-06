import React, { Component, Fragment } from "react";
import {
  Col,
  Container,
  Row,
  Button,
  Card,
  CardBody,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { uploadProfilePic, updatePic, getUserData } from "../http/http-calls";
import { selectMyTheme, addUserAvatar } from "../redux/actions/user_data";
import { connect } from "react-redux";

class Appearance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modals: [false, false, false],
      myTheme: "",
    };
  }

  componentDidMount() {
    getUserData().then((res) => {
      //Getiing Default Theme Of The User
      console.log("My Theme:", res.user.template);
      this.setState({ myTheme: res.user.template });
    });
  }

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

  uploadImage = (e) => {
    const file = e.target.files[0];
    const fData = new FormData();
    fData.append("file", file);
    uploadProfilePic(fData)
      .then((res) => {
        console.log("Response:", res);
        if (!res.error) {
          const obj = {
            avatarLink: res.url,
          };
          updatePic(obj)
            .then((res) => {
              console.log("Response From backend:", res);
              if (!res.error) {
                this.props.addUserAvatar(res.user.avatarLink);
              }
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  };

  handleThemeChange = (theme) => {
    //To Be sent to request as Template contains theme selected
    const newTheme = {
      template: theme,
    };
    updatePic(newTheme)
      .then((response) => {
        console.log("Response on Theme Change:", response);
        if (!response.error) {
          this.props.selectMyTheme(response.user.template);
          this.setState({ myTheme: response.user.template });
        }
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { myTheme } = this.state;
    const showButton = () => {
      if (
        this.props.contentData.contents === undefined ||
        this.props.contentData.contents === null
      ) {
        console.log("Links Empty");
      } else {
        return this.props.contentData.contents.map((data) => {
          if (data.status) {
            return (
              <Fragment>
                <Button
                  key={data.content._id}
                  className={
                    myTheme === "Dark" || myTheme === "Scooter"
                      ? "btnOrange btnLight"
                      : myTheme === "Leaf"
                      ? "btnOrange btnLeaf"
                      : myTheme === "Moon"
                      ? "btnOrange btnMoon"
                      : "btnOrange"
                  }
                  onClick={() => window.open(`http://${data.content.url}`)}
                >
                  {data.content.title.toUpperCase()}
                </Button>
              </Fragment>
            );
          }
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
                          style={{ display: "none" }}
                          onChange={(e) => this.uploadImage(e)}
                        />
                        {this.props.userData.avatarLink ? (
                          <img
                            src={this.props.userData.avatarLink}
                            alt={`${this.props.userData.userName}/profile`}
                            style={{ height: "100px", width: "100px" }}
                          />
                        ) : (
                          <img
                            alt={`${this.props.userData.userName}/profile`}
                            className=""
                            src={"assets/img/user-img-default.png"}
                          />
                        )}
                        <i className="fa fa-pencil uploadIcon"></i>
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
                          onClick={() => this.setState({ myTheme: "Light" })}
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
                          className="selectTheme themeSeleted"
                          onClick={() => this.setState({ myTheme: "Dark" })}
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
                          className="selectTheme themeSeleted"
                          onClick={() => this.setState({ myTheme: "Scooter" })}
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
                          className="selectTheme themeSeleted"
                          onClick={() => this.setState({ myTheme: "Leaf" })}
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
                          className="selectTheme themeSeleted"
                          onClick={() => this.setState({ myTheme: "Moon" })}
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
                <div className={`profilePreview` + ` ` + `preview${myTheme}`}>
                  <div className="text-center">
                    <Label className="btn uploadBtnProfile">
                      <input type="file" style={{ display: "none" }} />
                      {this.props.userData.avatarLink ? (
                        <img
                          src={this.props.userData.avatarLink}
                          alt={`${this.props.userData.userName}/profile`}
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
                        myTheme === "Dark" || myTheme === "Scooter"
                          ? "text-white"
                          : "text-black"
                      }
                    >{`@${this.props.userData.userName}`}</h5>
                  </div>

                  <div className="mt-4">{showButton()}</div>
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
    contentData: state.contentData,
    userData: state.userData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addUserAvatar: (avatarLink) => dispatch(addUserAvatar(avatarLink)),
    selectMyTheme: (theme) => dispatch(selectMyTheme(theme)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Appearance);
