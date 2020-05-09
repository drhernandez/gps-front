import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

jest.mock("../../api/services/usersService", () => ({ getUserByEmail: jest.fn() }));
import UsersService from "../../api/services/usersService";
jest.mock("../../api/services/vehiclesService", () => ({ searchVehicles: jest.fn(), getCurrentLocation: jest.fn() }));
import VehiclesService from '../../api/services/vehiclesService';

import ClientTracking from '../ClientTracking';

function flushPromises() {
  return new Promise(resolve => setImmediate(resolve));
}

let userMock;
let vehiclesMock;
let locationMock;

describe('ClientTracking component', () => {
  beforeEach(async () => {
    jest.resetModules();

    userMock = {
      id: 1
    }

    vehiclesMock = {
      data: [
        {
          id: 1,
          brand: "Frod",
          brand_line: "Fiesta",
          plate: "AA111AA"
        }
      ],
      paging: {
        total: 1
      }
    }

    locationMock = {
      "id": 1,
      "device_id": 1,
      "lat": -31.422108,
      "lng": -64.18643
    }

    await UsersService.getUserByEmail.mockImplementation(() => {
      return Promise.resolve(userMock);
    });
    await VehiclesService.searchVehicles.mockImplementation(() => {
      return Promise.resolve(vehiclesMock);
    });
    await VehiclesService.getCurrentLocation.mockImplementation(() => {
      return Promise.resolve(locationMock);
    });
  });

  it("snapshot renders", () => {

    const component = renderer.create(
      <ClientTracking />
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should get user vehicles after search', async () => {
    const wrapper = shallow(
      <ClientTracking />
    )

    expect(wrapper.find('FormSelect').props().disabled).toBe(true)
    expect(wrapper.find('option')).toHaveLength(1)

    const mockedEvent = {
      target: {
        "search-input": {
          value: "test@test.com"
        }
      },
      preventDefault: () => {},
      persist: () => {}
    }
    wrapper.find('CardHeader').children().children().at(0).children().props().searchFunction(mockedEvent) // NavbarSearch
    
    await flushPromises();

    expect(wrapper.find('FormSelect').props().disabled).toBe(false)
    expect(wrapper.find('option')).toHaveLength(2)
  })

  it('should get vehicle locations', async () => {
    const wrapper = shallow(
      <ClientTracking />
    )

    const mockedEvent1 = {
      target: {
        "search-input": {
          value: "test@test.com"
        }
      },
      preventDefault: () => { },
      persist: () => { }
    }
    wrapper.find('CardHeader').children().children().at(0).children().props().searchFunction(mockedEvent1) // NavbarSearch

    await flushPromises();

    const mockedEvent2 = {
      target: {
        value: 1
      },
      preventDefault: () => { },
      persist: () => { }
    }
    wrapper.find('FormSelect').props().onChange(mockedEvent2)

    await flushPromises();

    expect(wrapper.find('CardBody').children().props().markers).toHaveLength(1);
    expect(wrapper.find('CardBody').children().props().markers[0].id).toBe(locationMock.id);
    expect(wrapper.find('CardBody').children().props().markers[0].position.lat).toBe(locationMock.lat);
    expect(wrapper.find('CardBody').children().props().markers[0].position.lng).toBe(locationMock.lng);
  })
});