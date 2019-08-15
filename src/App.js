import React from "react";
import { BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';
import Events from "./pages/Events";
import People from "./pages/People";
import Header from "./components/Header";

function Index() {
  return <h2>Home</h2>;
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