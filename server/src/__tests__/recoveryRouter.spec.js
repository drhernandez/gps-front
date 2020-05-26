const supertest = require('supertest')
const server = require('../server/server')

jest.mock("../clients/authClient", () => ({ post: jest.fn(), put: jest.fn() }));
const authClient = require("../clients/authClient");

describe('Recovery router test', () => {

  beforeAll(() => {
    jest.resetModules()
  })

  it('should fail on create recovery token', async done => {

    await authClient.post.mockImplementation(() => {
      return Promise.reject({ message: "Test error" });
    });

    supertest(server)
      .post('/api/recovery')
      .expect(500, "\"Test error\"")
      .end(done)
  })

  it('should return ok create recovery token', async done => {

    await authClient.post.mockImplementation(() => {
      return Promise.resolve({
        status: 201
      });
    });

    supertest(server)
      .post('/api/recovery')
      .expect(201)
      .end(done)
  })

  it('should fail on recovery token validation', async done => {

    await authClient.post.mockImplementation(() => {
      return Promise.reject({ message: "Test error" });
    });

    supertest(server)
      .post('/api/recovery/validate')
      .expect(500, "\"Test error\"")
      .end(done)
  })

  it('should return ok recovery token validation', async done => {

    await authClient.post.mockImplementation(() => {
      return Promise.resolve({
        status: 200
      });
    });

    supertest(server)
      .post('/api/recovery/validate')
      .expect(200)
      .end(done)
  })

  it('should fail on change password', async done => {

    await authClient.put.mockImplementation(() => {
      return Promise.resolve({status: 401, data: { error: "Unauthorized"}});
    });

    supertest(server)
      .put('/api/recovery/change-password')
      .expect(401, "{\"error\":\"Unauthorized\"}")
      .end(done)
  })

  it('should return ok change password', async done => {

    await authClient.put.mockImplementation(() => {
      return Promise.resolve({
        status: 200
      });
    });

    supertest(server)
      .put('/api/recovery/change-password')
      .expect(200)
      .end(done)
  })
})