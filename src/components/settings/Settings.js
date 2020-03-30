import React from "react";
import { Switch, Route } from "react-router-dom";
import About from "./About";
import NavBar from "./NavBar";
import Profile from "./Profile";
import PasswordPopup from "./popUp/PasswordPopup";

function Settings() {
  return (
    // <Router>
    <div>
      <PasswordPopup />
      <div
        style={{
          display: "inline-block",
          float: "left",
          backgroundColor: "blue"
        }}
      >
        <NavBar />
      </div>
      <div
        style={{
          display: "inline-block",
          width: "80%",
          alignItems: "center"
        }}
      >
        <Switch>
          <Route path="/settings" exact component={Profile} />
          <Route path="/settings/about" component={About} />
        </Switch>
      </div>
    </div>
    // </Router>
  );
}

export default Settings;
