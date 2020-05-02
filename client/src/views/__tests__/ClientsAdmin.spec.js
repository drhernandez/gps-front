import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';

jest.mock("../../api/services/usersService", () => ({ getUserByEmail: jest.fn() }));
jest.mock("../../api/services/vehiclesService", () => ({ searchVehicles: jest.fn() }));
import UsersService from '../../api/services/usersService';
import VehiclesService from '../../api/services/vehiclesService';

import ClientsAdmin from '../ClientsAdmin';

function flushPromises() {
  return new Promise(resolve => setImmediate(resolve));
}

const mockedUser = {
  name: 'test',
  last_name: 'test',
  dni: 33444555,
  email: 'test@test.com',
  vehicles: []
}

const mockedVehicleSearch = {
  data: [
    {
      id: 1,
      brand: "Frod",
      brand_line: "Fiesta",
      plate: "AA111AA",
      device: {
        physical_id: 1
      }
    }
  ]
}

describe('ClientsAdmin component', () => {
  beforeEach(async () => {
    jest.resetModules();
    await UsersService.getUserByEmail.mockImplementation(() => {
      return Promise.resolve(mockedUser);
    });
    await VehiclesService.searchVehicles.mockImplementation(() => {
      return Promise.resolve(mockedVehicleSearch);
    });
  });

  it("snapshot renders", () => {

    const component = renderer.create(
      <ClientsAdmin />
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should draw container with user information", async () => {
    const wrapper = shallow(
      <ClientsAdmin />
    );

    const mockedEvent = {
      target: {
        'search-input': {
          value: 'test@test.com'
        }
      },
      preventDefault: () => {},
      persist: () => {}
    }

    wrapper.instance().search(mockedEvent)

    await flushPromises();
    wrapper.update();
  
    expect(wrapper.find('Container').at(1).children().children().at(0).children().at(1).children().text()).toBe(mockedUser.name)
    expect(wrapper.find('Container').at(1).children().children().at(1).children().at(1).children().text()).toBe(mockedUser.last_name)
    expect(wrapper.find('Container').at(1).children().children().at(2).children().at(1).children().text()).toBe(mockedUser.dni.toString())
    expect(wrapper.find('Container').at(1).children().children().at(3).children().at(1).children().text()).toBe(mockedUser.email)

    const vehicle = mockedVehicleSearch.data[0];
    expect(wrapper.find('tbody').text()).toContain(vehicle.id + vehicle.brand + vehicle.brand_line + vehicle.plate + vehicle.device.physical_id)
  });

  it('should add a new vehicle to user', async () => {
debugger
    const wrapper = shallow(
      <ClientsAdmin />
    );

    const mockedEvent = {
      target: {
        'search-input': {
          value: 'test@test.com'
        }
      },
      preventDefault: () => { },
      persist: () => { }
    }

    wrapper.instance().search(mockedEvent)

    await flushPromises();
    wrapper.update();

    expect(wrapper.find('tbody').children()).toHaveLength(1)

    const newVehicle = {
      brand: 'Chevrolet',
      brand_line: 'Cruze',
      plate: 'BB111BB'
    }

    wrapper.instance().addVehicle(newVehicle);

    expect(wrapper.state().user.vehicles).toHaveLength(2)
    expect(wrapper.find('tbody').children()).toHaveLength(2)
    expect(wrapper.find('tbody').children().at(1).text()).toContain(newVehicle.brand + newVehicle.brand_line + newVehicle.plate)
  })
});