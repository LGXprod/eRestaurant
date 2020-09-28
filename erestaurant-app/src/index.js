import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home, Registration, MenuConfig, Menu } from "./routes/Routes";

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/Registration" component={Registration} />
      <Route path="/Menu" component={Menu} />
      <Route path="/Menu/Configuration" component={MenuConfig} />
    </Switch>
  </Router>,
  document.getElementById('root')
);
