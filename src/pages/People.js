import React from "react";
import {
  Container,
  Row,
  Col
} from "reactstrap";
import { BrowserRouter as Router, Route, NavLink} from "react-router-dom";
import CreatePerson from '../components/CreatePerson';
import ShowAllPeople from '../components/ShowAllPeople';
import UpdatePerson from '../components/UpdatePerson';
import DeletePerson from '../components/DeletePerson';
import "./People.css";

function Events(){
    return (
      <Router>
      <Container>
        <Row>
          <Col lg="12" className="sub-nav">
          <NavLink to="/people-list/">SHOW ALL PEOPLE</NavLink>
          <NavLink to="/create-person/">CREATE A PERSON</NavLink>
          <NavLink to="/update-person/">UPDATE THE PERSON</NavLink>
          <NavLink to="/delete-person/">DELETE THE PERSON</NavLink>
          </Col>
     
        </Row>
        <Route path="/create-person/" component={CreatePerson} />
        <Route path="/people-list/" component={ShowAllPeople} />
        <Route path="/update-person/" component={UpdatePerson} />
        <Route path="/delete-person/" component={DeletePerson} />



      </Container>
      </Router>
    );
  }


export default Events;
