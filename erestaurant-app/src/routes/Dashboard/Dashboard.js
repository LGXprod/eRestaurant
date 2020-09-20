import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Helmet } from "react-helmet";
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import BookingPage from './components/BookingPage';

class Dashboard extends Component {
  render(){
    return (
      <BrowserRouter>
      <div className="Dashboard">
      <Helmet>
        <title>Dineout | Order food and book a table</title>
      </Helmet>
      <Navbar />
      <Route exact path ='/Dashboard' component={HomePage} />
      <Route path='/BookingPage' component={BookingPage} />
      </div>
      </BrowserRouter>
    );
  }
}

export default Dashboard;
