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
  HomePage,
  RestaurantReg,
} from "./routes/Routes";
import "./index.css";

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/Registration" component={Registration} />
      {/* <Route path="/Dashboard" component={Dashboard} /> */}
      <Route path="/Booking" component={BookingPage} />
      <Route path="/UserAccount" component={UserAccount} />
      <Route exact path="/Menu" component={Menu} />
      <Route path="/Menu/Configuration" component={MenuConfig} />
      <Route path="/Dashboard" component={HomePage} />
      <Route path="/Restaurant/Configuration" component={RestaurantReg} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
