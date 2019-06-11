import _ from 'lodash';
import React from 'react';
import {GoogleMapLoader, GoogleMap, Marker} from 'react-gl-maps';

export class GMap extends React.Component {

  static propTypes = {
    onMarkerClick: React.PropTypes.func,
    markers: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        label: React.PropTypes.string,
        position: React.PropTypes.shape({
          lat: React.PropTypes.number.isRequired,
          lng: React.PropTypes.number.isRequired,
        }).isRequired,
      }),
    ),
    center: React.PropTypes.shape({
      lat: React.PropTypes.number.isRequired,
      lng: React.PropTypes.number.isRequired,
    }),
  }

  static defaultProps = {
    onMarkerClick: _.noop,
  }

  state = {
    zoom: 12,
  };

  // getFillColor() {
  //   return '#2B7EBB';
  // }

  // getMarkerIcon() {
  //   const svg = this.generateIcon();
  //   return {
  //     url: 'data:image/svg+xml;base64,' + window.btoa(svg),
  //     scaledSize: new google.maps.Size(125, 60),
  //     anchor: new google.maps.Point(15, 15),
  //   };
  // }

  // generateIcon(opts = {}) {
  //   const fillColor = '#2B7EBB';
  //   _.defaults(opts, {
  //   //   fontSize: '30px',
  //   //   fontColor: 'white',
  //   //   strokeColor: '#ffffff',
  //     fillColor,
  //   //   circleOpacity: '0.8',
  //   });

  //   return `
  //     <svg xmlns="http://www.w3.org/2000/svg">
  //       <circle cx="4" cy="4" r="4" fill="${opts.fillColor}" opacity="${opts.circleOpacity}"></circle>
  //     </svg>
  //   `;
  // }

  renderMarkers() {
    console.log('rendering markers: ' + JSON.stringify(this.props.markers));
    return this.props.markers.map((attr, index) => {
      const position = attr.position;
      // const icon = this.getMarkerIcon();

      return (
        <Marker
          key={Math.random()}
          position={position}
          // icon={icon}
        />
      );
    });
  }

  renderContainer() {
    return <div {...this.props} style={{ height: '450px' }} />;
  }

  renderMap() {
    return (
      <GoogleMap
        defaultZoom={this.state.zoom}
        defaultCenter={this.props.center || { lat: -31.422130, lng: -64.186510 }}
        defaultOptions={{ scrollwheel: false }}
        defaultStyles={[{
          'featureType': 'all',
          'elementType': 'all',
          'stylers': [
            {'saturation': 0},
            {'lightness': 30},
            {'gamma': 0.5},
          ]},
        ]} >
        {this.renderMarkers()}
      </GoogleMap>
    );
  }

  render() {
    return (
      <GoogleMapLoader
        containerElement={this.renderContainer()}
        googleMapElement={this.renderMap()} />
    );
  }
}
