import React, { Component, Fragment } from "react";
import { Col, Container, Row, Button, Label, Card, CardBody } from "reactstrap";
import { connect } from "react-redux";
import {
  FacebookShareButton,
  FacebookMessengerShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  FacebookIcon,
  FacebookMessengerIcon,
  LinkedinIcon,
  TelegramIcon,
} from "react-share";

class ProfilePreview extends Component {
  render() {
    return (
      <div className="app flex-row animated fadeIn innerPagesBg">
        <Container>
          <Row className="justify-content-center">
            <Col md="10" xl="8">
              <div className="d-flex justify-content-start align-items-center my-3">
                <h4 className="pg-title">Profile</h4>
              </div>

              <Card className="userDetails mb-4">
                <CardBody>
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
                          alt={`${this.props.userData.userName}/profile`}
                          className=""
                          src={"assets/img/user-img-default.png"}
                        />
                      )}
                    </Label>
                    <h5>{`@${this.props.userData.userName}`}</h5>
                  </div>

                  <div className="mt-4">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <FacebookShareButton
                          url={
                            `${this.props.userData.url}` +
                            "/profile" +
                            "/" +
                            `${this.props.userData.userName}`
                          }
                          title="Facebook : "
                          className="Demo__some-network__share-button"
                        >
                          <FacebookIcon size={40} round />
                          <p style={{ margin: "0" }}>Facebook</p>
                        </FacebookShareButton>
                      </div>
                      <div>
                        <FacebookMessengerShareButton
                          url={
                            `${this.props.userData.url}` +
                            "/profile" +
                            "/" +
                            `${this.props.userData.userName}`
                          }
                          title="Messenger : "
                          className="Demo__some-network__share-button"
                        >
                          <FacebookMessengerIcon size={40} round />
                          <p style={{ margin: "0" }}>Messenger</p>
                        </FacebookMessengerShareButton>
                      </div>
                      <div>
                        <LinkedinShareButton
                          url={
                            `${this.props.userData.url}` +
                            "/profile" +
                            "/" +
                            `${this.props.userData.userName}`
                          }
                          title="Linkedin : "
                          className="Demo__some-network__share-button"
                        >
                          <LinkedinIcon size={40} round />
                          <p style={{ margin: "0" }}>Linkedin</p>
                        </LinkedinShareButton>
                      </div>
                      <div>
                        <TelegramShareButton
                          url={
                            `${this.props.userData.url}` +
                            "/profile" +
                            "/" +
                            `${this.props.userData.userName}`
                          }
                          title="Telegram : "
                          className="Demo__some-network__share-button"
                        >
                          <TelegramIcon size={40} round />
                          <p style={{ margin: "0" }}>Telegram</p>
                        </TelegramShareButton>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
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
export default connect(mapStateToProps)(ProfilePreview);
