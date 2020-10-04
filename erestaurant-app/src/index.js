import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  Home,
  Registration,
  BookingPage,
  UserAccount,
  MenuConfig,
  Menu,
  HomePage
} from "./routes/Routes";
import "./index.css";

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/Registration" component={Registration} />
      <Route path="/Booking" component={BookingPage} />
      <Route path="/UserAccount" component={UserAccount} />
      <Route exact path="/Menu" component={Menu} />
      <Route path="/Menu/Configuration" component={MenuConfig} />
      <Route path="/Dashboard" component={HomePage} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
