const supertest = require('supertest')
const server = require('../server/server')

jest.mock("../clients/authClient", () => ({ get: jest.fn(), post: jest.fn() }));
const authClient = require("../clients/authClient");

describe('Users router test', () => {

  beforeAll(() => {
    jest.resetModules()
  })

  it('should fail on user post', async (done) => {

    await authClient.post.mockImplementation(() => {
      return Promise.reject({ message: "Test error" });
    });

    supertest(server)
      .post('/api/users')
      .expect(500, "\"Test error\"")
      .end(done)
  })

  it('should return ok on user post', async (done) => {

    await authClient.post.mockImplementation(() => {
      return Promise.resolve({
        status: 201,
        data: {
          id: 1,
          email: 'test'
        }
      });
    });

    supertest(server)
      .post('/api/users')
      .expect(201, {
        id: 1,
        email: 'test'
      })
      .end(done)
  })

  it('should fail on get user', async (done) => {

    await authClient.get.mockImplementation(() => {
      return Promise.reject({ message: "Test error" });
    });

    supertest(server)
      .get('/api/users?email=test@test.com')
      .expect(500, "\"Test error\"")
      .end(done)
  })

  it('should return ok on get user', async (done) => {

    await authClient.get.mockImplementation(() => {
      return Promise.resolve({
        status: 200,
        data: {
          id: 1,
          email: 'test'
        }
      });
    });

    supertest(server)
      .get('/api/users?email=test@test.com')
      .expect(200, {
        id: 1,
        email: 'test'
      })
      .end(done)
  })
})