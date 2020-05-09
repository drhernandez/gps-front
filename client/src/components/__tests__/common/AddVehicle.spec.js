import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'

jest.mock("../../../api/services/vehiclesService", () => ({ getBrands: jest.fn(), getBrandLines: jest.fn(), createVehicle: jest.fn()}))
import VehiclesService from "../../../api/services/vehiclesService"

import AddVehicle from '../../common/AddVehicle'

function flushPromises() {
  return new Promise(resolve => setImmediate(resolve));
}

describe('AddVehicle component', () => {

  beforeEach(async () => {
    jest.resetModules();
    
    await VehiclesService.getBrands.mockImplementation(() => {
      return Promise.resolve([
        { "id": 5, "name": "BMW" }
      ]);
    })
    await VehiclesService.getBrandLines.mockImplementation(() => {
      return Promise.resolve([
        { "id": 26, "name": "SERIE1" },
        { "id": 27, "name": "SERIE3" },
        { "id": 28, "name": "SERIE5" },
        { "id": 29, "name": "SERIE6" }
      ]);
    })
    await VehiclesService.createVehicle.mockImplementation(() => {
      return Promise.resolve({});
    })
  })

  it('snapshot test', () => {
    const component = renderer.create(
      <AddVehicle />
    )

    expect(component.toJSON()).toMatchSnapshot()
  })

  it('should load brand on componentDidmount', async () => {
    const wrapper = shallow(
      <AddVehicle />
    )

    await flushPromises();
    wrapper.update();

    expect(wrapper.state().brands).toHaveLength(1)
    expect(wrapper.state().brands[0].name).toBe('BMW')
  })

  it('should load brandlines when a brand is selected', async () => {
    const wrapper = shallow(
      <AddVehicle />
    )

    await flushPromises();

    expect(wrapper.state().brand).toBe(null)
    expect(wrapper.state().brandLines).toHaveLength(0)

    const mockedEvent = {
      target: {
        value: 5
      },
      preventDefault: () => {}
    }
    wrapper.find('FormSelect').at(0).props().onChange(mockedEvent);

    await flushPromises();
    
    expect(wrapper.state().brand).toBe('BMW')
    expect(wrapper.state().brandLines).toHaveLength(4)
  })

  it('should set brandline on state after one is selected', async () => {
    const wrapper = shallow(
      <AddVehicle />
    )

    await flushPromises();

    wrapper.setState({
      brandLines: [
        { "id": 26, "name": "SERIE1" },
        { "id": 27, "name": "SERIE3" },
        { "id": 28, "name": "SERIE5" },
        { "id": 29, "name": "SERIE6" }
      ]
    })

    const mockedEvent = {
      target: {
        value: 27
      },
      preventDefault: () => { }
    }
    wrapper.find('FormSelect').at(1).props().onChange(mockedEvent);

    expect(wrapper.state().brandLine).toBe('SERIE3')
  })

  it('should call VehiclesService.createVehicle on form submit', async () => {
    debugger
    const parentAddVehicle = jest.fn()
    const props = {
      userId: 1,
      addVehicle: parentAddVehicle
    }
    const wrapper = shallow(
      <AddVehicle {...props}/>
    )

    await flushPromises();

    wrapper.setState({
      brand: "BMW",
      brandLine: "SERIE3"
    })

    const mockedEvent = {
      target: {
        plate: {
          value: 'AA111AA'
        }
      },
      preventDefault: () => {},
      persist: () => {}
    }
    wrapper.find('Form').props().onSubmit(mockedEvent);

    await flushPromises();

    expect(parentAddVehicle).toHaveBeenCalled()
    expect(VehiclesService.createVehicle).toHaveBeenCalledWith({
      user_id: 1,
      brand: 'BMW',
      brand_line: 'SERIE3',
      plate: 'AA111AA'
    })
  })
})