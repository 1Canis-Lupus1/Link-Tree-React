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
} from "reactstrap";
import {
  getPages,
  initialEntry,
  createEntry,
  getUserData,
} from "../http/http-calls";
import {
  addContent,
  editContent,
  removeContent,
  addId,
  addUserAvatar,
} from "../redux/actions/content_data";
import { connect } from "react-redux";

class Links extends Component {
  state = {
    modals: [false, false],
    contentData: {
      title: "",
      url: "",
    },
    isTrue: {
      title: "",
      url: "",
    },
    editContentData: {
      title: "",
      url: "",
    },
    pageId: "",
    _links: [],
    linksNotPresent: false,
    errors: {},
    deleteCurrEntry: "",
    editCurrEntry: "",
    addFlag: false,
    editFlag: false,
    contentDatanull: false,
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

  //On Initial reder checking the page contents and setting state accordingly(Check values in console)
  componentDidMount() {
    const { _links } = this.state;
    //Fetching Current Added Links for user
    getPages().then((res) => {
      if (res.page === null) {
        this.setState({ linksNotPresent: true });
      } else {
        //Adding Current state value to the links
        this.setState({
          _links: res.page.contents,
          pageId: res.page._id,
        });
        console.log("Links From /page:", res);
        this.props.addContent(res.page.contents);
      }
    });
    console.log(_links);

    getUserData().then((res) => {
      console.log(res);
      this.props.addUserAvatar(res.user.avatarLink);
    });
  }

  handleAddEntry = () => {
    const { contentData, _links, pageId } = this.state;
    // If no links present in state
    if (
      contentData.url === null ||
      contentData.title === null ||
      contentData.url === undefined ||
      contentData.title === undefined
    ) {
      this.setState({ contentDatanull: true });
    } else if (this.state.linksNotPresent) {
      const createData = {
        //To be sent as parameter to /page
        contents: [
          {
            content: {
              title: contentData.title,
              url: contentData.url,
            },
            contentType: "socialLink",
            subContentType: "facebook",
          },
        ],
      };
      //Post request to /page
      initialEntry(createData).then((res) => {
        console.log("Response from /page", res);
        if (!res.error) {
          this.setState({ _links: res.page.contents });
          this.setState({
            contentData: {
              title: "",
              url: "",
            },
          });
        }
      });
    } else {
      const updateData = [
        ..._links,
        {
          content: {
            title: contentData.title,
            url: contentData.url,
          },
          contentType: "socialLink",
          subContentType: "facebook",
        },
      ];
      const obj = {
        contents: updateData,
      };
      createEntry(obj, pageId).then((res) => {
        console.log("Creating Entry Reponse:", res);
        const lastContent = res.page.contents[res.page.contents.length - 1];
        this.setState({ _links: res.page.contents });
      });
      this.setState({
        contentData: {
          title: "",
          url: "",
        },
        addFlag: false,
      });
    }
    this.props.addContent(_links);
    this.setState({ modals: [false, false] });
  };

  handleChange = (field, value) => {
    const { contentData, isTrue } = this.state;
    if (!value && typeof value === "number") {
      contentData[field] = "";
      isTrue[field] = true;
      this.setState({ contentData, isTrue }, () => {
        this.validation();
        console.log("After setState on User Entry:", this.state);
      });
      return;
    } else {
      contentData[field] = value;
    }
    isTrue[field] = true;
    this.setState({ contentData, isTrue }, () => {
      this.validation();
      console.log("After setState on User Entry:", this.state);
    });
  };

  validation() {
    const { contentData, isTrue, errors } = this.state;
    Object.keys(contentData).forEach((each) => {
      switch (each) {
        case "url": {
          if (isTrue.url) {
            if (!contentData.url.trim().length) {
              errors.url = "*Field cannot be empty";
            } else if (
              contentData.url.trim().length &&
              !new RegExp(
                "(https?:\\//\\//(?:www\\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}|www\\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}|https?:\\//\\//(?:www\\.|(?!www))[a-zA-Z0-9]+\\.[^\\s]{2,}|www\\.[a-zA-Z0-9]+\\.[^\\s]{2,})"
              ).test(contentData.url)
            ) {
              errors.url = "Invalid URL";
            } else {
              delete errors[each];
              isTrue.url = false;
            }
          }
          break;
        }
        case "title": {
          if (isTrue.title) {
            if (!contentData.title.trim().length) {
              errors[each] = "*Field cannot be empty";
            } else {
              delete errors[each];
              isTrue.title = false;
            }
          }
          break;
        }
        default: {
          console.log("Error");
          break;
        }
      }
    });
    this.setState({ errors });
    return Object.keys(errors).length ? errors : null;
  }

  addCurrEntry = () => {
    let isTrue = {
      url: true,
      title: true,
    };
    this.setState({ isTrue }, () => {
      let errors = this.validation();
      console.log(errors);
      if (!errors) {
        const { contentData } = this.state;
        console.log("Data in State ", contentData);
        this.handleAddEntry();
      }
    });
  };
  editCurrEntry = (e) => {
    let isTrue = {
      url: true,
      title: true,
    };
    this.setState({ isTrue }, () => {
      let errors = this.validation();
      console.log(errors);
      if (!errors) {
        const { contentData } = this.state;
        console.log("Data in State ", contentData);
        this.editMyModal();
      }
    });
  };

  handleToggle = (flag, _id) => {
    const { _links, pageId } = this.state;
    if (flag) {
      return _links.map((e) => {
        if (_id === e._id) {
          e.status = true;
        }
        this.setState({ _links });
        const obj = {
          contents: _links,
        };
        createEntry(obj, pageId).then((res) => {
          console.log("Response received :", res);
          const lastContent = res.page.contents[res.page.contents.length - 1];
          this.setState({ _links: res.page.contents });
          console.log("After Set State", _links);
        });
        //Page Reload for Toggle
        window.location.reload();
      });
    } else {
      _links.map((e) => {
        if (_id === e._id) {
          e.status = false;
        }
        this.setState({ _links });
        const obj = {
          contents: _links,
        };
        createEntry(obj, pageId).then((res) => {
          console.log("Response received :", res);
          const lastContent = res.page.contents[res.page.contents.length - 1];
          this.setState({ _links: res.page.contents });
          console.log("After Set State", _links);
        });
      });
    }
    console.log(_links);
  };

  editMyModal = () => {
    const { _links, pageId, editCurrEntry, contentData } = this.state;
    if (_links === null || _links === undefined) {
      return console.log("Links Empty!!");
    } else {
      var index = _links.findIndex((item) => item._id === editCurrEntry);
      console.log("Current Index:", index);
      const editedContent = {
        content: {
          title: contentData.title,
          url: contentData.url,
        },
        _id: editCurrEntry,
        status: true,
        contentType: "socialLink",
        subContentType: "facebook",
      };
      _links.splice(index, 1, editedContent);
      console.log("My Links:", _links);
      const obj = {
        contents: _links,
      };
      createEntry(obj, pageId).then((res) => {
        console.log("Response Received: ", res);
        const lastContent = res.page.contents[res.page.contents.length - 1];
        this.setState({ _links: res.page.contents });
        console.log("After Set State", _links);
      });
      this.setState({
        contentData: {
          title: "",
          url: "",
        },
        editFlag: false,
      });
    }
    //Resetting Values
    this.setState({
      modals: [false, false],
      editContentData: { title: "", url: "" },
      contentData: { title: "", url: "" },
    });
  };

  render() {
    //Destructuring state values
    const { _links, errors, deleteCurrEntry, pageId, addFlag } = this.state;
    const emptyLinks = () => {
      if (!this.state._links.length) {
        return <Button className="btnOrange">No Links</Button>;
      }
    };

    const showLinkCard = () => {
      if (_links === undefined || _links === null) {
        console.log("page is empty while displaying");
      } else {
        return _links.map((data) => {
          if (data.content.url === "" || data.content.title === "") {
            return false;
          } else {
            return (
              <Fragment>
                <div className="addedLinksWrap">
                  <div className="moveLink">
                    <i className="fa fa-ellipsis-v"></i>
                  </div>
                  <div className="addedLinkDetails">
                    <h5>{data.content.title.toUpperCase()}</h5>
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
                            contentData: {
                              title: data.content.title,
                              url: data.content.url,
                            },
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
                          this.setState({ deleteCurrEntry: data._id });
                          this._toggleModal(2);
                        }}
                      >
                        <i className="fa fa-trash-o text-danger"></i>
                      </Button>
                    </div>
                  </div>
                </div>
              </Fragment>
            );
          }
        });
      }
    };
    const showButton = () => {
      if (_links === undefined || _links === null) {
        console.log("No Links To Show");
      } else {
        return _links.map((data) => {
          if (data.status) {
            return (
              <Fragment>
                <Button
                  key={data.content._id}
                  className="btnOrange"
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
    const deleteModal = () => {
      if (_links === null || _links === undefined) {
        return console.log("No Link item present");
      } else {
        var index = _links.findIndex((item) => item._id === deleteCurrEntry);
        _links.splice(index, 1);
        console.log("new list after delete: ", _links);
        const obj = {
          contents: _links,
        };
        createEntry(obj, pageId).then((res) => {
          // debugger;
          console.log("deletedContent: ", res);
          const lastContent = res.page.contents[res.page.contents.length - 1];
          console.log("LastContent:", lastContent);
          this.setState({ _links: res.page.contents });
          console.log("New data list: ", _links);
        });
      }
      this.setState({ modals: [false, false] });
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
                    {this.state.linksNotPresent ? emptyLinks() : showLinkCard()}
                  </CardBody>
                </Card>
              </div>

              <div className="profilePreviewWrap">
                <Button className="shareProfileBtn" onClick={this.handleShare}>
                  Share
                </Button>
                <div className="profilePreview">
                  <div className="text-center">
                    <Label className="btn uploadBtnProfile">
                      {this.props.contentData.avatarLink ? (
                        <img
                          src={this.props.contentData.avatarLink}
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
                    <h5>{`@${this.props.userData.userName}`}</h5>
                  </div>

                  <div className="mt-4">{showButton()}</div>
                </div>{" "}
                {/* profilePreview */}
              </div>
            </Col>
          </Row>

          {/* Modal */}
          <Modal
            isOpen={this.state.modals[1]}
            toggle={() => this._toggleModal(1)}
            className="modal-dialog-centered"
          >
            <ModalHeader toggle={() => this._toggleModal(1)}>
              {addFlag ? "Add New Link" : "Edit Link"}
            </ModalHeader>
            <ModalBody className="modalContent">
              <FormGroup>
                <Label>Title</Label>
                <Input
                  type="text"
                  placeholder="Enter Title"
                  value={this.state.contentData.title}
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
                  value={this.state.contentData.url}
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
                  addFlag ? this.addCurrEntry() : this.editCurrEntry();
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
                onClick={() => this._toggleModal(2)}
              >
                Cancel
              </Button>
              <Button
                className="modalBtnSave"
                toggle={() => this._toggleModal(2)}
                //onclick
                onClick={() => deleteModal()}
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
    contentData: state.contentData,
    userData: state.userData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addContent: (_links) => dispatch(addContent(_links)),
    addId: (_id) => dispatch(addId(_id)),
    addUserAvatar: (avatarLink) => dispatch(addUserAvatar(avatarLink)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Links);
