import React, { Component, Fragment } from "react";
import { Col, Container, Row, Button, Label, Card, CardBody } from "reactstrap";
import { connect } from "react-redux";

class ProfilePreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myTheme: "",
    };
  }

  componentDidMount() {
    console.log("My Selected Theme:", this.props.userData.template);
    this.setState({ myTheme: this.props.userData.template }, () => {
      console.log("After SetState:", this.state.myTheme);
    });
  }

  render() {
    const { myTheme } = this.state;
    const showButton = () => {
      if (!this.props.contentData.contents.length) {
        return (
          <Fragment>
            <Button
              className={
                myTheme === "Dark" || myTheme === "Scooter"
                  ? "btnOrange btnLight"
                  : myTheme === "Leaf"
                  ? "btnOrange btnLeaf"
                  : myTheme === "Moon"
                  ? "btnOrange btnMoon"
                  : "btnOrange"
              }
            >
              <strong>No Links To Display</strong>
            </Button>
          </Fragment>
        );
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
                  onClick={() => window.open(`${data.content.url}`, "_blank")}
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
          <Row className="justify-content-center">
            <Col md="10" xl="8">
              <div className="d-flex justify-content-start align-items-center my-3">
                <h4 className="pg-title">Profile</h4>
              </div>

              <Card className="userDetails mb-4">
                <CardBody className={`preview${myTheme}`}>
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
                        myTheme === "Dark" || myTheme === "Scooter"
                          ? "text-white"
                          : "text-black"
                      }
                    >{`@${this.props.userData.userName}`}</h5>
                  </div>

                  <div className="mt-4">{showButton()}</div>
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
// import React, { Component, Fragment } from "react";
// import { Col, Container, Row, Button, Label, Card, CardBody } from "reactstrap";
// import { connect } from "react-redux";

// class ProfilePreview extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       myTheme: "",
//     };
//   }
//   componentDidMount() {
//     console.log("My Theme is;", this.props.userData.template);
//     this.setState(
//       {
//         myTheme: this.props.userData.template,
//       },
//       () => {
//         console.log("After SetState:", this.state.myTheme);
//       }
//     );
//   }
//   render() {
//     const showButton = () => {
//       // const { template } = this.props.userData;
//       const { myTheme } = this.state;
//       // if (this.state.myTheme === "") {
//       //   this.setState({ myTheme: template });
//       // }
//       // console.log("Testing", myTheme);
//       if (
//         this.props.contentData.contents === undefined ||
//         this.props.contentData.contents === null
//       ) {
//         return (
//           <Fragment>
//             <Button
//               key={this.props.contentData.content._id}
//               className={
//                 myTheme === "Dark" || myTheme === "Scooter"
//                   ? "btnOrange btnLight"
//                   : myTheme === "Leaf"
//                   ? "btnOrange btnLeaf"
//                   : myTheme === "Moon"
//                   ? "btnOrange btnMoon"
//                   : "btnOrange"
//               }
//             >
//               <strong>Links Empty</strong>
//             </Button>
//           </Fragment>
//         );
//       } else {
//         return this.props.contentData.contents.map((data) => {
//           if (data.status) {
//             console.log("My Fucking Theme:", myTheme);
//             return (
//               <Fragment>
//                 <Button
//                   key={data.content._id}
//                   className={
//                     myTheme === "Dark" || myTheme === "Scooter"
//                       ? "btnOrange btnLight"
//                       : myTheme === "Leaf"
//                       ? "btnOrange btnLeaf"
//                       : myTheme === "Moon"
//                       ? "btnOrange btnMoon"
//                       : "btnOrange"
//                   }
//                   onClick={() => window.open(`http://${data.content.url}`)}
//                 >
//                   {data.content.title.toUpperCase()}
//                 </Button>
//               </Fragment>
//             );
//           }
//         });
//       }
//     };

//     return (
//       <div className="app flex-row animated fadeIn innerPagesBg">
//         <Container>
//           <Row className="justify-content-center">
//             <Col md="10" xl="8">
//               <div className="d-flex justify-content-start align-items-center my-3">
//                 <h4 className="pg-title">Profile</h4>
//               </div>

//               <Card className="userDetails mb-4">
//                 <CardBody>
//                   <div className="text-center">
//                     <Label className="btn uploadBtnProfile">
//                       <input type="file" style={{ display: "none" }} />
//                       {this.props.userData.avatarLink ? (
//                         <img
//                           src={this.props.userData.avatarLink}
//                           alt={`${this.props.userData.userName}/profile`}
//                           style={{ height: "100px", width: "100px" }}
//                         />
//                       ) : (
//                         <img
//                           alt={`${this.props.userData.userName}/profile`}
//                           className=""
//                           src={"assets/img/user-img-default.png"}
//                         />
//                       )}
//                     </Label>
//                     <h5>{`@${this.props.userData.userName}`}</h5>
//                     <div className="mt-4">{showButton()}</div>
//                   </div>
//                 </CardBody>
//               </Card>
//             </Col>
//           </Row>
//         </Container>
//       </div>
//     );
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     contentData: state.contentData,
//     userData: state.userData,
//   };
// };
// export default connect(mapStateToProps)(ProfilePreview);
