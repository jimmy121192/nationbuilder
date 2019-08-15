import React, { Component } from "react";
import {
  Row,
  Col,
  InputGroup,
  Input,
  InputGroupAddon,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import "../pages/Events.css";
class CreatePerson extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      API: "99824f989930fca6e85f2ad5e9a47f7a3866c742257d1dcbb37e24139e598fe5",
      NationSlug: "jimmysandbox"
    };
  }
  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };
  onChangeAPI = val => {
    // this.setState({
    //   API: val.target.value
    // });
    console.log(val.target.value);
  };
  onChangeSlug = val => {
    this.setState({
      NationSlug: val.target.value
    });
  };
  createPerson = async () => {
    let first_name = document.getElementById("first_name").value,
      last_name = document.getElementById("last_name").value,
      gender = document.getElementById("gender").value,
      employer = document.getElementById("employer").value,
      phone = document.getElementById("phone").value,
      email = document.getElementById("email").value,
      address = document.getElementById("address").value,
      city = document.getElementById("city").value,
      state = document.getElementById("state").value;

    let personJSON = {
      person: {
        email: email,
        first_name: first_name,
        last_name: last_name,
        sex: gender,
        signup_type:0,
        employer:employer,
        party:"P",
        phone:phone,
        registered_address: {
            address1: address,
            city:city,
            state:state
          }
      }
    };
    let requestObj = {
      apikey: this.state.API,
      site_slug: this.state.NationSlug,
      person: personJSON
    };
    let requestJSON = JSON.stringify(requestObj);
    console.log(requestJSON)
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
    await fetch("https://nationbuilder-nodesv.herokuapp.com/create-person/" + requestJSON);
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
        <h5>CREATE A PERSON</h5>
        <Row>
          <Col lg="6">
            <InputGroup>
              <InputGroupAddon addonType="prepend">First Name</InputGroupAddon>
              <Input id="first_name" />
            </InputGroup>
            <br />
            <InputGroup>
              <InputGroupAddon addonType="prepend">Last Name</InputGroupAddon>
              <Input id="last_name" />
            </InputGroup>
            <br />
            <InputGroup>
              <InputGroupAddon addonType="prepend">Gender</InputGroupAddon>
              <Input id="gender" placeholder="M/F" />
            </InputGroup>
            <br />
            <InputGroup>
              <InputGroupAddon addonType="prepend">Employer</InputGroupAddon>
              <Input id="employer" />
            </InputGroup>
            <br />
          </Col>
          <Col lg="6">
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                Phone
              </InputGroupAddon>
              <Input id="phone" />
            </InputGroup>
            <br />
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                Email
              </InputGroupAddon>
              <Input id="email" />
            </InputGroup>
            <br />
            <InputGroup>
              <InputGroupAddon addonType="prepend">Address</InputGroupAddon>
              <Input id="address" />
            </InputGroup>
            <br />
            <InputGroup>
              <InputGroupAddon addonType="prepend">City</InputGroupAddon>
              <Input id="city" />
            </InputGroup>
            <br />
            <InputGroup>
              <InputGroupAddon addonType="prepend">State</InputGroupAddon>
              <Input id="state" />
            </InputGroup>
            <br />
          </Col>
        </Row>
        <br />
        <Button color="success" onClick={this.createPerson} size="lg">
          Create Person
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Jimmy says:</ModalHeader>
          <ModalBody>The Person created successfully!</ModalBody>
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
export default CreatePerson;
