import BaseService from './baseService';
import to from "await-to-js";
const restClient = new BaseService();

export default class AlertsService {
  
  static async updateAlerts(alerts) {

    var speedAlert = null;
    var movementAlert = null;

    Object.entries(alerts).forEach(([type, alert]) => {
      switch (type) {
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

    const [err] = await to(Promise.all([
        restClient.put(`/alerts/speed/${speedAlert.id}`, null, speedAlert),
        restClient.put(`/alerts/movement/${movementAlert.id}`, null, movementAlert)
    ])
    );

    if (err) {
      console.log(`[message: Error updating alerts] [error: ${JSON.stringify(err)}]`);
      throw err;
    }

    return true;
  }
}