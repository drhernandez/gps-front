const supertest = require('supertest')
const server = require('../server/server')

jest.mock("../clients/apiClient", () => ({ put: jest.fn() }));
const apiClient = require("../clients/apiClient");

describe('Alerts router test', () => {

  beforeAll(() => {
    jest.resetModules()
  })

  it('should fail on speed alert update', async (done) => {

    await apiClient.put.mockImplementation(() => {
      return Promise.reject({message: "Test error"});
    });

    supertest(server)
      .put('/api/alerts/speed/1')
      .set({
        id: 1,
        status: 'ACTIVE'
      })
      .expect(500, "\"Test error\"")
      .end(done)
  })

  it('should return ok on speed alert update', async (done) => {

    await apiClient.put.mockImplementation(() => {
      return Promise.resolve({
        status: 200,
        data: {
          id:1, 
          status: 'ACTIVE'
        }
      });
    });

    supertest(server)
      .put('/api/alerts/speed/1')
      .set({
        id: 1,
        status: 'ACTIVE'
      })
      .expect(200, {
        id: 1,
        status: 'ACTIVE'
      })
      .end(done)
  })

  it('should fail on movements alert update', async (done) => {

    await apiClient.put.mockImplementation(() => {
      return Promise.reject({ message: "Test error" });
    });

    supertest(server)
      .put('/api/alerts/movement/1')
      .set({
        id: 1,
        status: 'ACTIVE'
      })
      .expect(500, "\"Test error\"")
      .end(done)
  })

  it('should return ok on movements alert update', async (done) => {

    await apiClient.put.mockImplementation(() => {
      return Promise.resolve({
        status: 200,
        data: {
          id: 1,
          status: 'ACTIVE'
        }
      });
    });

    supertest(server)
      .put('/api/alerts/movement/1')
      .set({
        id: 1,
        status: 'ACTIVE'
      })
      .expect(200, {
        id: 1,
        status: 'ACTIVE'
      })
      .end(done)
  })
})