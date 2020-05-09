import to from 'await-to-js'
import DevicesService from '../devicesService'

jest.mock('../baseService', () => {
  return function () {
    return {
      get: jest.fn()
        .mockReturnValueOnce(Promise.reject('Test error'))
        .mockReturnValueOnce(Promise.resolve({
          data: {
            id: 1,
            physical_id: 11111
          }
        })),
    };
  };
});

describe('Devices service', () => {

  it('should return an error if get fails', async () => {
    const [err, response] = await to(DevicesService.getDeviceById(1))

    expect(err).toEqual('Test error')
    expect(response).toBe(undefined)
  })

  it('should return a device', async () => {
    const [err, response] = await to(DevicesService.getDeviceById(1))

    expect(err).toEqual(null)
    expect(response).toEqual({
      id: 1,
      physical_id: 11111
    })
  })
})