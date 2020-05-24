import to from 'await-to-js'
import RecoveryService from '../recoveryService'

jest.mock('../baseService', () => {
  return function () {
    return {
      post: jest.fn()
        .mockReturnValueOnce(Promise.reject('Test error'))
        .mockReturnValueOnce(Promise.resolve())
        .mockReturnValueOnce(Promise.reject('Test error'))
        .mockReturnValueOnce(Promise.resolve()),
      put: jest.fn()
        .mockReturnValueOnce(Promise.reject('Test error'))
        .mockReturnValueOnce(Promise.resolve()),
    };
  };
});

describe('RecoveryService service', () => {

  it('should return an error trying to generate token', async () => {
    const [err, response] = await to(RecoveryService.generateToken("test@test.com"))

    expect(err).toEqual('Test error')
    expect(response).toBe(undefined)
  })

  it('should return ok after validating token', async () => {
    const [err, response] = await to(RecoveryService.generateToken("test@test.com"))

    expect(err).toBe(null)
    expect(response).toBe(undefined)
  })

  it('should return an error trying to validate recovery_id', async () => {
    const [err, response] = await to(RecoveryService.validateRecoveryId('id'))

    expect(err).toEqual('Test error')
    expect(response).toBe(undefined)
  })

  it('should return ok after validatig recovery_id', async () => {
    const [err, response] = await to(RecoveryService.validateRecoveryId('id'))

    expect(err).toBe(null)
    expect(response).toBe(undefined)
  })

  it('should return an error trying to resetPassword', async () => {
    const [err, response] = await to(RecoveryService.resetPassword('token', 'password'))

    expect(err).toEqual('Test error')
    expect(response).toBe(undefined)
  })

  it('should return ok after reseting password', async () => {
    const [err, response] = await to(RecoveryService.resetPassword('token', 'password'))

    expect(err).toBe(null)
    expect(response).toBe(undefined)
  })
})