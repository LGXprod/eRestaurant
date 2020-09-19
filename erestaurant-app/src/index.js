import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home, Registration } from "./routes/Routes";

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/Registration" component={Registration} />
    </Switch>
  </Router>,
  document.getElementById('root')
);
