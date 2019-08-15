import React, { Component } from "react";
import {
  Row,
  Col,
  InputGroup,
  Input,
  InputGroupAddon,
  Button,
  Table,
} from "reactstrap";
import "../pages/People.css";
class ShowAllPeople extends Component {
  constructor(props) {
    super(props);
    this.state = {
      API: "99824f989930fca6e85f2ad5e9a47f7a3866c742257d1dcbb37e24139e598fe5",
      NationSlug: "jimmysandbox",
      people: []
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
  showPeople = async () => {

    let dataObj = {
        apikey: this.state.API,
        site_slug : this.state.NationSlug
    }
    let myObj = JSON.stringify(dataObj);



    let response = await fetch(
      "https://nationbuilder-nodesv.herokuapp.com/people/" + myObj
    );
    let json = await response.json();
    console.log(json.results);
    this.setState({
      people: json.results
    });
  };
  render() {
    var comp;
    if (this.state.people.length) {
      
      comp = (
        <Table>
          <thead>
            <tr>
              <th>#ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Employer</th>
            </tr>
          </thead>
          <tbody>
            {this.state.people.map((person, index) => (
              
              <tr key={index}>
                <th>{person.id}</th>
                <td>{person.first_name} {person.last_name} </td>
                <td>
                  {person.email}
                </td>
                <td>{person.employer}</td>
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
        <Button color="success" onClick={this.showPeople} size="lg">
          Show People
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
export default ShowAllPeople;
