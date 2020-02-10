import React, { Component } from "react";
//import logo from './logo.svg';
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Settings from "./components/settings/Settings";
import Main from "./components/main/Main";

class App extends Component {
  constructor() {
    super();
    this.state = {
      language: 'en',
    }
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/settings" component={Settings} />
        </Switch>
        {/* <Settings /> */}
      </Router>
      //<Settings />
    );
  }
}

export default App;
