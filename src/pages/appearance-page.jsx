import React, { Component, Fragment } from "react";
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
import { uploadProfilePic, updatePic } from "../http/http-calls";
import { picUpload } from "../redux/action/user-data";
import { connect } from "react-redux";

class Appearance extends Component {
  state = {
    modals: [false, false],
    defaultChange: "Light",
    selectChange: "",
  };

  _uploadImage = (e) => {
    const file = e.target.files[0];
    const fd = new FormData();
    fd.append("file", file);
    uploadProfilePic(fd)
      .then((res) => {
        console.log("cloudinary res", res);
        if (!res.error) {
          const obj = {
            avatarLink: res.url,
          };
          updatePic(obj)
            .then((res) => {
              console.log("cloudinary res upload", res);
              if (!res.error) {
                this.props.picUpload(res.user.avatarLink);
              }
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  };

  _toggleModal = (index) => {
    const { modals } = this.state;
    modals[index] = !modals[index];
    this.setState({
      modals,
    });
  };

  render() {
    const { selectChange, defaultChange } = this.state;
    const showButton = () => {
      if (
        this.props.contentData.contents === undefined ||
        this.props.contentData.contents === null
      ) {
        console.log("page is empty while displaying");
      } else {
        // this.props.userContents(pageContents)
        return this.props.contentData.contents.map((data) => (
          <Fragment>
            <Button
              key={data.content._id}
              className={
                selectChange === "Moon"
                  ? "btnOrange btn btnMoon"
                  : selectChange === "Dark" || selectChange === "Scooter"
                  ? "btnOrange btn btnLight"
                  : selectChange === "Leaf"
                  ? "btnOrange btn btnLeaf"
                  : "btnOrange"
              }
              onClick={() => window.open(`${data.content.url}`, "_blank")}
            >
              {data.content.title}
            </Button>
          </Fragment>
        ));
      }
    };
    // 'btnOrange btn btnLeaf'
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
                          onChange={(e) => this._uploadImage(e)}
                        />
                        {/* <img
                          alt=''
                          className=''
                          src={"assets/img/user-img-default.png"}
                        /> */}
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
                <Button className="shareProfileBtn">Share</Button>
                {/* change the theme class name accordingly, default is previewLight */}
                <div
                  className={`profilePreview` + ` ` + `preview${selectChange}`}
                >
                  <div className="text-center">
                    <Label className="btn uploadBtnProfile">
                      <input type="file" style={{ display: "none" }} />
                      {/* <img
                        alt=''
                        className=''
                        src={"assets/img/user-img-default.png"}
                      /> */}
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
                    {/* use class text-white in Dark and Scooter theme*/}
                    {/* <h5 className='text-black'>{`@${this.props.userData.userName}`}</h5> */}
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
                {/* profilePreview */}
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
// import React, { Component } from "react";
// import {
//   Col,
//   Container,
//   Row,
//   Button,
//   Card,
//   CardBody,
//   CustomInput,
//   Label,
// } from "reactstrap";
// import { picUpload } from "../redux/action/user-data";
// import {updatePic} from '../http/http-calls'
// // import { useHistory } from "react-router";

// class Appearance extends Component {
//   // const [myImg, setMyImg] = useState("");
//   state = {
//     myImg: "",
//   };

//   // _toggleModal = (index) => {
//   //   const { modals } = this.state;
//   //   modals[index] = !modals[index];
//   //   this.setState({
//   //     modals,
//   //   });
//   // };

//   imgUpload = async (e) => {
//     const uploadFile = e.target.files[0];
//     const formData = new FormData();

//     formData.append("file", uploadFile);
//     // formData.append("upload_preset", "companyImages");

//     fetch("https://api.cloudinary.com/v1_1/djt6ve0ac/image/upload", {
//       method: "POST",
//       body: formData,
//     })
//       .then((res) => res.json())
//       .then((res) => {
//         console.log("api res: ", res);
//         this.setState({
//           myImg: res.url,
//         });
//         // setMyImg(res.url);
//       })
//       updatePic()
//       .catch((err) => {
//         alert("something went wrong");
//         console.log("api error: ", err);
//       });
//   };

//   Share = () => {
//     // const history = useHistory();
//     this.props.history.push("/profile-preview");
//   };

//   render() {
//     return (
//       <div className="app flex-row animated fadeIn innerPagesBg">
//         <Container>
//           <Row>
//             <Col md="12">
//               <div className="addedLinksWrapper">
//                 <div className="d-flex justify-content-start align-items-center my-3">
//                   <h4 className="pg-title">Appearance</h4>
//                 </div>

//                 <Card className="userDetails mb-4">
//                   <CardBody>
//                     <h4 style={{ fontWeight: 600, marginBottom: 0 }}>
//                       Profile
//                     </h4>
//                     <div className="text-center">
//                       {/* <Label className="btn uploadBtnProfile"> */}
//                       <input
//                         type="file"
//                         name="file"
//                         placeholder="Upload an Image"
//                         onChange={this.imgUpload}
//                       />
//                       {this.state.myImg ? (
//                         <div>
//                           <img
//                             src={this.state.myImg}
//                             width="100"
//                             height="100"
//                             alt="uploaded img"
//                           />
//                         </div>
//                       ) : null}
//                       {/* </Label> */}
//                     </div>
//                   </CardBody>
//                 </Card>

//                 <Card className="userDetails mb-4">
//                   <CardBody>
//                     <h4 style={{ fontWeight: 600, marginBottom: 0 }}>Themes</h4>
//                     <Row>
//                       <Col md={6} lg={4}>
//                         <Button className="selectTheme themeSeleted">
//                           <div className="themeLight">
//                             <div className="themeLightBtn"></div>
//                             <div className="themeLightBtn"></div>
//                             <div className="themeLightBtn"></div>
//                           </div>
//                         </Button>
//                         <p className="themeName">Light</p>
//                       </Col>
//                       <Col md={6} lg={4}>
//                         <Button className="selectTheme">
//                           <div className="themeDark">
//                             <div className="themeDarkBtn"></div>
//                             <div className="themeDarkBtn"></div>
//                             <div className="themeDarkBtn"></div>
//                           </div>
//                         </Button>
//                         <p className="themeName">Dark</p>
//                       </Col>
//                       <Col md={6} lg={4}>
//                         <Button className="selectTheme">
//                           <div className="themeScooter">
//                             <div className="themeScooterBtn"></div>
//                             <div className="themeScooterBtn"></div>
//                             <div className="themeScooterBtn"></div>
//                           </div>
//                         </Button>
//                         <p className="themeName">Scooter</p>
//                       </Col>
//                       <Col md={6} lg={4}>
//                         <Button className="selectTheme">
//                           <div className="themeLeaf">
//                             <div className="themeLeafBtn"></div>
//                             <div className="themeLeafBtn"></div>
//                             <div className="themeLeafBtn"></div>
//                           </div>
//                         </Button>
//                         <p className="themeName">Leaf</p>
//                       </Col>
//                       <Col md={6} lg={4}>
//                         <Button className="selectTheme">
//                           <div className="themeMoon">
//                             <div className="themeMoonBtn"></div>
//                             <div className="themeMoonBtn"></div>
//                             <div className="themeMoonBtn"></div>
//                           </div>
//                         </Button>
//                         <p className="themeName">Moon</p>
//                       </Col>
//                     </Row>
//                   </CardBody>
//                 </Card>
//               </div>

//               <div className="profilePreviewWrap">
//                 <Button className="shareProfileBtn" onClick={this.Share}>
//                   Share
//                 </Button>
//                 {/* change the theme class name accordingly, default is previewLight */}
//                 <div className="profilePreview previewLight">
//                   <div className="text-center">
//                     <Label className="btn uploadBtnProfile">
//                       <input type="file" style={{ display: "none" }} />
//                       <img
//                         alt=""
//                         className=""
//                         src={"assets/img/user-img-default.png"}
//                       />
//                     </Label>
//                     {/* use class text-white in Dark and Scooter theme*/}
//                     <h5 className="text-black">@johndoe</h5>
//                   </div>

//                   <div className="mt-4">
//                     {/* change the button class name accordingly */}
//                     <Button className="btnOrange">LinkedIn</Button>
//                     <Button className="btnOrange">Facebook</Button>
//                   </div>
//                 </div>{" "}
//                 {/* profilePreview */}
//               </div>
//             </Col>
//           </Row>
//         </Container>
//       </div>
//     );
//   }
// }

// export default Appearance;
