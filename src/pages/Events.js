import React from "react";
import {
  Container,
  Row,
  Col
} from "reactstrap";
import { BrowserRouter as Router, Route, NavLink} from "react-router-dom";
import CreateEvent from '../components/CreateEvent';
import UpdateEvent from '../components/UpdateEvent';
import ShowAllEvents from '../components/ShowAllEvents';
import "./Events.css";

function Events(){
    return (
      <Router>
      <Container>
        <Row>
          <Col lg="12" className="sub-nav">
          <NavLink to="/all-events/">SHOW ALL EVENTS</NavLink>
          <NavLink to="/create-event/">CREATE AN EVENT</NavLink>
          <NavLink to="/update-event/">UPDATE AN EVENT</NavLink>
          </Col>
     
        </Row>
        <Route path="/create-event/" component={CreateEvent} />
        <Route path="/all-events/" component={ShowAllEvents} />
        <Route path="/update-event/" component={UpdateEvent} />



      </Container>
      </Router>
    );
  }


export default Events;
