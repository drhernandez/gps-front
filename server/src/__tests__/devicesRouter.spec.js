const supertest = require('supertest')
const server = require('../server/server')

jest.mock("../clients/apiClient", () => ({ get: jest.fn() }));
const apiClient = require("../clients/apiClient");

describe('Devices router test', () => {

  beforeAll(() => {
    jest.resetModules()
  })

  it('should fail on get device', async (done) => {

    await apiClient.get.mockImplementation(() => {
      return Promise.reject({ message: "Test error" });
    });

    supertest(server)
      .get('/api/devices/1')
      .expect(500, "\"Test error\"")
      .end(done)
  })

  it('should return ok on get device', async (done) => {

    await apiClient.get.mockImplementation(() => {
      return Promise.resolve({
        status: 200,
        data: {
          id: 1,
          status: 'ACTIVE'
        }
      });
    });

    supertest(server)
      .get('/api/devices/1')
      .expect(200, {
        id: 1,
        status: 'ACTIVE'
      })
      .end(done)
  })
})