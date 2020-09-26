import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Helmet } from "react-helmet";
import HomePage from './components/HomePage';
import BookingPage from './components/BookingPage';
import UserAccount from './components/UserAccount';

class Dashboard extends Component {
  render(){
    return (
      <BrowserRouter>
      <div className="Dashboard">
      <Helmet>
        <title>Dineout | Order food and book a table</title>
      </Helmet>
      <Route exact path ='/Dashboard' component={HomePage} />
      <Route path='/BookingPage' component={BookingPage} />
      <Route path='/UserAccount' component={UserAccount} />
      </div>
      </BrowserRouter>
    );
  }
}

export default Dashboard;
