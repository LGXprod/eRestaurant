import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home, Registration, Dashboard, BookingPage, UserAccount } from "./routes/Routes";
import './index.css'

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/Registration" component={Registration} />
      <Route path="/Dashboard" component={Dashboard} />
      <Route path="/BookingPage" component={BookingPage} />
      <Route path="/UserAccount" component={UserAccount} />
    </Switch>
  </Router>,
  document.getElementById('root')
);
