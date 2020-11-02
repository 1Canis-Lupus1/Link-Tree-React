import React, { Component, Fragment } from "react";

import {
  Col,
  Container,
  Row,
  Button,
  Card,
  CardBody,
  CustomInput,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
  Form,
} from "reactstrap";
import { getPages, createEntry, initialEntry } from "../http/http-calls";
import { connect } from "react-redux";
import {
  addEntry,
  editEntry,
  addId,
  deleteEntry,
} from "../redux/action/content-data";
// import { create } from "core-js/fn/object";

class Links extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modals: [false, false],
      myLinks: {
        url: "",
        title: "",
      },
      isTrue: {
        url: "",
        title: "",
      },
      _id: "",
      _links: [],
      linksNotPresent: false,
      errors: {},
      username: "",
      modalClick: "",
      myBtn: [],
      deleteCurrEntry: "",
      addFlag: false,
      editFlag: false,
      editCurrEntry: "",
    };
  }

  _toggleModal = (index) => {
    const { modals } = this.state;
    modals[index] = !modals[index];
    this.setState({
      modals,
    });
  };

  //On Initial reder checking the page contents and setting state accordingly(Check values in console)
  componentDidMount() {
    //Fetching Current Added Links for user
    getPages().then((response) => {
      if (response.page === null) {
        this.setState({ linksNotPresent: true });
      } else {
        //Adding Current state value to the links
        this.setState({
          _links: response.page.contents,
          _id: response.page._id,
        });
        console.log("Links From /page:", response);
      }
    });
  }

  handleAddEntry = () => {
    // If no links present in state
    let isTrue = {
      url: true,
      title: true,
    };
    this.setState({ isTrue }, () => {
      let errors = this.validation();
      console.log("ERRORS", errors);
      if (!errors) {
        if (this.state.linksNotPresent) {
          const initialLink = [...this.state._links];
          const linkEntry = {
            //To be sent as parameter to /page
            contents: [
              ...initialLink,
              {
                content: {
                  title: this.state.myLinks.title.toUpperCase(),
                  url: this.state.myLinks.url,
                },
                contentType: "socialLink",
                subContentType: "facebook",
              },
            ],
          };
          //Post request to /page
          initialEntry(linkEntry).then((response) => {
            console.log("Response from /page", response);
            //If Error is false
            if (!response.error) {
              this.setState({
                ...this.state._links,
                _links: response.page.contents,
              });
            }
            console.log("My links:", this.state._links);
            this.state._links.map((entry) => {
              this.setState({
                myBtn: [...this.state.myBtn, entry.content.title.toUpperCase()],
              });
              const myNewBtn = JSON.stringify(this.state.myBtn);
              localStorage.setItem("button", myNewBtn);
            });
            this.setState({
              myLinks: {
                url: "",
                title: "",
              },
            });
          });
          //Reload the page for displaying initial entry link
          window.location.reload(true);
        } else {
          //If links present
          const newLinkEntry = [...this.state._links];
          // To be sent as parameters to  /page/${id}
          const linkEntry = [
            ...newLinkEntry,
            {
              content: {
                title: this.state.myLinks.title,
                url: this.state.myLinks.url,
              },
              contentType: "socialLink",
              subContentType: "facebook",
            },
          ];
          //cretaing an object to send parameters
          const valList = {
            contents: linkEntry,
          };
          //entryData and entryId to createEntry
          createEntry(valList, this.state._id).then((response) => {
            //currentEntry has the last entry which is to be pushed to the _links array
            console.log("Creating Entry Reponse:", response.page);
            const currentEntry =
              response.page.contents[response.page.contents.length - 1];
            this.setState({
              _links: response.page.contents,
            });
            console.log("My Links:", this.state._links);
            this.state._links.map((entry) => {
              console.log("Entry::", entry.content.title);
              // console.log("My Btn", this.state.myBtn);
              this.setState({
                // ...this.state.myBtn,
                myBtn: [...this.state.myBtn, entry.content.title.toUpperCase()],
              });
              console.log("My btn:", this.state.myBtn);
              const myNewBtn = JSON.stringify(this.state.myBtn);
              localStorage.setItem("button", myNewBtn);
            });
            // console.log("Checking state:::", this.state.myBtn);
            this.setState({
              myLinks: {
                url: "",
                title: "",
              },
            });
          });
        }
      }
    });
    //Close the modal after entering link
    this._toggleModal(1);
  };

  handleChange = (name, value) => {
    const { myLinks, isTrue } = this.state;
    //If Value is "number"
    if (!value && typeof value === "number") {
      myLinks[name] = value;
      isTrue[name] = true;
      this.setState({ myLinks, isTrue }, () => {
        this.validation();
        console.log("After setState on User Entry:", myLinks);
      });
      return;
    } else {
      myLinks[name] = value;
    }
    isTrue[name] = true;
    this.setState({ myLinks, isTrue }, () => {
      this.validation();
      console.log("After setState on User Entry:", this.state);
    });
  };

  validation() {
    const { myLinks, isTrue, errors } = this.state;
    Object.keys(myLinks).forEach((link) => {
      if (link === "title" && isTrue.title) {
        if (!myLinks.title.trim().length) {
          errors[link] = "*Field cannot be empty";
        } else {
          delete errors[link];
          isTrue.title = false;
        }
      } else if (link === "url" && isTrue.url) {
        if (!myLinks.url.trim().length) {
          errors[link] = "*Field cannot be empty";
        } else if (
          myLinks.url.trim().length &&
          !new RegExp(
            "(https?:\\//\\//(?:www\\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}|www\\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}|https?:\\//\\//(?:www\\.|(?!www))[a-zA-Z0-9]+\\.[^\\s]{2,}|www\\.[a-zA-Z0-9]+\\.[^\\s]{2,})"
          ).test(myLinks.url)
        ) {
          errors.url = "Invalid URL";
        } else {
          delete errors[link];
          isTrue.url = false;
        }
      }
    });
    this.setState({ errors });
    return Object.keys(errors).length ? errors : null;
  }

  handleToggle = (flag, id) => {
    const { _links, _id } = this.state;
    if (flag) {
      _links.map((e) => {
        if (id === e._id) {
          e.status = true;
        }
        //setstate and APi
        this.setState({ _links });
        const obj = {
          contents: _links,
        };
        console.log("Contents:", obj.contents);
        createEntry(obj, _id).then((res) => {
          console.log("createContentLst: ", res);
          const lastContent = res.page.contents[res.page.contents.length - 1];
          console.log("newAddedContent:", lastContent);
          // this.props.addContent(content);
          this.setState({ _links: res.page.contents });
          console.log("added data list: ", _links);
        });
      });
    } else {
      _links.map((e) => {
        if (id === e._id) {
          e.status = false;
        }
        //setstate and APi
        this.setState({ _links });
        const obj = {
          contents: _links,
        };
        console.log("Contents:", obj.contents);
        initialEntry(obj, _id).then((res) => {
          console.log("createContentLst: ", res);
          const lastContent = res.page.contents[res.page.contents.length - 1];
          console.log("newAddedContent:", lastContent);
          // this.props.addContent(content);
          this.setState({ _links: res.page.contents });
          console.log("added data list: ", _links);
        });
      });
    }
    console.log(_links);
  };

  render() {
    //Destructuring state values
    const {
      _links,
      _id,
      errors,
      deleteCurrEntry,
      addFlag,
      editCurrEntry,
      myLinks,
    } = this.state;
    const cardBodyData = () => {
      console.log("MY LINKS:", _links);
      if (_links === undefined || _links === null) {
        //|| _links[0].content.title===null || _links[0].content.url===null || _links[0].content.title===undefined || _links[0].content.url===undefined
        console.log("page is empty while displaying");
      } else {
        return _links.map((data) => (
          <Fragment>
            {console.log("MY DATA", data)}
            <div className="addedLinksWrap">
              <div className="moveLink">
                <i className="fa fa-ellipsis-v"></i>
              </div>
              <div className="addedLinkDetails">
                <h5>{data.content.title}</h5>
                <p>{data.content.url}</p>
                <div className="actionBtnWrap">
                  <CustomInput
                    type="switch"
                    id={"exampleCustomSwitch" + data._id}
                    name="customSwitch"
                    label=""
                    checked={data.status}
                    className="disableLink"
                    key={data._id}
                    onClick={(e) =>
                      this.handleToggle(e.target.checked, data._id)
                    }
                  />

                  <Button
                    className="delLinkBtn"
                    onClick={() => {
                      this.setState({
                        editCurrEntry: data._id,
                        editFlag: true,
                      });
                      this._toggleModal(1);
                    }}
                  >
                    <i className="fa fa-pencil"></i>
                  </Button>
                  <Button
                    className="delLinkBtn"
                    onClick={() => {
                      this._toggleModal(2);
                    }}
                    // onClick={deleteModal()}
                  >
                    <i className="fa fa-trash-o text-danger"></i>
                  </Button>
                </div>
              </div>
            </div>
          </Fragment>
        ));
      }
    };
    const showButton = () => {
      if (_links === undefined || _links === null) {
        console.log("page is empty while displaying");
      } else {
        return _links.map((data) => (
          <Fragment>
            <Button
              key={data.content._id}
              className="btnOrange"
              onClick={() => window.open(`${data.content.url}`, "_blank")}
            >
              {data.content.title}
            </Button>
          </Fragment>
        ));
      }
    };
    const deleteModal = (e) => {
      console.log("handleDelete");
      if (e.target.name === "del") {
        // createEntry();
        this._toggleModal(2);
        this.state._links.map((entry) => {
          this.setState({ modalClick: entry._id });
          if (this.state._links) {
            let delId = this.state._links.findIndex((entry) => {
              return entry._id === this.state.modalClick;
            });
            this.state._links.splice(delId, 1);
            const newVal = {
              contents: this.state._links,
            };
            createEntry(newVal, this.state._id).then((response) => {
              console.log("New List After Deleting:", response);
            });
          }
        });
      }
    };

    const editModal = () => {
      var index = _links.findIndex((item) => item._id === deleteCurrEntry);
      console.log(index);
      const editedContent = {
        content: {
          title: myLinks.title,
          url: myLinks.url,
        },
        contentType: "socialLink",
        subContentType: "facebook",
      };
      _links.splice(index, 1, editedContent);
      console.log(_links);
      const obj = {
        contents: _links,
      };
      createEntry(obj, _id).then((res) => {
        console.log("createContentLst: ", res);
        const lastContent = res.page.contents[res.page.contents.length - 1];
        console.log("newAddedContent:", lastContent);
        // this.props.addContent(content);
        this.setState({ _links: res.page.contents });
        console.log("added data list: ", _links);
      });
      this.setState({
        myLinks: {
          title: "",
          url: "",
        },
        editFlag: false,
      });
    };

    return (
      <div className="app flex-row animated fadeIn innerPagesBg">
        <Container>
          <Row>
            <Col md="12">
              <div className="addedLinksWrapper">
                <div className="d-flex justify-content-between align-items-center my-3">
                  <h4 className="pg-title">Links</h4>

                  <Button
                    className="addBtn"
                    onClick={() => {
                      this.setState({ addFlag: true });
                      this._toggleModal(1);
                    }}
                  >
                    <i className="fa fa-plus mr-1"></i> Add New Link
                  </Button>
                </div>

                <Card className="userDetails mb-4">
                  <CardBody>
                    {this.state.findPageNull ? (
                      <Fragment>NO LINKS AVAILABLE</Fragment>
                    ) : (
                      cardBodyData()
                    )}
                  </CardBody>
                </Card>
              </div>

              <div className="profilePreviewWrap">
                <Button className="shareProfileBtn">Share</Button>
                <div className="profilePreview">
                  <div className="text-center">
                    <Label className="btn uploadBtnProfile">
                      <input type="file" style={{ display: "none" }} />
                      <img
                        alt=""
                        className=""
                        src={"assets/img/user-img-default.png"}
                      />
                    </Label>
                    <h5>{`@${this.props.userData.userName}`}</h5>
                  </div>

                  <div className="mt-4">{showButton()}</div>
                </div>{" "}
                {/* profilePreview */}
              </div>
            </Col>
          </Row>

          {/* Modal for showing "Create New Link" */}
          <Modal
            isOpen={this.state.modals[1]}
            toggle={() => this._toggleModal(1)}
            className="modal-dialog-centered"
          >
            <ModalHeader toggle={() => this._toggleModal(1)}>
              Add New Link
            </ModalHeader>
            <ModalBody className="modalContent">
              <FormGroup>
                <Label>Title</Label>
                <Input
                  type="text"
                  placeholder="Enter Title"
                  value={this.state.myLinks.title}
                  onChange={(e) => this.handleChange("title", e.target.value)}
                />
                {errors && (
                  <Fragment>
                    <small className="d-flex" style={{ color: "red" }}>
                      {errors.title}
                    </small>
                  </Fragment>
                )}
              </FormGroup>
              <FormGroup>
                <Label>URL</Label>
                <Input
                  type="text"
                  placeholder="Enter URL"
                  value={this.state.myLinks.url}
                  onChange={(e) => this.handleChange("url", e.target.value)}
                />
                {errors && (
                  <Fragment>
                    <small className="d-flex" style={{ color: "red" }}>
                      {errors.url}
                    </small>
                  </Fragment>
                )}
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button
                className="modalBtnCancel"
                toggle={() => this._toggleModal(1)}
                onClick={() => this._toggleModal(1)}
              >
                Cancel
              </Button>
              <Button
                className="modalBtnSave"
                toggle={() => this._toggleModal(1)}
                onClick={() => {
                  addFlag ? this.handleAddEntry() : editModal();
                }}
              >
                Create
              </Button>
            </ModalFooter>
          </Modal>

          {/* Modal for deleting an exisiting Link */}
          <Modal
            isOpen={this.state.modals[2]}
            toggle={() => this._toggleModal(2)}
            className="modal-dialog-centered"
          >
            <ModalHeader toggle={() => this._toggleModal(2)}>
              Delete Link
            </ModalHeader>
            <ModalBody className="modalContent text-center">
              <h5 className="mt-3 px-4" style={{ fontWeight: 400 }}>
                Are you sure you want to delete this Link? This cannot be
                undone.
              </h5>
            </ModalBody>
            <ModalFooter>
              <Button
                className="modalBtnCancel"
                toggle={() => this._toggleModal(2)}
              >
                Cancel
              </Button>
              <Button
                className="modalBtnSave"
                name="del"
                toggle={() => this._toggleModal(2)}
                onClick={(e) => deleteModal(e)}
              >
                Delete
              </Button>
            </ModalFooter>
          </Modal>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    myLinks: state.myLinks,
    userData: state.userData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addEntry: (content) => dispatch(addEntry(content)),
    deleteEntry: (_id) => dispatch(deleteEntry(_id)),
    editEntry: (content) => dispatch(editEntry(content)),
    addId: (_id) => dispatch(addId(_id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Links);
// export default Links;

// import React, { Component } from "react";
// import {
//   Col,
//   Container,
//   Row,
//   Button,
//   Card,
//   CardBody,
//   CustomInput,
//   Modal,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
//   FormGroup,
//   Label,
//   Input,
//   Form,
// } from "reactstrap";
// import { getPages, createEntry, initialEntry } from "../http/http-calls";
// import { connect } from "react-redux";
// import {
//   addEntry,
//   editEntry,
//   addId,
//   deleteEntry,
// } from "../redux/action/content-data";
// // import { create } from "core-js/fn/object";

// class Links extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       modals: [false, false],
//       myLinks: {
//         url: "",
//         title: "",
//       },
//       isTrue: {
//         url: "",
//         title: "",
//       },
//       _id: "",
//       _links: [],
//       linksNotPresent: false,
//       errors: {},
//       username: "",
//       modalClick: "",
//       myBtn: [],
//     };
//   }

//   _toggleModal = (index, e) => {
//     const { modals } = this.state;
//     modals[index] = !modals[index];
//     this.setState({
//       modals,
//     });
//   };

//   //On Initial reder checking the page contents and setting state accordingly(Check values in console)
//   componentWillMount() {
//     getPages().then((response) => {
//       console.log("Response in Links Page:", response);
//       //Conditions for contents in response "page"
//       if (response.page === null || response.page === undefined) {
//         console.log("In links-page: No Links found for the current user!!");
//         //Setting state value to true as response page is null or undefined
//         this.setState({ linksNotPresent: true });
//       }
//       //if response page not null add the response to the state
//       else {
//         // const _linksList = [];
//         // response.page.contents.map((entry) => {
//         //   console.log("Entries from response:", entry.content.title);
//         //   _linksList.push(entry.content.title);
//         // });
//         this.setState({
//           _id: response.page._id,
//           _links: response.page.contents,
//         });
//         console.log(
//           `The Links Contained by the User: ID:${
//             this.state._id
//           } LINK:${this.state._links.map((item) => item.content.url)}`
//         );
//         // console.log("Links in State:", this.state._links);
//         this.setState({
//           username: localStorage.getItem("username"),
//         });
//         console.log("UNAME", this.state.username);
//       }
//     });
//   }

//   handleAddEntry = () => {
//     //If no links present in state
//     let isTrue = {
//       url: true,
//       title: true,
//     };
//     this.setState({ isTrue }, () => {
//       let errors = this.validation();
//       console.log("ERROR WARINGS", errors);
//       if (!errors) {
//         if (this.state.linksNotPresent) {
//           const initialLink = [...this.state._links];
//           const linkEntry = {
//             //To be sent as parameter to /page
//             contents: [
//               // ...initialLink,
//               {
//                 content: {
//                   title: this.state.myLinks.title,
//                   url: this.state.myLinks.url,
//                 },
//                 contentType: "socialLink",
//                 subContentType: "facebook",
//               },
//             ],
//           };
//           //Post request to /page
//           initialEntry(linkEntry).then((response) => {
//             console.log("Response from /page", response);
//             //If Error is false
//             if (!response.error) {
//               this.setState({
//                 ...this.state._links,
//                 _links: response.page.contents,
//               });
//             }
//             console.log("My links:", this.state._links);
//             this.state._links.map((entry) => {
//               this.setState({
//                 myBtn: [...this.state.myBtn, entry.content.title.toUpperCase()],
//               });
//               const myNewBtn = JSON.stringify(this.state.myBtn);
//               localStorage.setItem("button", myNewBtn);
//             });
//             this.setState({
//               myLinks: {
//                 url: "",
//                 title: "",
//               },
//             });
//           });
//           //Reload the page for displaying initial entry link
//           window.location.reload(true);
//         } else {
//           //If links present
//           const newLinkEntry = [...this.state._links];
//           // To be sent as parameters to  /page/${id}
//           const linkEntry = [
//             ...newLinkEntry,
//             {
//               content: {
//                 title: this.state.myLinks.title,
//                 url: this.state.myLinks.url,
//               },
//               contentType: "socialLink",
//               subContentType: "facebook",
//             },
//           ];
//           //cretaing an object to send parameters
//           const valList = {
//             contents: linkEntry,
//           };
//           //entryData and entryId to createEntry
//           createEntry(valList, this.state._id).then((response) => {
//             //currentEntry has the last entry which is to be pushed to the _links array
//             console.log("Creating Entry Reponse:", response.page);
//             const currentEntry =
//               response.page.contents[response.page.contents.length - 1];
//             this.setState({
//               _links: response.page.contents,
//             });
//             console.log("My Links:", this.state._links);
//             this.state._links.map((entry) => {
//               console.log("Entry::", entry.content.title);
//               // console.log("My Btn", this.state.myBtn);
//               this.setState({
//                 // ...this.state.myBtn,
//                 myBtn: [...this.state.myBtn, entry.content.title.toUpperCase()],
//               });
//               console.log("My btn:", this.state.myBtn);
//               const myNewBtn = JSON.stringify(this.state.myBtn);
//               localStorage.setItem("button", myNewBtn);
//             });
//             // console.log("Checking state:::", this.state.myBtn);
//             this.setState({
//               myLinks: {
//                 url: "",
//                 title: "",
//               },
//             });
//           });
//         }
//       }
//     });
//     //
//     //Close the modal after entering link
//     this._toggleModal(1);
//   };

//   handleChange = (name, value) => {
//     // console.log(name,value);
//     const { myLinks, isTrue } = this.state;
//     myLinks[name] = value;
//     console.log("After setState on User Entry:", myLinks);
//     isTrue[name] = true;
//     this.setState({ myLinks, isTrue }, () => {
//       this.validation();
//     });
//     return;
//   };

//   validation = () => {
//     const { myLinks, isTrue, errors } = this.state;
//     Object.keys(myLinks).forEach((link) => {
//       if (link === "title" && isTrue.title) {
//         if (!myLinks.title.trim().length) {
//           errors[link] = "*Field cannot be empty";
//         } else {
//           delete errors[link];
//           isTrue.title = false;
//         }
//       } else if (link === "url" && isTrue.url) {
//         if (!myLinks.url.trim().length) {
//           errors[link] = "*Field cannot be empty";
//         } else if (
//           myLinks.url.trim().length &&
//           !new RegExp(
//             "(https?:\\//\\//(?:www\\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}|www\\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}|https?:\\//\\//(?:www\\.|(?!www))[a-zA-Z0-9]+\\.[^\\s]{2,}|www\\.[a-zA-Z0-9]+\\.[^\\s]{2,})"
//           ).test(myLinks.url)
//         ) {
//           errors.url = "Invalid URL";
//         } else {
//           delete errors[link];
//           isTrue.url = false;
//         }
//       }
//     });
//     this.setState({ errors });
//     return Object.keys(errors).length ? errors : null;
//   };

//   handleDelete = (e) => {
//     console.log("handleDelete");
//     if (e.target.name === "del") {
//       // createEntry();
//       this._toggleModal(2);
//       this.state._links.map((entry) => {
//         this.setState({ modalClick: entry._id });
//         if (this.state._links) {
//           let delId = this.state._links.findIndex((entry) => {
//             return entry._id === this.state.modalClick;
//           });
//           this.state._links.splice(delId, 1);
//           const newVal = {
//             contents: this.state._links,
//           };
//           createEntry(newVal, this.state._id).then((response) => {
//             console.log("New List After Deleting:", response);
//           });
//         }
//       });
//     }
//   };

//   handleEdit = (e) => {
//     console.log("Editing", e.target);
//     this._toggleModal(1);
//   };

//   handleSubmit = (e) => {
//     console.log("Submitting");
//     e.preventDefault(e);
//     let isTrue = {
//       url: true,
//       title: true,
//     };
//     this.setState({ isTrue }, () => {
//       let errors = this.validation();
//       if (!errors) {
//         console.log("Links On Submit:", this.state.myLinks);
//       }
//     });
//   };

//   handleToggle = (flag, id) => {
//     console.log("Toggling");
//     console.log("My links:", flag, id);
//     const { _links, _id } = this.state;
//     if (flag) {
//       _links.map((e) => {
//         console.log("My links in true:", e.status, e._id);
//         if (id === e._id) {
//           e.status = false;
//         }
//         this.setState({ _links });
//         const obj = {
//           contents: _links,
//         };
//         console.log("FINAL LINKS:", obj.contents);
//         //   createEntry(obj, _id).then((res) => {
//         //     const lastContent = res.page.contents[res.page.contents.length - 1];
//         //     console.log("New Content:", lastContent);
//         //   });

//         //   console.log("My Links are now:", _links);
//       });
//     } else {
//       _links.map((e) => {
//         console.log("My links in false:", e.status, e._id);
//         if (id === e._id) {
//           e.status = true;
//         }
//         this.setState({ _links });
//         const obj = {
//           contents: _links,
//         };
//         console.log("FINAL LINKS:", obj.contents);
//         //   createEntry(obj, _id).then((res) => {
//         //     const lastContent = res.page.contents[res.page.contents.length - 1];
//         //     console.log("New Content:", lastContent);
//         //   });

//         //   console.log("My links are now:", _links);
//       });
//     }
//     // const { _links, _id } = this.state;
//     // if (flag) {
//     // _links.map((e) => {
//     //   console.log("My Entry:", e);
//     // });
//     //   _links.map((e) => {
//     //     if (id === e._id) {
//     //       e.status = true;
//     //     }
//     //     //setstate and APi
//     //     this.setState({ _links });
//     //     const obj = {
//     //       contents: _links,
//     //     };
//     //     createEntry(obj, id).then((res) => {
//     //       console.log("createContentLst: ", res);
//     //       const lastContent = res.page.contents[res.page.contents.length - 1];
//     //       console.log("newAddedContent:", lastContent);
//     //       // this.props.addContent(content);
//     //       this.setState({ pageContent_links: res.page.contents });
//     //       console.log("added data list: ", _links);
//     //     });
//     //   });
//     // } else {
//     //   _links.map((e) => {
//     //     if (id === e._id) {
//     //       e.status = false;
//     //     }
//     //     //setstate and APi
//     //     this.setState({ _links });
//     //     const obj = {
//     //       contents: _links,
//     //     };
//     //     createEntry(obj, _id).then((res) => {
//     //       console.log("createContentLst: ", res);
//     //       const lastContent = res.page.contents[res.page.contents.length - 1];
//     //       console.log("newAddedContent:", lastContent);
//     //       // this.props.addContent(content);
//     //       this.setState({ _links: res.page.contents });
//     //       console.log("added data list: ", _links);
//     //     });
//     //   });
//     // }
//     // console.log(_links);
//   };

//   render() {
//     // console.log("In Render:", this.state._links);

//     //Deleting Links
//     const deleteEntry = () => {
//       if (this.state._links) {
//         let delId = this.state._links.findIndex((entry) => {
//           return entry._id === this.state.modalClick;
//         });
//         this.state._links.splice(delId, 1);
//         const newVal = {
//           contents: this.state._links,
//         };
//         createEntry(newVal, this.state._id).then((response) => {
//           console.log("New List After Deleting:", response);
//         });
//       }
//     };

//     //Adding Links
//     const addedLinks = () => {
//       return (
//         <>
//           {/* {console.log("MY LINKS ARE:", this.state._links)} */}
//           {this.state._links.map((entry) => {
//             {
//               // console.log("Each ENTRY:", entry);
//               return (
//                 <>
//                   <div className="addedLinksWrap">
//                     <div className="moveLink">
//                       <i className="fa fa-ellipsis-v"></i>
//                     </div>
//                     <div className="addedLinksDetails">
//                       <h5>&nbsp;{entry.content.title.toUpperCase()}</h5>
//                       <p>&nbsp;{entry.content.url}</p>
//                       <div className="actionBtnWrap">
//                         &nbsp;
//                         <CustomInput
//                           type="switch"
//                           id={"exampleCustomSwitch" + entry._id}
//                           name="customSwitch"
//                           label=""
//                           checked={entry.status}
//                           className="disableLink"
//                           key={entry._id}
//                           onClick={(e) =>
//                             this.handleToggle(e.target.checked, entry._id)
//                           }
//                         />
//                         <Button
//                           className="delLinkBtn"
//                           // onClick={() => this._toggleModal(1)}
//                           onClick={(e) => this.handleEdit(e)}
//                         >
//                           <i className="fa fa-pencil"></i>
//                         </Button>
//                         <Button
//                           className="delLinkBtn"
//                           name="del"
//                           onClick={(e) => {
//                             this._toggleModal(2);
//                           }}
//                         >
//                           <i className="fa fa-trash-o text-danger"></i>
//                         </Button>
//                       </div>
//                     </div>
//                   </div>
//                 </>
//               );
//             }
//           })}
//           {/* {this.state._links.map((entry) => {
//               console.log("Inside Else of Render:", entry); */}
//           {/* <div className="addedLinksWrap">
//                 <div className="moveLink">
//                   <i className="fa fa-ellipsis-v"></i>
//                 </div>
//                 <div className="addedLinksDetails">
//                   <h4>SOME VALUE</h4>
//                 </div>
//                 <CustomInput
//                   type="switch"
//                   id="exampleCustomSwitch"
//                   name="customSwitch"
//                   label=""
//                   checked
//                   className="disableLink"
//                 />
//                 <Button className="delLinkBtn">
//                   <i className="fa fa-pencil"></i>
//                 </Button>
//                 <Button className="delLinkBtn">
//                   <i className="fa fa-trash-o text-danger"></i>
//                 </Button>
//               </div> */}
//           {/*  }
//             })} */}
//         </>
//       );
//     };

//     // const handleUser = () => {
//     //   return <strong>{getUser()}</strong>;
//     // };

//     const handleLinks = () => {
//       // console.log("Handle Links.", this.state._links);
//       return (
//         <>
//           {this.state._links.map((item, index) => {
//             return (
//               <>
//                 <Button className="btnOrange">
//                   <strong>{item.content.title.toUpperCase()}</strong>
//                   <br />
//                 </Button>
//               </>
//             );
//           })}
//         </>
//       );
//       //   return(<>
//       //     {this.state._links.map((item) => {
//       //       console.log("Handle Links Preview", item.content.title);
//       //       //Not being rendered in the preview section
//       //       return (
//       //         <>
//       //           <strong>Something</strong>
//       //           <strong>{item.content.title}</strong>
//       //         </>
//       //       );
//       //     });
//       //     </>
//       // })
//     };

//     // const delLink = (e) => {
//     //   console.log("Delete");
//     // };

//     return (
//       <div className="app flex-row animated fadeIn innerPagesBg">
//         <Container>
//           <Row>
//             <Col md="12">
//               <div className="addedLinksWrapper">
//                 <div className="d-flex justify-content-between align-items-center my-3">
//                   <h4 className="pg-title">Links</h4>

//                   <Button
//                     className="addBtn"
//                     onClick={() => this._toggleModal(1)}
//                   >
//                     <i className="fa fa-plus mr-1"></i> Add New Link
//                   </Button>
//                 </div>

//                 <Card className="userDetails mb-4">
//                   <CardBody>
//                     {!this.state._links.length ? (
//                       <>LINKS EMPTY FOR CURRENT USER</>
//                     ) : (
//                       addedLinks()
//                     )}
//                   </CardBody>
//                 </Card>
//               </div>

//               <div className="profilePreviewWrap">
//                 <Button
//                   className="shareProfileBtn"
//                   onClick={() => {
//                     this.props.history.push("/profile-preview");
//                   }}
//                 >
//                   Share
//                 </Button>
//                 <div className="profilePreview">
//                   <div className="text-center">
//                     <Label className="btn uploadBtnProfile">
//                       <input type="file" style={{ display: "none" }} />
//                       <img
//                         alt=""
//                         className=""
//                         src={"assets/img/user-img-default.png"}
//                       />
//                     </Label>

//                     <h5>@{this.state.username}</h5>
//                   </div>

//                   <div className="mt-4">
//                     {!this.state._links.length ? (
//                       <Button className="btnOrange">
//                         <strong>LINKS EMPTY</strong>
//                       </Button>
//                     ) : (
//                       <strong>{handleLinks()}</strong>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </Col>
//           </Row>

//           {/* Modal for showing "Create New Link" */}
//           <Modal
//             isOpen={this.state.modals[1]}
//             toggle={() => this._toggleModal(1)}
//             className="modal-dialog-centered"
//           >
//             <Form onSubmit={(e) => this.handleSubmit(e)}>
//               <ModalHeader toggle={() => this._toggleModal(1)}>
//                 Add New Link
//               </ModalHeader>
//               <ModalBody className="modalContent">
//                 <FormGroup>
//                   <Label>Title</Label>
//                   <Input
//                     type="text"
//                     placeholder="Enter Title"
//                     value={this.state.myLinks.title}
//                     name="title"
//                     onChange={(e) => {
//                       this.handleChange(e.target.name, e.target.value);
//                     }}
//                   />
//                   {this.state.errors && (
//                     <React.Fragment>
//                       <p
//                         className="d-flex"
//                         style={{ color: "red", fontSize: "12px" }}
//                       >
//                         {this.state.errors.title}
//                       </p>
//                     </React.Fragment>
//                   )}
//                 </FormGroup>
//                 <FormGroup>
//                   <Label>URL</Label>
//                   <Input
//                     type="text"
//                     placeholder="Enter URL"
//                     value={this.state.myLinks.url}
//                     name="url"
//                     onChange={(e) => {
//                       this.handleChange(e.target.name, e.target.value);
//                     }}
//                   />
//                   {this.state.errors && (
//                     <p className="d-flex" style={{ color: "red" }}>
//                       {this.state.errors.url}
//                     </p>
//                   )}
//                 </FormGroup>
//               </ModalBody>
//               <ModalFooter>
//                 <Button
//                   className="modalBtnCancel"
//                   type="submit"
//                   onClick={() => this._toggleModal(1)}
//                   toggle={() => this._toggleModal(1)}
//                 >
//                   Cancel
//                 </Button>
//                 <Button
//                   className="modalBtnSave"
//                   type="submit"
//                   onClick={(e) => this.handleAddEntry()}
//                   onSubmit={(e) => this.handleSubmit(e)}
//                   //****Not clearing the entry fields on Create
//                   // onSubmit={(e) => {
//                   //   e.preventDefault();
//                   //   this.setState({
//                   //     myLinks: {
//                   //       url: "",
//                   //       title: "",
//                   //     },
//                   //   });
//                   // }}
//                   // toggle={() => this._toggleModal(1)}
//                 >
//                   Create
//                 </Button>
//               </ModalFooter>
//             </Form>
//           </Modal>

//           <Modal
//             isOpen={this.state.modals[2]}
//             toggle={() => this._toggleModal(2)}
//             className="modal-dialog-centered"
//           >
//             <ModalHeader toggle={() => this._toggleModal(2)}>
//               Delete Link
//             </ModalHeader>
//             <ModalBody className="modalContent text-center">
//               <h5 className="mt-3 px-4" style={{ fontWeight: 400 }}>
//                 Are you sure you want to delete this Link? This cannot be
//                 undone.
//               </h5>
//             </ModalBody>
//             <ModalFooter>
//               <Button
//                 className="modalBtnCancel"
//                 onClick={() => this._toggleModal(2)}
//                 toggle={() => this._toggleModal(2)}
//               >
//                 Cancel
//               </Button>
//               <Button
//                 className="modalBtnSave"
//                 toggle={() => this._toggleModal(2)}
//                 name="del"
//                 onClick={(e) => {
//                   this.handleDelete(e);
//                 }}
//               >
//                 Delete
//               </Button>
//             </ModalFooter>
//           </Modal>
//         </Container>
//       </div>
//     );
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     //send value to addEntry
//     linkEntry: state.linkEntry,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     addEntry: (content) => dispatch(addEntry(content)),
//     deleteEntry: (_id) => dispatch(deleteEntry(_id)),
//     addId: (_id) => dispatch(addId(_id)),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Links);
