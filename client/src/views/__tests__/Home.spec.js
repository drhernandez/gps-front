import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
const mockStore = configureStore([]);

jest.mock("../../api/services/vehiclesService", () => ({ searchVehicles: jest.fn(), getCurrentLocation: jest.fn() }));
import VehiclesService from '../../api/services/vehiclesService';

import Home from '../Home';

function flushPromises() {
  return new Promise(resolve => setImmediate(resolve));
}

let store;
let searchMock;
let locationMock;

describe('Home component', () => {
  beforeEach(async () => {
    jest.resetModules();
    
    store = mockStore({
      userInfo: {
        id: 1
      },
    });

    searchMock = {
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

    await VehiclesService.searchVehicles.mockImplementation(() => {
      return Promise.resolve(searchMock);
    });
    await VehiclesService.getCurrentLocation.mockImplementation(() => {
      return Promise.resolve(locationMock);
    });
  });

  it("snapshot renders", () => {

    const component = renderer.create(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should exist the vehicle on FormSelect options", async () => {
    const wrapper = mount(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    await flushPromises();
    wrapper.update();

    expect(wrapper.find('option')).toHaveLength(2);
    expect(wrapper.find('option').at(1).text()).toBe("Frod Fiesta - AA111AA");
  });

  it("should get location of selected vehicle", async () => {
    debugger
    const wrapper = mount(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    await flushPromises();
    wrapper.update();

    expect(wrapper.find('CardBody').props().children.props.markers).toHaveLength(0);

    const mockedEvent = {
      target: {
        value: 1
      },
      preventDefault: () => { },
      persist: () => { }
    }
    wrapper.find('FormSelect').props().onChange(mockedEvent);

    await flushPromises();
    wrapper.update();

    expect(wrapper.find('CardBody').props().children.props.markers).toHaveLength(1);
    expect(wrapper.find('CardBody').props().children.props.markers[0].id).toBe(locationMock.id);
    expect(wrapper.find('CardBody').props().children.props.markers[0].position.lat).toBe(locationMock.lat);
    expect(wrapper.find('CardBody').props().children.props.markers[0].position.lng).toBe(locationMock.lng);
  });
});