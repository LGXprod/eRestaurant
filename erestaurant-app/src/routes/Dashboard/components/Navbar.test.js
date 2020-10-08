import React from 'react';
import { shallow } from 'enzyme';
import ReactDOM from 'react-dom';
import Navbar from './Navbar';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Navbar />, div);
});
