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
import classNames from "classnames";
import "../pages/People.css";
class UpdatePerson extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      modal: false,
      API: "99824f989930fca6e85f2ad5e9a47f7a3866c742257d1dcbb37e24139e598fe5",
      NationSlug: "jimmysandbox",
      id: "",
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      sex: "",
      employer: "",
      address: "",
      city: "",
      state: ""
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
  onChangeFName = val => {
    this.setState({
      first_name: val.target.value
    });
  };
  onChangeLName = val => {
    this.setState({
      last_name: val.target.value
    });
  };
  onChangeEmail = val => {
    this.setState({
      email: val.target.value
    });
  };
  onChangeEmployer = val => {
    this.setState({
      employer: val.target.value
    });
  };
  onChangeGender = val => {
    this.setState({
      sex: val.target.value
    });
  };
  onChangePhone = val => {
    this.setState({
      phone: val.target.value
    });
  };
  onChangeAddress = val => {
    this.setState({
      address: val.target.value
    });
  };
  onChangeCity = val => {
    this.setState({
      city: val.target.value
    });
  };
  onChangeState = val => {
    this.setState({
      state: val.target.value
    });
  };

  retrieveData = async () => {
    let requestObj = {
      apikey: this.state.API,
      site_slug: this.state.NationSlug,
      id: this.state.id
    };
    let requestJSON = JSON.stringify(requestObj);
    // console.log(resquestJSON)
    let response = await fetch(
      "https://nationbuilder-nodesv.herokuapp.com/retrieve-person/" + requestJSON
    );
    let json = await response.json();
    if (!json.person) {
      alert("Please check the Person ID!!!");
      return false;
    }
    console.log(json.person);
    this.setState({
      first_name: json.person.first_name,
      last_name: json.person.last_name,
      sex: json.person.sex,
      phone: json.person.phone,
      email: json.person.email,
      employer: json.person.employer,
      address: json.person.primary_address.address1,
      city: json.person.primary_address.city,
      state: json.person.primary_address.state,
      show: true
    });
  };

  updatePerson = async () => {
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
      id: this.state.id,
      person: personJSON
    };
    let requestJSON = JSON.stringify(requestObj);
    // console.log(resquestJSON)
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
    await fetch("https://nationbuilder-nodesv.herokuapp.com/update-person/" + requestJSON);
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
        <h5>UPDATE THE PERSON</h5>
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
              <Input
                onChange={this.onChangeID}
              />
            </InputGroup>
          </Col>
          <Col lg="6">
            <Button color="info" onClick={this.retrieveData} size="md">
              Retrieve Data
            </Button>
          </Col>
        </Row>
        <div className={classNames("hide", { show: this.state.show })}>
        <Row>
          <Col lg="6">
            <InputGroup>
              <InputGroupAddon addonType="prepend">First Name</InputGroupAddon>
              <Input id="first_name" 
                onChange={this.onChangeFName}
                value={this.state.first_name}
              />
            </InputGroup>
            <br />
            <InputGroup>
              <InputGroupAddon addonType="prepend">Last Name</InputGroupAddon>
              <Input id="last_name"
                onChange={this.onChangeLName}
                value={this.state.last_name}
              />
            </InputGroup>
            <br />
            <InputGroup>
              <InputGroupAddon addonType="prepend">Gender</InputGroupAddon>
              <Input id="gender" placeholder="M/F"
              onChange={this.onChangeGender}
              value={this.state.sex}
              />
            </InputGroup>
            <br />
            <InputGroup>
              <InputGroupAddon addonType="prepend">Employer</InputGroupAddon>
              <Input id="employer" 
              onChange={this.onChangeEmployer}
              value={this.state.employer}
              />
            </InputGroup>
            <br />
          </Col>
          <Col lg="6">
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                Phone
              </InputGroupAddon>
              <Input id="phone"
              onChange={this.onChangePhone}
              value={this.state.phone}
              />
            </InputGroup>
            <br />
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                Email
              </InputGroupAddon>
              <Input id="email"
              onChange={this.onChangeEmail}
              value={this.state.email}
              />
            </InputGroup>
            <br />
            <InputGroup>
              <InputGroupAddon addonType="prepend">Address</InputGroupAddon>
              <Input id="address"
              onChange={this.onChangeAddress}
              value={this.state.address}
              />
            </InputGroup>
            <br />
            <InputGroup>
              <InputGroupAddon addonType="prepend">City</InputGroupAddon>
              <Input id="city"
              onChange={this.onChangeCity}
              value={this.state.city}
              />
            </InputGroup>
            <br />
            <InputGroup>
              <InputGroupAddon addonType="prepend">State</InputGroupAddon>
              <Input id="state"
              onChange={this.onChangeState}
              value={this.state.state}
              />
            </InputGroup>
            <br />
          </Col>
        </Row>
          <br />
          <Button color="success" onClick={this.updatePerson} size="lg">
            Update Person Information
          </Button>
        </div>
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
export default UpdatePerson;
