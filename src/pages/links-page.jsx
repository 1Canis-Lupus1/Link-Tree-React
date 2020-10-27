import React, { Component } from 'react';
import {Col, Container, Row, Button, Card, CardBody, CustomInput, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input} from 'reactstrap';
import {getPages, createEntry ,initialEntry} from '../http/http-calls';
import {connect} from "react-redux";
import {addEntry,editEntry,addId,deleteEntry} from '../redux/action/content-data';

class Links extends Component {
  state = {
		modals: [
      false,
      false
    ],
    myLinks:{
      title:"",
      url:""
    }
	}
	
	_toggleModal = index => {
		const { modals } = this.state;
		modals[index] = !modals[index];
		this.setState({
			modals
		})  
  }

  componentDidMount(){
    getPages().then(response=>{
      console.log("In Links Page:",response)
      if (response.page.contents.length) {
        let contentList = response.page.contents;
        let content = {
          content: contentList[0],
        };
        console.log(content);
        this.props.addEntry(content);
        this.props.addId(response.page.id);
      } else {
        this.props.deleteEntry();
      }
    })
  }

  handleChange=(name,value)=>{
    // console.log(name,value);
    const {myLinks}=this.state;
    myLinks[name]=value;
    this.setState({myLinks});
    console.log("After setState:",myLinks)
  }

  handleAddEntry=()=>{
    if (!this.props.contentData.contents.length) {
      const contentData = {
        contents: [
          {
            content: {
              title: this.state.content.title,
              url: this.state.content.url,
            },
            contentType: "socialLink",
            subContentType: "facebook",
          },
        ],
      };
      initialEntry(contentData).then((res) => {
        if (!res.error) {
          const content = {
            content: res.page.contents[0],
          };
          this.props.addEntry(content);
          this.props.addId(res.page.id);
          this.setState({
            content: {
              title: "",
              url: "",
            },
          });
        }
      });
    } else {
      const contents = this.props.contentData.contents;
      const contentData = [
        ...contents,
        {
          content: {
            title: this.state.content.title,
            url: this.state.content.url,
          },
          contentType: "socialLink",
          subContentType: "facebook",
        },
      ];
      const obj = {
        contents: contentData,
      };
      addEntry(obj, this.props.contentData.id).then((res) => {
        const lastContent = res.page.contents[res.page.contents.length - 1];
        const content = {
          content: lastContent,
        };
        this.props.addEntry(content);
      });
    }
    this._toggleModal(1);
  }

  render() {
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
                    <div className="addedLinksWrap">
                      <div className="moveLink">
                        <i className="fa fa-ellipsis-v"></i>
                      </div>
                      <div className="addedLinkDetails">
                        <h5>LinkedIn</h5>
                        <p>https://linkedin.com/in/john-doe</p>
                        <div className="actionBtnWrap">
                          <CustomInput
                            type="switch"
                            id="exampleCustomSwitch"
                            name="customSwitch"
                            label=""
                            checked
                            className="disableLink"
                          />

                          <Button className="delLinkBtn">
                            <i
                              className="fa fa-pencil"
                              onClick={() => {
                                this._toggleModal(1);
                              }}
                            ></i>
                          </Button>
                          <Button
                            className="delLinkBtn"
                            onClick={() => this._toggleModal(2)}
                          >
                            <i className="fa fa-trash-o text-danger"></i>
                          </Button>
                        </div>
                      </div>{" "}
                      {/* addedLinkDetails */}
                    </div>

                    <div className="addedLinksWrap">
                      <div className="moveLink">
                        <i className="fa fa-ellipsis-v"></i>
                      </div>
                      <div className="addedLinkDetails">
                        <h5>Facebook</h5>
                        <p>https://facebook.com/in/john-doe</p>
                        <div className="actionBtnWrap">
                          <CustomInput
                            type="switch"
                            id="exampleCustomSwitch"
                            name="customSwitch"
                            label=""
                            checked
                            className="disableLink"
                          />

                          <Button className="delLinkBtn">
                            <i
                              className="fa fa-pencil"
                              onClick={() => {
                                this._toggleModal(1);
                              }}
                            ></i>
                          </Button>
                          <Button
                            className="delLinkBtn"
                            onClick={() => this._toggleModal(2)}
                          >
                            <i className="fa fa-trash-o text-danger"></i>
                          </Button>
                        </div>
                      </div>{" "}
                      {/* addedLinkDetails */}
                    </div>

                    {/* <div className="addedLinksWrap">
                      <div className="moveLink">
                        <i className="fa fa-ellipsis-v"></i>
                      </div> */}
                    {/* <div className="addedLinkDetails">
                        <h5>Instagram</h5>
                        <p>https://instagram.com/in/john-doe</p>
                        <div className="actionBtnWrap">
                          <CustomInput type="switch" id="exampleCustomSwitch" name="customSwitch" label="" className="disableLink" /> */}

                    {/* <Button className="delLinkBtn">
                            <i className="fa fa-pencil"></i>
                          </Button>
                          <Button className="delLinkBtn" onClick={() => this._toggleModal(2)}>
                            <i className="fa fa-trash-o text-danger"></i>
                          </Button>
                        </div>
                      </div> {/* addedLinkDetails */}
                    {/* </div> */}
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
                    <Button className="btnOrange">LinkedIn</Button>
                    <Button className="btnOrange">Facebook</Button>
                  </div>
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
                  name="title"
                  onChange={(e) => {
                    this.handleChange(e.target.name, e.target.value);
                  }}
                />
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
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button
                className="modalBtnCancel"
                toggle={() => this._toggleModal(1)}
              >
                Cancel
              </Button>
              <Button
                className="modalBtnSave"
                toggle={() => this._toggleModal(1)}
                onClick={(e)=>this.handleAddEntry()}
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
                toggle={() => this._toggleModal(2)}
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

const mapStateToProps=()=>{
  return{
    //send value to addEntry
  }
}

export default Links;
