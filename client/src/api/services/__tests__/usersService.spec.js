import to from 'await-to-js'
import UsersService from '../usersService'

jest.mock('../baseService', () => {
  return function () {
    return {
      post: jest.fn()
        .mockReturnValueOnce(Promise.reject('Test error'))
        .mockReturnValueOnce(Promise.resolve({
          data: {
            id: 1,
            name: 'test',
            lastname: 'test',
            email: 'test@test.com'
          }
        })),
      get: jest.fn()
        .mockReturnValueOnce(Promise.reject('Test error'))
        .mockReturnValueOnce(Promise.resolve({
          data: {
            id: 1,
            name: 'test',
            lastname: 'test',
            email: 'test@test.com'
          }
        })),
    };
  };
});

describe('UsersService service', () => {

  it('should return an error trying to create an user', async () => {
    const [err, response] = await to(UsersService.createUser())

    expect(err).toEqual('Test error')
    expect(response).toBe(undefined)
  })

  it('should return a new user', async () => {
    const [err, response] = await to(UsersService.createUser())

    expect(err).toBe(null)
    expect(response.id).toBe(1)
    expect(response.name).toBe('test')
    expect(response.lastname).toBe('test')
    expect(response.email).toBe('test@test.com')
  })

  it('should return an error trying to get an user', async () => {
    const [err, response] = await to(UsersService.getUserByEmail('test@test.com'))

    expect(err).toEqual('Test error')
    expect(response).toBe(undefined)
  })

  it('should return the user', async () => {
    const [err, response] = await to(UsersService.getUserByEmail('test@test.com'))

    expect(err).toBe(null)
    expect(response.id).toBe(1)
    expect(response.name).toBe('test')
    expect(response.lastname).toBe('test')
    expect(response.email).toBe('test@test.com')
  })
})