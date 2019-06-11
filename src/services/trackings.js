class TrackingsService {
  async getTrackingsByDeviceID(deviceID) {
    try {
      // return await axios.get(`http://localhost:8081/users/${userID}/devices`);
      return await new Promise(resolve => {
        setTimeout(() => {
          if (deviceID === 1) resolve([{ position: { lat: -31.422130, lng: -64.186510, label: 'centro' } }]);
          else resolve([{ position: { lat: -31.368730, lng: -64.201750, label: 'casa' } }]);
        }, 500);
      });
    } catch (error) {
      console.log(`Error in function getTrackingsByDeviceID. Message: ${error}`);
      return null;
    }
  }
}

module.exports = TrackingsService;

// http://www.hamstermap.com/quickmap.php

// -31.422108, -64.186429
//   - 31.422218, -64.185785
//   - 31.422731, -64.184842
//   - 31.422841, -64.183941
//   - 31.423097, -64.183512
//   - 31.423015, -64.183206
//   - 31.423108, -64.183062
//   - 31.423136, -64.182994
//   - 31.423159, -64.182929
//   - 31.423182, -64.182865
//   - 31.423269, -64.182629
//   - 31.422953, -64.182511
//   - 31.422761, -64.182436
//   - 31.422338, -64.182310
//   - 31.421972, -64.182160
//   - 31.421729, -64.182367
//   - 31.421665, -64.182646
//   - 31.421546, -64.183096
//   - 31.421482, -64.183482
//   - 31.421381, -64.183772
//   - 31.421271, -64.184083
//   - 31.421198, -64.184394
//   - 31.421088, -64.184866
//   - 31.420997, -64.185188
//   - 31.420914, -64.185617
//   - 31.420859, -64.185874
//   - 31.420951, -64.186110
//   - 31.421180, -64.186207
//   - 31.421381, -64.186250
//   - 31.421519, -64.186357
//   - 31.421665, -64.186422
//   - 31.421793, -64.186422
//   - 31.421921, -64.186508
//   - 31.422068, -64.186497