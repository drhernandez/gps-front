const axios = require('axios');
const restClient = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 1000
});
// const { restClient } = require('../../restClient')
const { parseErrorResponse } = require('../../utils/ErrorsUtil')

export default class AlertsService {
  
  async updateAlerts(alerts) {
    try {
        var speedAlert = null;
        var movementAlert = null;

        Object.entries(alerts).forEach(([type, alert]) => {
          switch(type) {
            case "speed": 
              speedAlert = alert;
              break;
            case "movement":
              movementAlert = alert;
              break;
            default:
              console.error("Invalid alert type ", type);
          }
        })
      const results = await axios.all([
        restClient.put(`/alerts/speed/${speedAlert.id}`, speedAlert),
        restClient.put(`/alerts/movement/${movementAlert.id}`, movementAlert)
      ]);
      // status 2XX
      return results.filter((result) => result.status < 200 && result.status >= 300).length === 0;

    } catch (error) {
      parseErrorResponse(error);
      return false;
    }
  }
}