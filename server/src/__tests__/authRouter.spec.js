const supertest = require('supertest')
const server = require('../server/server')

jest.mock("../clients/authClient", () => ({ post: jest.fn() }));
const authClient = require("../clients/authClient");

describe('Authentication router test', () => {

  beforeAll(() => {
    jest.resetModules()
  })

  it('should fail on login error', async done => {

    await authClient.post.mockImplementation(() => {
      return Promise.reject({ message: "Test error" });
    });

    supertest(server)
      .post('/api/auth/login')
      .expect(500, "\"Test error\"")
      .end(done)
  })

  it('should return ok login error', async done => {

    await authClient.post.mockImplementation(() => {
      return Promise.resolve({
        status: 200
      });
    });

    supertest(server)
      .post('/api/auth/login')
      .expect(200)
      .end(done)
  })

  it('should fail on validate error', async done => {

    await authClient.post.mockImplementation(() => {
      return Promise.reject({ message: "Test error" });
    });

    supertest(server)
      .get('/api/auth/validate')
      .expect(500, "\"Test error\"")
      .end(done)
  })

  it('should return ok on validate', async done => {

    await authClient.post.mockImplementation(() => {
      return Promise.resolve({
        status: 200
      });
    });

    supertest(server)
      .get('/api/auth/validate')
      .expect(200)
      .end(done)
  })
})