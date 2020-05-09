import to from 'await-to-js'
import RolesService from '../rolesService'

jest.mock('../baseService', () => {
  return function () {
    return {
      get: jest.fn()
        .mockReturnValueOnce(Promise.reject('Test error'))
        .mockReturnValueOnce(Promise.resolve({
          data: [
            {
              id: 1,
              name: 'CLIENTE'
            },
            {
              id: 2,
              name: 'ADMIN'
            }
          ]
        }))
    };
  };
});

describe('RolesService service', () => {

  it('should return an error trying to get roles', async () => {
    const [err, response] = await to(RolesService.getRoles())

    expect(err).toEqual('Test error')
    expect(response).toBe(undefined)
  })

  it('should return all roles', async () => {
    const [err, response] = await to(RolesService.getRoles())

    expect(err).toBe(null)
    expect(response).toEqual([
      {
        id: 1,
        name: 'CLIENTE'
      },
      {
        id: 2,
        name: 'ADMIN'
      }
    ])
  })
})