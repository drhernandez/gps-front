import React from "react";
import { 
  withScriptjs, 
  withGoogleMap, 
  GoogleMap, 
  Marker 
} from "react-google-maps"

const Gmap = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    zoom={props.zoom || 12}
    center={props.center || { lat: -31.422130, lng: -64.186510 }}
  >
    {props.markers.map((marker, idx) => (
      <Marker key={marker.id} position={marker.position} icon={marker.icon} animation={marker.animation} />
    ))}
  </GoogleMap>
));

export default Gmap;