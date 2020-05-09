import to from 'await-to-js'
import AlertsService from '../alertsService'

jest.mock('../baseService', () => {
  return function () {
    return {
      put: jest.fn()
        .mockReturnValueOnce(Promise.resolve())
        .mockReturnValueOnce(Promise.reject('Test error'))
        .mockReturnValueOnce(Promise.resolve())
        .mockReturnValueOnce(Promise.resolve())
    };
  };
});

describe('Alerts service', () => {

  it( 'should return an error if apicall fails', async () => {
    const alerts = {
      speed: {
        id: 1
      },
      movement: {
        id: 1
      }
    }

    const [err, response] = await to(AlertsService.updateAlerts(alerts));
    expect(err).toBe('Test error')
    expect(response).toBe(undefined)
  })

  it('should return true if alerts were updated', async () => {
    const alerts = {
      speed: {
        id: 1
      },
      movement: {
        id: 1
      }
    }

    const [err, response] = await to(AlertsService.updateAlerts(alerts));
    expect(err).toBe(null)
    expect(response).toBe(true)
  })
})