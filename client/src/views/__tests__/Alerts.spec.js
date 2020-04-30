import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
const mockStore = configureStore([]);

jest.mock("../../api/services/vehiclesService", () => ({ searchVehicles: jest.fn(), getVehicleAlerts: jest.fn() }))
import VehiclesService from '../../api/services/vehiclesService'

import Alerts from '../Alerts'

function flushPromises() {
  return new Promise(resolve => setImmediate(resolve));
}

describe('Alerts component', () => {
  let store;

  beforeEach(async () => {
    jest.resetModules();
    store = mockStore({
      userInfo: {
        id: 1
      },
    });

    const vehiclesMock = {
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
    const alertsMock = {
      speed: {
        active: true,
        speed: 100
      },
      movement: {
        active: false
      }
    }

    await VehiclesService.searchVehicles.mockImplementation(() => {
      return Promise.resolve(vehiclesMock);
    });
    await VehiclesService.getVehicleAlerts.mockImplementation(() => {
      return Promise.resolve(alertsMock);
    });
  });

  it("snapshot renders", () => {

    const component = renderer.create(
      <Provider store={store}>
        <Alerts />
      </Provider>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should have 1 cards with vehicle`s alerts", async () => {

    const wrapper = mount(
      <Provider store={store}>
        <Alerts />
      </Provider>
    );

    await flushPromises();

    wrapper.update();
  
    expect(wrapper.find('Card').length).toBe(1)
    expect(wrapper.find('CardHeader').text()).toBe('Frod Fiesta - AA111AA')
  })
});