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

    const [err] = await to( Promise.all(
        restClient.put(`/alerts/speed/${speedAlert.id}`, speedAlert),
        restClient.put(`/alerts/movement/${movementAlert.id}`, movementAlert)
      )
    );
    if (err) {
      console.log(`[message: Error updating alerts] [error: ${JSON.stringify(err)}]`);
      throw err;
    }

    return true;


    // try {
    //     var speedAlert = null;
    //     var movementAlert = null;

    //     Object.entries(alerts).forEach(([type, alert]) => {
    //       switch(type) {
    //         case "speed": 
    //           speedAlert = alert;
    //           break;
    //         case "movement":
    //           movementAlert = alert;
    //           break;
    //         default:
    //           console.error("Invalid alert type ", type);
    //       }
    //     })

    //   const results = await axios.all([
    //     restClient.put(`/alerts/speed/${speedAlert.id}`, speedAlert),
    //     restClient.put(`/alerts/movement/${movementAlert.id}`, movementAlert)
    //   ]);
    //   // status 2XX
    //   return results.filter((result) => result.status < 200 && result.status >= 300).length === 0;

    // } catch (error) {
      
    //   return false;
    // }
  }
}