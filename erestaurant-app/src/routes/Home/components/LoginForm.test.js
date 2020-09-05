import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import ReactDOM from 'react-dom';
import LoginForm from './LoginForm';

import { render} from '@testing-library/react';
import { shallow, configure } from 'enzyme';
import '@testing-library/jest-dom/extend-expect';

it("renders without crashing", ()=> {
    const div = document.createElement("div");
    ReactDOM.render(<LoginForm></LoginForm>, div)
})

it("renders login button", ()=>{
    const {getByTestId} = render(<LoginForm> </LoginForm>)
    expect(getByTestId('buttonTest')).toHaveTextContent("Login")
})

configure({adapter: new Adapter()});
describe('Test button component', () => {
  it('Test click event', () => {
    const mockCallBack = jest.fn();

    const button = shallow((<LoginForm onClick={mockCallBack}> Ok!</LoginForm>));
    button.find('.loginButton').at(0).simulate('click');
    expect(mockCallBack.mock.calls.length).toEqual(1);
  })
})
