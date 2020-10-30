import React, { Component } from "react";
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
  componentWillMount() {
    getPages().then((response) => {
      console.log("Response in Links Page:", response);
      //Conditions for contents in response "page"
      if (response.page === null || response.page === undefined) {
        console.log("In links-page: No Links found for the current user!!");
        //Setting state value to true as response page is null or undefined
        this.setState({ linksNotPresent: true });
      }
      //if response page not null add the response to the state
      else {
        // const _linksList = [];
        // response.page.contents.map((entry) => {
        //   console.log("Entries from response:", entry.content.title);
        //   _linksList.push(entry.content.title);
        // });
        this.setState({
          _id: response.page._id,
          _links: response.page.contents,
        });
        console.log(
          `The Links Contained by the User: ID:${
            this.state._id
          } LINK:${this.state._links.map((item) => item.content.url)}`
        );
        // console.log("Links in State:", this.state._links);
      }
    });
  }

  handleAddEntry = () => {
    //If no links present in state
    let isTrue = {
      url: true,
      title: true,
    };
    this.setState({ isTrue }, () => {
      let errors = this.validation();
      console.log("ERROR WARINGS", errors);
      if (!errors) {
        if (this.state.linksNotPresent) {
          const linkEntry = {
            //To be sent as parameter to /page
            contents: [
              {
                content: {
                  title: this.state.myLinks.title,
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
            this.setState({
              myLinks: {
                url: "",
                title: "",
              },
            });
          });
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
    //
    //Close the modal after entering link
    this._toggleModal(1);
  };

  handleChange = (name, value) => {
    // console.log(name,value);
    const { myLinks, isTrue } = this.state;
    myLinks[name] = value;
    console.log("After setState on User Entry:", myLinks);
    isTrue[name] = true;
    this.setState({ myLinks, isTrue }, () => {
      this.validation();
    });
    return;
  };

  validation = () => {
    const { myLinks, isTrue, errors } = this.state;
    Object.keys(myLinks).forEach((link) => {
      switch (link) {
        case "title": {
          if (isTrue.title) {
            if (myLinks.title.trim().length) {
              errors[link] = "*Field cannot be empty!!";
            } else {
              delete errors[link];
              isTrue.title = false;
            }
          }
          break;
        }
        case "url": {
          if (isTrue.url) {
            if (
              myLinks.url.trim().length &&
              !new RegExp(
                "^[a-zA-Z0-9]{1}[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,3}$"
              ).test(myLinks.url)
            ) {
              errors.url = "*InValid URL!!";
            } else {
              delete errors[link];
              isTrue.url = false;
            }
          }
          break;
        }
        default: {
          console.warn("Error!!");
          break;
        }
      }
    });
    this.setState({ errors });
    return Object.keys(errors).length ? errors : null;
  };

  handleDelete = (e) => {
    console.log("handleDelete");
    createEntry();
    this._toggleModal(2);
  };

  handleSubmit = (e) => {
    console.log("Submitting");
    e.preventDefault(e);
    let isTrue = {
      url: true,
      title: true,
    };
    this.setState({ isTrue }, () => {
      let errors = this.validation();
      if (!errors) {
        console.log("Links On Submit:", this.state.myLinks);
      }
    });
  };

  render() {
    // console.log("In Render:", this.state._links);
    const addedLinks = () => {
      return (
        <>
          {console.log("MY LINKS ARE:", this.state._links)}
          {this.state._links.map((entry) => {
            {
              console.log("Each ENTRY:", entry);
              return (
                <>
                  <div className="addedLinksWrap">
                    <div className="moveLink">
                      <i className="fa fa-ellipsis-v"></i>
                    </div>
                    <div className="addedLinksDetails">
                      <h5>&nbsp;{entry.content.title.toUpperCase()}</h5>
                      <h5>&nbsp;{entry.content.url}</h5>
                    </div>
                    <CustomInput
                      type="switch"
                      id="exampleCustomSwitch"
                      name="customSwitch"
                      label=""
                      checked
                      className="disableLink"
                    />
                    <Button
                      className="delLinkBtn"
                      onClick={() => this._toggleModal(1)}
                    >
                      <i className="fa fa-pencil"></i>
                    </Button>
                    &nbsp;&nbsp;
                    <Button
                      className="delLinkBtn"
                      onClick={() => this._toggleModal(2)}
                    >
                      <i className="fa fa-trash-o text-danger"></i>
                    </Button>
                  </div>
                </>
              );
            }
          })}
          {/* {this.state._links.map((entry) => {
              console.log("Inside Else of Render:", entry); */}
          {/* <div className="addedLinksWrap">
                <div className="moveLink">
                  <i className="fa fa-ellipsis-v"></i>
                </div>
                <div className="addedLinksDetails">
                  <h4>SOME VALUE</h4>
                </div>
                <CustomInput
                  type="switch"
                  id="exampleCustomSwitch"
                  name="customSwitch"
                  label=""
                  checked
                  className="disableLink"
                />
                <Button className="delLinkBtn">
                  <i className="fa fa-pencil"></i>
                </Button>
                <Button className="delLinkBtn">
                  <i className="fa fa-trash-o text-danger"></i>
                </Button>
              </div> */}
          {/*  }
            })} */}
        </>
      );
    };

    const handleLinks = () => {
      // console.log("Handle Links.", this.state._links);
      return (
        <>
          {this.state._links.map((item) => {
            return (
              <>
                <Button className="btnOrange">
                  <strong>{item.content.title.toUpperCase()}</strong>
                  <br />
                </Button>
              </>
            );
          })}
        </>
      );
      //   return(<>
      //     {this.state._links.map((item) => {
      //       console.log("Handle Links Preview", item.content.title);
      //       //Not being rendered in the preview section
      //       return (
      //         <>
      //           <strong>Something</strong>
      //           <strong>{item.content.title}</strong>
      //         </>
      //       );
      //     });
      //     </>
      // })
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
                    onClick={() => this._toggleModal(1)}
                  >
                    <i className="fa fa-plus mr-1"></i> Add New Link
                  </Button>
                </div>

                <Card className="userDetails mb-4">
                  <CardBody>
                    {this.state.linksNotPresent ? (
                      <strong>LINKS EMPTY FOR CURRENT USER</strong>
                    ) : (
                      addedLinks()
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
                    <h5>@johndoe</h5>
                  </div>

                  <div className="mt-4">
                    {this.state.linksNotPresent ? (
                      <strong>LINKS EMPTY</strong>
                    ) : (
                      <strong>{handleLinks()}</strong>
                    )}
                  </div>
                </div>
              </div>
            </Col>
          </Row>

          {/* Modal for showing "Create New Link" */}
          <Modal
            isOpen={this.state.modals[1]}
            toggle={() => this._toggleModal(1)}
            className="modal-dialog-centered"
          >
            <Form onSubmit={(e) => this.handleSubmit(e)}>
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
                    name="title"
                    onChange={(e) => {
                      this.handleChange(e.target.name, e.target.value);
                    }}
                  />
                  {this.state.errors && (
                    <React.Fragment>
                      <p
                        className="d-flex"
                        style={{ color: "red", fontSize: "12px" }}
                      >
                        {this.state.errors.title}
                      </p>
                    </React.Fragment>
                  )}
                </FormGroup>
                <FormGroup>
                  <Label>URL</Label>
                  <Input
                    type="text"
                    placeholder="Enter URL"
                    value={this.state.myLinks.url}
                    name="url"
                    onChange={(e) => {
                      this.handleChange(e.target.name, e.target.value);
                    }}
                  />
                  {this.state.errors && (
                    <p className="d-flex" style={{ color: "red" }}>
                      {this.state.errors.url}
                    </p>
                  )}
                </FormGroup>
              </ModalBody>
              <ModalFooter>
                <Button
                  className="modalBtnCancel"
                  type="submit"
                  onClick={() => this._toggleModal(1)}
                  toggle={() => this._toggleModal(1)}
                >
                  Cancel
                </Button>
                <Button
                  className="modalBtnSave"
                  type="submit"
                  onClick={(e) => this.handleAddEntry()}
                  onSubmit={(e) => this.handleSubmit(e)}
                  //****Not clearing the entry fields on Create
                  // onSubmit={(e) => {
                  //   e.preventDefault();
                  //   this.setState({
                  //     myLinks: {
                  //       url: "",
                  //       title: "",
                  //     },
                  //   });
                  // }}
                  toggle={() => this._toggleModal(1)}
                >
                  Create
                </Button>
              </ModalFooter>
            </Form>
          </Modal>

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
                onClick={() => this._toggleModal(2)}
                toggle={() => this._toggleModal(2)}
              >
                Cancel
              </Button>
              <Button
                className="modalBtnSave"
                toggle={() => this._toggleModal(2)}
                onClick={(e) => this.handleDelete()}
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
    //send value to addEntry
    linkEntry: state.linkEntry,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addEntry: (content) => dispatch(addEntry(content)),
    deleteEntry: (_id) => dispatch(deleteEntry(_id)),
    addId: (_id) => dispatch(addId(_id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Links);
