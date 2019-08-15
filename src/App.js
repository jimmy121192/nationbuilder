import React from "react";
import { BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';
import Events from "./pages/Events";
import People from "./pages/People";
import Header from "./components/Header";
import {
  Container,
  Row,
  Col,
  Badge

} from "reactstrap";

function Index() {
  return 
  <Container>
    <Row>
      <Col lg="12">
        <Badge color="info">Introduction</Badge><br/>
        <h5>
          This web application is for Nation Builder Developer Exercises.
          The application was built with React.js and Node.js.
  
        </h5><br/>
        <p>Jimmy Truong - Pace Creative Group</p>
      </Col>
    </Row>
  </Container>

}



function App (){
  return (
    <Router>
      <div>

        <Header/>
        <Route path="/" exact component={Index} />
        <Route path="/people/" component={People} />
        <Route path="/events/" component={Events} />
   
      </div>
    </Router>
  );
}

export default App;