import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import HomePage from './components/HomePage';


class Dashboard extends Component {
  render(){
    return (
      <HomePage/>
    );
  }
}

export default Dashboard;
