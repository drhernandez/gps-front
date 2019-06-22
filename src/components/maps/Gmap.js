import React from "react";
import { 
  withScriptjs, 
  withGoogleMap, 
  GoogleMap, 
  Marker 
} from "react-google-maps"

const Gmap = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={props.zoom || 12}
    defaultCenter={{ lat: -31.422130, lng: -64.186510 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
  </GoogleMap>
));

export default Gmap;