import React, { Component, Fragment } from "react";
import { Col, Container, Row, Button, Label, Card, CardBody } from "reactstrap";
import { connect } from "react-redux";

class ProfilePreview extends Component {
  render() {
    const showButton = () => {
      if (
        this.props.contentData.contents === undefined ||
        this.props.contentData.contents === null
      ) {
        console.log("page is empty while displaying");
      } else {
        // this.props.userContents(pageContents)
        return this.props.contentData.contents.map((data) => {
          if (data.status) {
            return (
              <Fragment>
                <Button
                  key={data.content._id}
                  className='btnOrange'
                  onClick={() => window.open(`${data.content.url}`, "_blank")}>
                  {data.content.title}
                </Button>
              </Fragment>
            );
          }
        });
      }
    };

    return (
      <div className='app flex-row animated fadeIn innerPagesBg'>
        <Container>
          <Row className='justify-content-center'>
            <Col md='10' xl='8'>
              <div className='d-flex justify-content-start align-items-center my-3'>
                <h4 className='pg-title'>Profile</h4>
              </div>

              <Card className='userDetails mb-4'>
                <CardBody>
                  <div className='text-center'>
                    <Label className='btn uploadBtnProfile'>
                      <input type='file' style={{ display: "none" }} />
                      {/* <img
                        alt=''
                        className=''
                        src={"assets/img/user-img-default.png"}
                      /> */}
                      {this.props.contentData.avatarLink ? (
                        <img
                          src={this.props.contentData.avatarLink}
                          alt='chosen'
                          style={{ height: "100px", width: "100px" }}
                        />
                      ) : (
                        <img
                          alt=''
                          className=''
                          src={"assets/img/user-img-default.png"}
                        />
                      )}
                    </Label>
                    <h5>{`@${this.props.userData.userName}`}</h5>
                  </div>

                  <div className='mt-4'>{showButton()}</div>
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
// export default ProfilePreview;
