/*global google*/
import React from "react";
import { compose, withProps } from "recompose"
import { 
  withScriptjs,
  withGoogleMap, 
  GoogleMap, 
  Marker 
} from "react-google-maps"
import HeatmapLayer from "react-google-maps/lib/components/visualization/HeatmapLayer";

const mapKey = process.env.REACT_APP_GOOGLE_MAP_KEY

const Gmap = compose(
  withProps({
    googleMapURL: `https://maps.google.com/maps/api/js?libraries=visualization&key=${mapKey}`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `450px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    key='map-component'
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

