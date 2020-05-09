import to from 'await-to-js'
import AuthService from '../authService'

jest.mock('jsonwebtoken', () => ({  decode: jest.fn() }))
import jwt from 'jsonwebtoken'

jest.mock('../baseService', () => {
  return function () {
    return { 
      post: jest.fn()
        .mockReturnValueOnce(Promise.reject('Test error'))
        .mockReturnValueOnce(Promise.resolve({ data: { token: 'access-token' }})),
      get: jest.fn()
        .mockReturnValueOnce(Promise.reject('Test error'))
        .mockReturnValueOnce(Promise.resolve({})),
    };
  };
});

const mockedUserInfo = {
  id: 1,
  name: 'test',
  lastname: 'test',
  email: 'test@test.com'
}

describe('Authorization service', () => {

  it('should return an error if login fails', async () => {
    const [err, response] = await to(AuthService.login('test@test.com', 'password'))

    expect(err).toEqual('Test error')
    expect(response).toBe(undefined)
  })

  it('should return info from token', async () => {
    await jwt.decode.mockImplementation(() => {
      return mockedUserInfo;
    });

    const [err, response] = await to(AuthService.login('test@test.com', 'password'))

    expect(err).toEqual(null)
    expect(response).toBe(mockedUserInfo)
  })

  it('should return an error if token is invalid', async () => {
    const [err, response] = await to(AuthService.verifyToken('token'))

    expect(err).toEqual('Test error')
    expect(response).toBe(undefined)
  })

  it('should return info from verified token', async () => {
    await jwt.decode.mockImplementation(() => {
      return mockedUserInfo;
    });

    const [err, response] = await to(AuthService.verifyToken('token'))

    expect(err).toEqual(null)
    expect(response).toBe(mockedUserInfo)
  })
})