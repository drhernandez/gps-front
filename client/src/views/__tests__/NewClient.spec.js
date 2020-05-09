import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme'

jest.mock("../../api/services/rolesService", () => ({ getRoles: jest.fn()}))
import RolesService from "../../api/services/rolesService"
jest.mock("../../api/services/usersService", () => ({ createUser: jest.fn() }))
import UsersService from "../../api/services/usersService"

import NewClient from '../NewClient';

function flushPromises() {
  return new Promise(resolve => setImmediate(resolve));
}

let mockedRoles = [
  {
    id: 1,
    name: "CLIENTE"
  },
  {
    id: 2,
    name: "ADMIN"
  }
]

describe('NewClient component', () => {
  beforeEach(async () => {
    jest.resetModules();

    await RolesService.getRoles.mockImplementation(() => {
      return Promise.resolve(mockedRoles);
    })
    await UsersService.createUser.mockImplementation(() => {
      return Promise.resolve({});
    })
  });

  it("snapshot renders", () => {

    const component = renderer.create(
      <NewClient />
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should activate errors on missing / invalid fields", () => {
    const wrapper = shallow(
      <NewClient />
    );

    const mockedEvent = {
      target : {
        name: {},
        lastname: {},
        dni: {},
        email: {},
        role: {},
        tel: {},
        address: {},
        zipcode: {}
      },
      preventDefault : () => {},
      persist: () => {}
    }

    wrapper.instance().createNewClient(mockedEvent);
    wrapper.update();

    const errors = [
      'Campo requerido',
      'Solo se permiten números',
      'La dirección de correo no es válida. Una dirección válida se vería así: micorreo@dominio.com'
    ]

    expect(wrapper.find('FormFeedback')).toHaveLength(10);
    wrapper.find('FormFeedback').forEach(ff => {
      expect(errors).toContain(ff.children().text());
    })
  });

  it("should call UsersService.createUser", () => {
    debugger
    const wrapper = shallow(
      <NewClient />
    );

    const mockedEvent = {
      target: {
        name: {
          value: "name"
        },
        lastname: {
          value: "lastname"
        },
        dni: {
          value: "11111111"
        },
        email: {
          value: "test@test.com"
        },
        role: {
          value: "role"
        },
        tel: {
          value: "35151122334"
        },
        address: {
          value: "address"
        },
        zipcode: {
          value: "zipcode"
        }
      },
      preventDefault: () => { },
      persist: () => { }
    }

    wrapper.instance().createNewClient(mockedEvent);
    wrapper.update();

    expect(UsersService.createUser).toHaveBeenCalledWith({
      name: mockedEvent.target.name.value,
      last_name: mockedEvent.target.lastname.value,
      dni: mockedEvent.target.dni.value,
      email: mockedEvent.target.email.value,
      phone: mockedEvent.target.tel.value,
      address: mockedEvent.target.address.value,
      role: mockedEvent.target.role.value
    })
  });
});