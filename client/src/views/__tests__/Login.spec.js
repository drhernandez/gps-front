import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { MemoryRouter as Router } from "react-router-dom";
import Login from '../Login'
// import { AuthService } from '../../api/services'
// jest.mock("../../api/services/authService")

it("snapshot renders", () => {
  const component = renderer.create(
    <Router>
      <Login />
    </Router>
  );
  expect(component.toJSON()).toMatchSnapshot();
})

it("Link Olvidaste tu contraseña should redirect to /forgot-password", () => {
  const wrapper = shallow(
    <Login.WrappedComponent />
  );
  
  expect(wrapper.find('Link').at(0).props().to).toBe('/forgot-password')
})

// it("OnSubmit should redirect to home", () => {
//   debugger
//   const historyMock = { push: jest.fn() };
//   const wrapper = mount(
//     <Router>
//       <Login history={historyMock} />
//     </Router>
//   );

//   const event = {
//     email: {
//       value: "test@test.com"
//     },
//     password: {
//       value: "password"
//     }
//   }

//   const mockedEvent = { target: event, preventDefault: () => {}, persist: () => {} }
//   AuthService.login.mockResolvedValue({ user: {} })
//   wrapper.find('Form').prop('onSubmit')(mockedEvent)
//   expect(historyMock.push.mock.calls.length).toBe(1);
// })