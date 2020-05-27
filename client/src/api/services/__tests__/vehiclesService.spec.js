import to from "await-to-js";
import VehiclesService from '../vehiclesService'

jest.mock('../devicesService', () => ({ getDeviceById: jest.fn() }))
import DevicesService from '../devicesService'

function flushPromises() {
  return new Promise(resolve => setImmediate(resolve));
}

jest.mock('../baseService', () => {
  return function () {
    return {
      get: jest.fn()
        .mockImplementationOnce(() => { return Promise.reject('Test error') })
        .mockImplementationOnce(() => {
          return Promise.resolve({
            data: {
              data: [{
                id: 1,
                brand: 'Ford',
                device_id: 5,
                status: 'ACTIVE'
              }],
              paging: {
                total: 1
              }
            }
          })
        })
        .mockImplementationOnce(() => { return Promise.reject('Test error') })
        .mockImplementationOnce(() => {
          return Promise.resolve({
            data: {
              lat: 63.4932,
              lng: -15.3123
            }
          })
        })
        .mockImplementationOnce(() => { return Promise.reject('Test error') })
        .mockImplementationOnce(() => {
          return Promise.resolve({
            data: [
              {
                lat: 63.4932,
                lng: -15.3123
              },
              {
                lat: 63.4932,
                lng: -15.3123
              },
              {
                lat: 63.4932,
                lng: -15.3123
              },
              {
                lat: 63.4932,
                lng: -15.3123
              }
            ]
          })
        })
        .mockImplementationOnce(() => { return Promise.reject('Test error') })
        .mockImplementationOnce(() => {
          return Promise.resolve({
            data: {
              status: 'ACTIVE',
              speed: 100
            }
          })
        })
        .mockImplementationOnce(() => { return Promise.reject('Test error') })
        .mockImplementationOnce(() => {
          return Promise.resolve({
            data: {
              status: 'INACTIVE'
            }
          })
        })
        .mockImplementationOnce(() => { return Promise.reject('Test error') })
        .mockImplementationOnce(() => { return Promise.reject('Test error') })
        .mockImplementationOnce(() => {
          return Promise.resolve({
            data: {
              status: 'ACTIVE',
              speed: 100
            }
          })
        })
        .mockImplementationOnce(() => {
          return Promise.resolve({
            data: {
              status: 'ACTIVE'
            }
          })
        })
        .mockImplementationOnce(() => { return Promise.reject('Test error') })
        .mockImplementationOnce(() => {
          return Promise.resolve({
            data: [
              {
                id: 1,
                name: 'BMW'
              },
              {
                id: 2,
                name: 'Fiat'
              },
              {
                id: 3,
                name: 'Ford'
              }
            ]
          })
        })
        .mockImplementationOnce(() => { return Promise.reject('Test error') })
        .mockImplementationOnce(() => {
          return Promise.resolve({
            data: [
              {
                id: 1,
                name: 'SERIEA'
              },
              {
                id: 2,
                name: 'SERIEB'
              }
            ]
          })
        }),
      post: jest.fn()
        .mockImplementationOnce(() => { return Promise.reject('Test error') })
        .mockImplementationOnce(() => {
          return Promise.resolve({
            data: {
              id: 1,
              brand: 'Ford',
              device_id: 5,
              status: 'ACTIVE'
            }
          })
        }),
      put: jest.fn()
        .mockImplementationOnce(() => { return Promise.reject('Test error') })
        .mockImplementationOnce(() => {
          return Promise.resolve({
            data: {
              id: 2,
              brand: 'Fiat',
              device_id: 8,
              status: 'ACTIVE'
            }
          })
        }),
      delete: jest.fn()
        .mockImplementationOnce(() => { return Promise.reject('Test error') })
        .mockImplementationOnce(() => {
          return Promise.resolve({
            data: {
              id: 2,
              brand: 'Fiat',
              device_id: 8,
              status: 'DELETED'
            }
          })
        })
    };
  };
});

describe('Vehicles service', () => {

  it('should return an error trying to get vehicles', async () => {

    const [err, response] = await to(VehiclesService.searchVehicles(1))

    expect(err).toEqual('Test error')
    expect(response).toEqual(undefined)
  })

  it('should return all user`s vehicles', async () => {
    await DevicesService.getDeviceById.mockImplementation(() => {
      return Promise.resolve({
        id: 5,
        physical_id: 1111
      })
    })

    await flushPromises()

    const [err, response] = await to(VehiclesService.searchVehicles(1))

    expect(err).toBe(null)
    expect(response).toEqual({ "data": [{ "brand": "Ford", "device": { "id": 5, "physical_id": 1111 }, "id": 1, "status": "ACTIVE" }], "paging": { "total": 1 } })
  })

  it('should return an error trying to create a vehicle', async () => {
    const [err, response] = await to(VehiclesService.createVehicle({}))

    expect(err).toEqual('Test error')
    expect(response).toBe(undefined)
  })

  it('should return a new vehicle', async () => {
    const [err, response] = await to(VehiclesService.createVehicle({}))

    expect(err).toBe(null)
    expect(response.id).toBe(1)
    expect(response.brand).toBe('Ford')
    expect(response.device_id).toBe(5)
    expect(response.status).toBe('ACTIVE')
  })

  it('should return an error trying to get a location', async () => {
    const [err, response] = await to(VehiclesService.getCurrentLocation(1))

    expect(err).toEqual('Test error')
    expect(response).toBe(undefined)
  })

  it('should return vehicle`s location', async () => {
    const [err, response] = await to(VehiclesService.getCurrentLocation(1))

    expect(err).toBe(null)
    expect(response.lat).toBe(63.4932)
    expect(response.lng).toBe(-15.3123)
  })

  it('should return an error trying to search trackings with deviceId null', async () => {
    const [err, response] = await to(VehiclesService.searchTrackings({}))

    expect(err.message).toEqual('parameter deviceId is required for trackings search')
    expect(response).toBe(undefined)
  })

  it('should return an error trying to search trackings with invalid date format', async () => {
    const [err, response] = await to(VehiclesService.searchTrackings({ deviceId: 1, startDate: "test" }))

    expect(err.message).toEqual("filters.startDate.toISOString is not a function")
    expect(response).toBe(undefined)
  })

  it('should return an error trying to search trackings with invalid limit', async () => {
    const [err, response] = await to(VehiclesService.searchTrackings({ deviceId: 1, limit: 5000 }))

    expect(err.message).toEqual("parameter limit cant be greater than 1000")
    expect(response).toBe(undefined)
  })

  it('should return an error trying to search trackings', async () => {
    const [err, response] = await to(VehiclesService.searchTrackings({ deviceId: 1}))

    expect(err).toEqual('Test error')
    expect(response).toBe(undefined)
  })

  it('should return trackings', async () => {
    const [err, response] = await to(VehiclesService.searchTrackings({ deviceId: 1 }))

    expect(err).toBe(null)
    expect(response).toHaveLength(4)
  })

  it('should return an error trying to get speed alert', async () => {
    const [err, response] = await to(VehiclesService.getVehicleSpeedAlert(1))

    expect(err).toEqual('Test error')
    expect(response).toBe(undefined)
  })

  it('should return vehicle`s speed alert', async () => {
    const [err, response] = await to(VehiclesService.getVehicleSpeedAlert(1))

    expect(err).toBe(null)
    expect(response.status).toBe('ACTIVE')
    expect(response.speed).toBe(100)
  })

  it('should return an error trying to get movement alert', async () => {
    const [err, response] = await to(VehiclesService.getVehicleMovementAlert(1))

    expect(err).toEqual('Test error')
    expect(response).toBe(undefined)
  })

  it('should return vehicle`s movement alert', async () => {
    const [err, response] = await to(VehiclesService.getVehicleMovementAlert(1))

    expect(err).toBe(null)
    expect(response.status).toBe('INACTIVE')
  })

  it('should return an error trying to get both alert', async () => {
    const [err, response] = await to(VehiclesService.getVehicleAlerts(1))

    expect(err).toEqual('Test error')
    expect(response).toBe(undefined)
  })

  it('should return vehicle`s alerts', async () => {
    const [err, response] = await to(VehiclesService.getVehicleAlerts(1))

    expect(err).toBe(null)
    expect(response.speed.status).toBe('ACTIVE')
    expect(response.speed.speed).toBe(100)
    expect(response.movement.status).toBe('ACTIVE')
  })

  it('should return an error trying to activate vehicle', async () => {
    const [err, response] = await to(VehiclesService.activate(2, 1111))

    expect(err).toEqual('Test error')
    expect(response).toBe(undefined)
  })

  it('should return a vehicle', async () => {
    await DevicesService.getDeviceById.mockImplementation(() => {
      return Promise.resolve({
        id: 8,
        physical_id: 9720
      })
    })

    await flushPromises()

    const [err, response] = await to(VehiclesService.activate(2, 1111))

    expect(response.id).toBe(2)
    expect(response.brand).toBe('Fiat')
    expect(response.device.id).toBe(8)
    expect(response.device.physical_id).toBe(9720)
    expect(response.status).toBe('ACTIVE')
  })

  it('should return an error trying to delete a vehicle', async () => {
    const [err, response] = await to(VehiclesService.deleteVehicle(1))

    expect(err).toEqual('Test error')
    expect(response).toBe(undefined)
  })

  it('should return the vehicle with deleted status', async () => {
    const [err, response] = await to(VehiclesService.deleteVehicle(1))

    expect(response.id).toBe(2)
    expect(response.brand).toBe('Fiat')
    expect(response.status).toBe('DELETED')
  })

  it('should return an error trying to get brands list', async () => {
    const [err, response] = await to(VehiclesService.getBrands())

    expect(err).toEqual('Test error')
    expect(response).toBe(undefined)
  })

  it('should return the brands list', async () => {
    const [err, response] = await to(VehiclesService.getBrands())

    expect(response).toHaveLength(3)
  })

  it('should return an error trying to get brandlines list', async () => {
    const [err, response] = await to(VehiclesService.getBrandLines(1))

    expect(err).toEqual('Test error')
    expect(response).toBe(undefined)
  })

  it('should return the brandlines list', async () => {
    const [err, response] = await to(VehiclesService.getBrandLines(1))

    expect(response).toHaveLength(2)
  })
})