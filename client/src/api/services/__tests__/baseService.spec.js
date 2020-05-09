import to from 'await-to-js'

// jest.mock('axios', () => {
//   return function () {
//     return {
//       create: jest.fn()
//         .mockReturnValue({
//           request: jest.fn()
//             .mockReturnValueOnec(Promise.reject({
//               response: {
//                 status: 401,
//                 data: {
//                   errorCode: "error",
//                   message: "test error"
//                 }
//               },
//               config: {}
//             }))
//         })
//     };
//   };
// });
jest.mock('axios', () => ({ create: jest.fn() }))
import axios from 'axios'

axios.create.mockImplementation(() => {
  return {
    request: jest.fn()
      .mockReturnValueOnce(Promise.reject({
        response: {
          status: 401,
          data: {
            errorCode: "error",
            message: "test error"
          }
        },
        config: {}
      }))
      .mockReturnValueOnce(Promise.reject({
        message: "socket timeout",
        request: {},
        config: {}
      }))
      .mockReturnValueOnce(Promise.reject({
        message: "unexpected error"
      }))
      .mockReturnValueOnce(Promise.resolve({
        status: 200
      }))
      .mockReturnValueOnce(Promise.resolve({
        status: 200
      }))
      .mockReturnValueOnce(Promise.resolve({
        status: 200
      }))
      .mockReturnValueOnce(Promise.resolve({
        status: 200
      }))
  }
})

import BaseService from '../baseService'
const restClient = new BaseService();

describe("Base client", () => {

  describe("_parseErrorResponse function", () => {
    
    it('should parse an error with response', async () => {

      const [err, response] = await to(restClient.get('/url'))
      
      expect(err).toEqual({
        status: 401,
        message: "test error",
        errorCode: "error"
      })
      expect(response).toEqual(undefined)
    })

    it('should parse an error without response', async () => {

      const [err, response] = await to(restClient.get('/url'))
      
      expect(err).toEqual({
        status: 500,
        message: "socket timeout",
        errorCode: "internal_error"
      })
      expect(response).toEqual(undefined)
    })

    it('should parse an unexpected error', async () => {

      const [err, response] = await to(restClient.get('/url'))

      expect(err).toEqual({
        status: 500,
        message: "unexpected error",
        errorCode: "internal_error"
      })
      expect(response).toEqual(undefined)
    })
  })

  describe("http methods", () => {

    it('should return ok all endpoints', async () => {
      const [err1, response1] = await to(restClient.get('/test'))
      const [err2, response2] = await to(restClient.post('/test'))
      const [err3, response3] = await to(restClient.put('/test'))
      const [err4, response4] = await to(restClient.delete('/test'))

      expect(err1).toBe(null)
      expect(response1).toEqual({ status: 200 })
      expect(err2).toBe(null)
      expect(response2).toEqual({ status: 200 })
      expect(err3).toBe(null)
      expect(response3).toEqual({ status: 200 })
      expect(err4).toBe(null)
      expect(response4).toEqual({ status: 200 })
    })
  })
})