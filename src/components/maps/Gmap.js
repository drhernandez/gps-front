/*global google*/
import React from "react";
import { 
  withGoogleMap, 
  GoogleMap, 
  Marker 
} from "react-google-maps"
import HeatmapLayer from "react-google-maps/lib/components/visualization/HeatmapLayer";

const Gmap = withGoogleMap((props) =>
  <GoogleMap
    zoom={props.zoom || 12}
    center={props.center || { lat: -31.412130, lng: -64.188510 }}
  >
    {props.isMarkerShown && props.markers.map((marker) => (
      <Marker key={marker.id} position={marker.position} icon={marker.icon} animation={marker.animation} />
    ))}

    {props.isHeatMapLayerShown &&
      <HeatmapLayer data={props.trackings.map((tracking) => (
        new google.maps.LatLng(tracking.lat, tracking.lng)
      ))} />
    }
  </GoogleMap>
);

export default Gmap;