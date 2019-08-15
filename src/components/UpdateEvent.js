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
import "../pages/Events.css";
class UpdateEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      modal: false,
      API: "99824f989930fca6e85f2ad5e9a47f7a3866c742257d1dcbb37e24139e598fe5",
      NationSlug: "jimmysandbox",
      event_id: "",
      name: "",
      start_time: "",
      end_time: "",
      intro: "",
      contact_name: "",
      contact_email: "",
      contact_phone: "",
      capacity: "",
      venue_name: "",
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
      event_id: val.target.value
    });
  };
  onChangeName = val => {
    this.setState({
      name: val.target.value
    });
  };
  onChangeStartTime = val => {
    this.setState({
      start_time: val.target.value
    });
  };
  onChangeEndTime = val => {
    this.setState({
      end_time: val.target.value
    });
  };
  onChangeCapacity = val => {
    this.setState({
      capacity: val.target.value
    });
  };
  onChangeIntro = val => {
    this.setState({
      intro: val.target.value
    });
  };
  onChangeContactName = val => {
    this.setState({
      contact_name: val.target.value
    });
  };
  onChangeContactPhone = val => {
    this.setState({
      contact_phone: val.target.value
    });
  };
  onChangeContactEmail = val => {
    this.setState({
      contact_email: val.target.value
    });
  };
  onChangeVenueName = val => {
    this.setState({
      venue: val.target.value
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
      event_id: this.state.event_id
    };
    let requestJSON = JSON.stringify(requestObj);
    // console.log(resquestJSON)
    let response = await fetch(
      "https://nationbuilder-nodesv.herokuapp.com/retrieve-event/" + requestJSON
    );
    let json = await response.json();
    if (!json.event) {
      alert("Please check the Event ID!!!");
      return false;
    }
    console.log(json.event);
    this.setState({
      name: json.event.name,
      start_time: json.event.start_time,
      end_time: json.event.end_time,
      intro: json.event.intro,
      contact_name: json.event.contact.name,
      contact_email: json.event.contact.email,
      contact_phone: json.event.contact.phone,
      capacity: json.event.capacity,
      venue_name: json.event.venue.name,
      address: json.event.venue.address.address1,
      city: json.event.venue.address.city,
      state: json.event.venue.address.state,
      show: true
    });
  };
  updateEvent = async () => {
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
      event_id: this.state.event_id,
      event: eventJSON
    };
    let requestJSON = JSON.stringify(requestObj);
    // console.log(resquestJSON)
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
    await fetch("https://nationbuilder-nodesv.herokuapp.com/update-event/" + requestJSON);
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
        <h5>UPDATE AN EVENT</h5>
        <br />
        <Label for="note">Note:</Label>
        <Alert color="warning">
          You aren't able to change information of the expired events
        </Alert>
        <Row className="updateEvent">
          <Col lg="6">
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <Button color="info">Event ID</Button>
              </InputGroupAddon>
              <Input
                onChange={this.onChangeID}
                placeholder="Check Show All Events to get the ID"
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
                <InputGroupAddon addonType="prepend">Name</InputGroupAddon>
                <Input
                  id="name"
                  onChange={this.onChangeName}
                  value={this.state.name}
                />
              </InputGroup>
              <br />
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  Start Time
                </InputGroupAddon>
                <Input
                  id="start_time"
                  onChange={this.onChangeStartTime}
                  value={this.state.start_time}
                  placeholder="2019-12-08T17:00:00-00:00"
                />
              </InputGroup>
              <br />
              <InputGroup>
                <InputGroupAddon addonType="prepend">End Time</InputGroupAddon>
                <Input
                  id="end_time"
                  onChange={this.onChangeEndTime}
                  value={this.state.end_time}
                  placeholder="2020-09-08T17:00:00-00:00"
                />
              </InputGroup>
              <br />
              <InputGroup>
                <InputGroupAddon addonType="prepend">Capacity</InputGroupAddon>
                <Input
                  id="capacity"
                  onChange={this.onChangeCapacity}
                  value={this.state.capacity}
                />
              </InputGroup>
              <br />
              <div className="md-form">
                <label htmlFor="intro">Intro</label>
                <textarea
                  id="intro"
                  className="md-textarea form-control"
                  rows="3"
                  onChange={this.onChangeIntro}
                  value={this.state.intro}
                />
              </div>
            </Col>
            <Col lg="6">
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  Contact Name
                </InputGroupAddon>
                <Input
                  id="contact_name"
                  onChange={this.onChangeContactName}
                  value={this.state.contact_name}
                />
              </InputGroup>
              <br />
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  Contact Phone
                </InputGroupAddon>
                <Input
                  id="contact_phone"
                  onChange={this.onChangeContactPhone}
                  value={this.state.contact_phone}
                />
              </InputGroup>
              <br />
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  Contact Email
                </InputGroupAddon>
                <Input
                  id="contact_email"
                  onChange={this.onChangeContactEmail}
                  value={this.state.contact_email}
                />
              </InputGroup>
              <br />
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  Venue Name
                </InputGroupAddon>
                <Input
                  id="venue"
                  onChange={this.onChangeVenueName}
                  value={this.state.venue_name}
                />
              </InputGroup>
              <br />
              <InputGroup>
                <InputGroupAddon addonType="prepend">Address</InputGroupAddon>
                <Input
                  id="address"
                  onChange={this.onChangeAddress}
                  value={this.state.address}
                />
              </InputGroup>
              <br />
              <InputGroup>
                <InputGroupAddon addonType="prepend">City</InputGroupAddon>
                <Input
                  id="city"
                  onChange={this.onChangeCity}
                  value={this.state.city}
                />
              </InputGroup>
              <br />
              <InputGroup>
                <InputGroupAddon addonType="prepend">State</InputGroupAddon>
                <Input
                  id="state"
                  onChange={this.onChangeState}
                  value={this.state.state}
                />
              </InputGroup>
            </Col>
          </Row>
          <br />
          <Button color="success" onClick={this.updateEvent} size="lg">
            Update Event
          </Button>
        </div>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Successful!</ModalHeader>
          <ModalBody>The Event information has been updated!</ModalBody>
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
export default UpdateEvent;
