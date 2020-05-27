import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
const mockStore = configureStore([]);

jest.mock("../../api/services/vehiclesService", () => ({ searchVehicles: jest.fn(), searchTrackings: jest.fn() }));
import VehiclesService from '../../api/services/vehiclesService';

import HeatMap from '../HeatMap';

function flushPromises() {
  return new Promise(resolve => setImmediate(resolve));
}

let store;
let searchMock;
let trackingsMock;

describe('HeatMap component', () => {
  beforeEach(async () => {
    jest.resetModules();
    jest.useFakeTimers()

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
          plate: "AA111AA",
          device: {
            id: 3
          }
        }
      ],
      paging: {
        total: 1
      }
    }

    trackingsMock = {
      data: [
        {
          "id": 1,
          "device_id": 1,
          "lat": -31.422108,
          "lng": -64.18643
        },
        {
          "id": 2,
          "device_id": 1,
          "lat": -31.422218,
          "lng": -64.18578
        },
        {
          "id": 3,
          "device_id": 1,
          "lat": -31.422731,
          "lng": -64.184845
        },
        {
          "id": 4,
          "device_id": 1,
          "lat": -31.42284,
          "lng": -64.183945
        },
        {
          "id": 5,
          "device_id": 1,
          "lat": -31.423098,
          "lng": -64.18351
        },
        {
          "id": 6,
          "device_id": 1,
          "lat": -31.423016,
          "lng": -64.183205
        }
      ],
      paging: {
        total: 6
      }
    }

    await VehiclesService.searchVehicles.mockImplementation(() => {
      return Promise.resolve(searchMock);
    });
    await VehiclesService.searchTrackings.mockImplementation(() => {
      return Promise.resolve(trackingsMock);
    });
  });

  it("snapshot renders", () => {

    const component = renderer.create(
      <Provider store={store}>
        <HeatMap />
      </Provider>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should exist the vehicle on FormSelect options", async () => {
    const wrapper = mount(
      <Provider store={store}>
        <HeatMap />
      </Provider>
    );

    await flushPromises();
    wrapper.update();

    expect(wrapper.find('option')).toHaveLength(2);
    expect(wrapper.find('option').at(1).text()).toBe("Frod Fiesta - AA111AA");
  });

  it("should get trackings of selected vehicle", async () => {
    const wrapper = mount(
      <Provider store={store}>
        <HeatMap />
      </Provider>
    );

    await flushPromises();
    wrapper.update();

    expect(wrapper.find('CardBody').props().children.props.trackings).toHaveLength(0);

    const mockedEvent = {
      target: {
        value: 1
      },
      preventDefault: () => {},
      persist: () => {}
    }
    wrapper.find('FormSelect').props().onChange(mockedEvent);

    jest.runAllTimers();
    await flushPromises();
    wrapper.update();

    //Map should have 6 marquers
    debugger
    expect(wrapper.find('CardBody').props().children.props.trackings).toHaveLength(trackingsMock.data.length);
  });
});