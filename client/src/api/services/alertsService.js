// import axios from 'axios';

export default class AlertsService {
  async updateAlerts(alerts) {
    try {
      let alertsToUpdate = [];
      Object.entries(alerts).forEach(([key, value]) => {
        // console.log("element: ", key, " value: ", value);
        alertsToUpdate.push(
          new Promise(resolve => {
            setTimeout(() => {
              resolve({ "status": 200 });
            }, 500);
          })
        );
      });
      
      let results = await Promise.all(alertsToUpdate);
      if (results.filter(result => !result.status || result.status !== 200).length > 0) {
        console.error(`Could not update alerts: ${JSON.stringify(alerts)}. Results: ${JSON.stringify(results)}`)
        return false;
      }
      return true;

    } catch (error) {
      console.error(`Could not update alerts: ${alerts}. Error: ${error}`)
    }
  }
}

// const mock = [
//   {
//     "id": 10,
//     "user_id": 10,
//     "device_id": 1,
//     "type": "Ford Fiesta",
//     "plate": "AA 383 TI",
//     "model": "2018"
//   },
//   {
//     "id": 2,
//     "user_id": 10,
//     "device_id": 3,
//     "type": "Fiat Argo",
//     "plate": "AB 112 II",
//     "model": "2018"
//   }
// ];