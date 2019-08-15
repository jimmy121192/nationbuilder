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
class CreateEvent extends Component {
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
  createEvent = async () => {
    let name = document.getElementById("name").value,
      start_time = document.getElementById("start_time").value,
      end_time = document.getElementById("end_time").value,
      intro = document.getElementById("intro").value,
      contact_name = document.getElementById("contact_name").value,
      contact_email = document.getElementById("contact_email").value,
      contact_phone = document.getElementById("contact_phone").value,
      capacity = document.getElementById("capacity").value,
      venue_name = document.getElementById("venue").value,
      address = document.getElementById("address").value,
      city = document.getElementById("city").value,
      state = document.getElementById("state").value;
    let eventJSON = {
      event: {
        status: "published",
        name: name,
        intro: intro,
        time_zone: "Pacific Time (US & Canada)",
        start_time: start_time,
        end_time: end_time,
        contact: {
          name: contact_name,
          phone: contact_phone,
          show_phone: true,
          email: contact_email,
          show_email: true
        },
        rsvp_form: {
          phone: "optional",
          address: "required",
          allow_guests: true,
          accept_rsvps: true,
          gather_volunteers: true
        },
        show_guests: true,
        capacity: capacity,
        venue: {
          name: venue_name,
          address: {
            address1: address,
            city: city,
            state: state
          }
        }
      }
    };
    let requestObj = {
      apikey: this.state.API,
      site_slug: this.state.NationSlug,
      event: eventJSON
    };
    let requestJSON = JSON.stringify(requestObj);
    // console.log(resquestJSON)
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
    await fetch("https://nationbuilder-nodesv.herokuapp.com/create-event/" + requestJSON);
  };
  render() {
    return (
      <div>
        <Row>
          <Col lg="12">
            <div className="Events">
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
        <h5>CREATE AN EVENT</h5>
        <Row>
          <Col lg="6">
            <InputGroup>
              <InputGroupAddon addonType="prepend">Name</InputGroupAddon>
              <Input id="name" />
            </InputGroup>
            <br />
            <InputGroup>
              <InputGroupAddon addonType="prepend">Start Time</InputGroupAddon>
              <Input id="start_time" placeholder="2019-12-08T17:00:00-00:00" />
            </InputGroup>
            <br />
            <InputGroup>
              <InputGroupAddon addonType="prepend">End Time</InputGroupAddon>
              <Input id="end_time" placeholder="2020-09-08T17:00:00-00:00" />
            </InputGroup>
            <br />
            <InputGroup>
              <InputGroupAddon addonType="prepend">Capacity</InputGroupAddon>
              <Input id="capacity" />
            </InputGroup>
            <br />
            <div className="md-form">
              <label htmlFor="intro">Intro</label>
              <textarea
                id="intro"
                className="md-textarea form-control"
                rows="3"
                onChange={this.onChangeIntro}
              />
            </div>
          </Col>
          <Col lg="6">
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                Contact Name
              </InputGroupAddon>
              <Input id="contact_name" />
            </InputGroup>
            <br />
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                Contact Phone
              </InputGroupAddon>
              <Input id="contact_phone" />
            </InputGroup>
            <br />
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                Contact Email
              </InputGroupAddon>
              <Input id="contact_email" />
            </InputGroup>
            <br />
            <InputGroup>
              <InputGroupAddon addonType="prepend">Venue Name</InputGroupAddon>
              <Input id="venue" />
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
          </Col>
        </Row>
        <br />
        <Button color="success" onClick={this.createEvent} size="lg">
          Create Event
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Jimmy says:</ModalHeader>
          <ModalBody>The Event created successfully!</ModalBody>
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
export default CreateEvent;
