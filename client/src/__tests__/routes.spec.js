import routes from "../routes";

describe('Routes test', () => {
  it('should export routes', () => {

    const expectedRoutes = [
      "/",
      "/signin",
      "/logout",
      "/forgot-password",
      "/reset-password",
      "/errors",
      "/home",
      "/heat-map",
      "/alerts",
      "/user-profile",
      "/new-client",
      "/clients",
      "/tracking",
    ]

    routes.map(route => {
      expect(expectedRoutes.includes(route.path)).toBe(true)
    })
  })
})