const supertest = require('supertest')
const server = require('../server/server')

jest.mock("../clients/apiClient", () => ({ get: jest.fn(), post: jest.fn(), put: jest.fn(), delete: jest.fn() }));
const apiClient = require("../clients/apiClient");

describe('Vehicles router test', () => {

  beforeAll(() => {
    jest.resetModules()
  })

  it('should fail on search vehicles', async (done) => {

    await apiClient.get.mockImplementation(() => {
      return Promise.resolve({ status: 400, data: {
        message: "Bad request"
      } });
    });

    supertest(server)
      .get('/api/vehicles/search?user_id=1')
      .expect(400, {
        message: "Bad request"
      })
      .end(done)
  })

  it('should return ok on search vehicles', async (done) => {

    await apiClient.get.mockImplementation(() => {
      return Promise.resolve({
        status: 200,
        data: [
          {
            id: 1,
            brand: 'Ford',
            brandline: 'Fiesta'
          }
        ]
      });
    });

    supertest(server)
      .get('/api/vehicles/search?user_id=1')
      .expect(200, [
        {
          id: 1,
          brand: 'Ford',
          brandline: 'Fiesta'
        }
      ])
      .end(done)
  })

  it('should fail on get location', async (done) => {

    await apiClient.get.mockImplementation(() => {
      return Promise.resolve({
        status: 404, data: {
          message: "Vehicle not found"
        }
      });
    });

    supertest(server)
      .get('/api/vehicles/1/location')
      .expect(404, {
        message: "Vehicle not found"
      })
      .end(done)
  })

  it('should return ok on get location', async (done) => {

    await apiClient.get.mockImplementation(() => {
      return Promise.resolve({
        status: 200,
        data: {
          id: 1,
          lat: '1',
          lng: '1'
        }
      });
    });

    supertest(server)
      .get('/api/vehicles/1/location')
      .expect(200, {
        id: 1,
        lat: '1',
        lng: '1'
      })
      .end(done)
  })

  it('should fail on get speed alert', async (done) => {

    await apiClient.get.mockImplementation(() => {
      return Promise.resolve({
        status: 503, data: {
          message: "Service unavailable"
        }
      });
    });

    supertest(server)
      .get('/api/vehicles/1/alerts/speed')
      .expect(503, {
        message: "Service unavailable"
      })
      .end(done)
  })

  it('should return ok on get speed alert', async (done) => {

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
      .get('/api/vehicles/1/alerts/speed')
      .expect(200, {
        id: 1,
        status: 'ACTIVE'
      })
      .end(done)
  })

  it('should fail on get movement alert', async (done) => {

    await apiClient.get.mockImplementation(() => {
      return Promise.resolve({
        status: 503, data: {
          message: "Service unavailable"
        }
      });
    });

    supertest(server)
      .get('/api/vehicles/1/alerts/movement')
      .expect(503, {
        message: "Service unavailable"
      })
      .end(done)
  })

  it('should return ok on get movement alert', async (done) => {

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
      .get('/api/vehicles/1/alerts/movement')
      .expect(200, {
        id: 1,
        status: 'ACTIVE'
      })
      .end(done)
  })

  it('should fail on create new vehicle', async (done) => {

    await apiClient.post.mockImplementation(() => {
      return Promise.resolve({
        status: 400, data: {
          message: "Bad request"
        }
      });
    });

    supertest(server)
      .post('/api/vehicles')
      .expect(400, {
        message: "Bad request"
      })
      .end(done)
  })

  it('should return ok on create new vehicle', async (done) => {

    await apiClient.post.mockImplementation(() => {
      return Promise.resolve({
        status: 201,
        data: {
          id: 1,
          brand: 'Ford',
          brandline: 'Fiesta'
        }
      });
    });

    supertest(server)
      .post('/api/vehicles')
      .expect(201, {
        id: 1,
        brand: 'Ford',
        brandline: 'Fiesta'
      })
      .end(done)
  })

  it('should fail on activate vehicle', async (done) => {

    await apiClient.put.mockImplementation(() => {
      return Promise.resolve({
        status: 500, data: {
          message: "Internal error"
        }
      });
    });

    supertest(server)
      .put('/api/vehicles/1/activate')
      .expect(500, {
        message: "Internal error"
      })
      .end(done)
  })

  it('should return ok on activate vehicle', async (done) => {

    await apiClient.put.mockImplementation(() => {
      return Promise.resolve({
        status: 200,
        data: {
          id: 1,
          brand: 'Ford',
          brandline: 'Fiesta',
          status: 'ACTIVE'
        }
      });
    });

    supertest(server)
      .put('/api/vehicles/1/activate')
      .expect(200, {
        id: 1,
        brand: 'Ford',
        brandline: 'Fiesta',
        status: 'ACTIVE'
      })
      .end(done)
  })

  it('should fail on delete vehicle', async (done) => {

    await apiClient.delete.mockImplementation(() => {
      return Promise.reject({
        message: "Internal error"
      });
    });

    supertest(server)
      .delete('/api/vehicles/1')
      .expect(500, `"Internal error"`)
      .end(done)
  })

  it('should return ok on delete vehicle', async (done) => {

    await apiClient.delete.mockImplementation(() => {
      return Promise.resolve({
        status: 204
      });
    });

    supertest(server)
      .delete('/api/vehicles/1')
      .expect(204)
      .end(done)
  })

  it('should fail on get brands', async (done) => {

    await apiClient.get.mockImplementation(() => {
      return Promise.resolve({
        status: 503, data: {
          message: "Service unavailable"
        }
      });
    });

    supertest(server)
      .get('/api/vehicles/brands')
      .expect(503, {
        message: "Service unavailable"
      })
      .end(done)
  })

  it('should return ok on get brands', async (done) => {

    await apiClient.get.mockImplementation(() => {
      return Promise.resolve({
        status: 200,
        data: [
          {
            id: 1,
            name: "FERRARI"
          }
        ]
      });
    });

    supertest(server)
      .get('/api/vehicles/brands')
      .expect(200, [
        {
          id: 1,
          name: "FERRARI"
        }
      ])
      .end(done)
  })

  it('should fail on get brand lines', async (done) => {

    await apiClient.get.mockImplementation(() => {
      return Promise.resolve({
        status: 404, data: {
          message: "Brand not found"
        }
      });
    });

    supertest(server)
      .get('/api/vehicles/brands/1/brand-lines')
      .expect(404, {
        message: "Brand not found"
      })
      .end(done)
  })

  it('should return ok on get brand lines', async (done) => {

    await apiClient.get.mockImplementation(() => {
      return Promise.resolve({
        status: 200,
        data: [
          {
            id: 1,
            name: "F50"
          }
        ]
      });
    });

    supertest(server)
      .get('/api/vehicles/brands/1/brand-lines')
      .expect(200, [
        {
          id: 1,
          name: "F50"
        }
      ])
      .end(done)
  })
})