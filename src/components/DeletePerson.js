import React, { Component } from "react";
import {
  Row,
  Col,
  InputGroup,
  Input,
  InputGroupAddon,
  Button,
  Alert,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import "../pages/People.css";
class DeletePerson extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      API: "99824f989930fca6e85f2ad5e9a47f7a3866c742257d1dcbb37e24139e598fe5",
      NationSlug: "jimmysandbox",
      id: ""
    };
  }
  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };
  onChangeAPI = val => {
    this.setState({
      API: val.target.value
    });
  };
  onChangeSlug = val => {
    this.setState({
      NationSlug: val.target.value
    });
  };
  onChangeID = val => {
    console.log(val.target.value);
    this.setState({
      id: val.target.value
    });
  };
  deletePerson = async () => {
    let requestObj = {
      apikey: this.state.API,
      site_slug: this.state.NationSlug,
      id: this.state.id
    };
    let requestJSON = JSON.stringify(requestObj);
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
    await fetch("https://nationbuilder-nodesv.herokuapp.com/delete-person/" + requestJSON);
  };
  render() {
    return (
      <div>
        <Row>
          <Col lg="12">
            <div className="People">
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <Button color="warning">API Key</Button>
                </InputGroupAddon>
                <Input onChange={this.onChangeAPI} value={this.state.API} />
              </InputGroup>
              <br />
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <Button color="warning">Nation Slug</Button>
                </InputGroupAddon>
                <Input
                  onChange={this.onChangeSlug}
                  value={this.state.NationSlug}
                />
              </InputGroup>
            </div>
          </Col>
          <hr />
        </Row>
        <h5>DELETE A PERSON</h5>
        <br />
        <Label for="note">Note:</Label>
        <Alert color="warning">
          Please check Show All People to get the ID
        </Alert>
        <Row className="updatePerson">
          <Col lg="6">
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <Button color="info">Person ID</Button>
              </InputGroupAddon>
              <Input onChange={this.onChangeID} />
            </InputGroup>
          </Col>
          <Col lg="6">
            <Button color="info" onClick={this.deletePerson} size="md">
              Delete Person
            </Button>
          </Col>
        </Row>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Successful!</ModalHeader>
          <ModalBody>The Person information has been updated!</ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>
              OK
            </Button>{" "}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
export default DeletePerson;
