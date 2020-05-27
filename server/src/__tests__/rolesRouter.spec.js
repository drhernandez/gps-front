const supertest = require('supertest')
const server = require('../server/server')

jest.mock("../clients/authClient", () => ({ get: jest.fn() }));
const authClient = require("../clients/authClient");

describe('Roles router test', () => {

  beforeAll(() => {
    jest.resetModules()
  })

  it('should fail on get roles', async (done) => {

    await authClient.get.mockImplementation(() => {
      return Promise.reject({ message: "Test error" });
    });

    supertest(server)
      .get('/api/roles')
      .expect(500, "\"Test error\"")
      .end(done)
  })

  it('should return ok on get roles', async (done) => {

    await authClient.get.mockImplementation(() => {
      return Promise.resolve({
        status: 200,
        data: [
          {
            id: 1,
            name: 'CLIENT'
          }
        ]
      });
    });

    supertest(server)
      .get('/api/roles')
      .expect(200, [
        {
          id: 1,
          name: 'CLIENT'
        }
      ])
      .end(done)
  })
})