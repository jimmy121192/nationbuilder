import React, { Component } from "react";
import {
  Row,
  Col,
  InputGroup,
  Input,
  InputGroupAddon,
  Button,
  Table,
  Badge
} from "reactstrap";
import "../pages/Events.css";

class ShowAllEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      API: "99824f989930fca6e85f2ad5e9a47f7a3866c742257d1dcbb37e24139e598fe5",
      NationSlug: "jimmysandbox",
      events: []
    };
  }
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
  showEvents = async () => {

    let dataObj = {
        apikey: this.state.API,
        site_slug : this.state.NationSlug
    }
    let myObj = JSON.stringify(dataObj);



    let response = await fetch(
      "https://nationbuilder-nodesv.herokuapp.com/events/" + myObj
    );
    let json = await response.json();
    console.log(json.results);
    this.setState({
      events: json.results
    });
  };
  render() {
    var comp;
    if (this.state.events.length) {
      
      comp = (
        <Table>
          <thead>
            <tr>
              <th>#ID</th>
              <th>Event Name</th>
              <th>Location</th>
              <th>Contact Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {this.state.events.map((event, index) => (
              
              <tr key={index}>
                <th>{event.id}</th>
                <td>{event.name}</td>
                <td>
                  {event.venue.name} - {event.venue.address.address1}
                </td>
                <td>{event.contact.name}</td>
                <td>
                <Badge 
                 color={(event.status === 'expired') ? 'danger' : 'success'}
                >
                {event.status}
                </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      );
    }
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
        <Button color="success" onClick={this.showEvents} size="lg">
          Show Events
        </Button>
        <Row>
          <Col lg="12">
            <br />
            {comp}
          </Col>
        </Row>
      </div>
    );
  }
}
export default ShowAllEvents;
