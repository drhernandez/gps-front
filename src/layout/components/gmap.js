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
  }

  static defaultProps = {
    onMarkerClick: _.noop,
  }

  state = {
    points: this.props.markers,
  };

  componentDidUpdate() {
    console.log(this.props.markers);
    this.renderMarkers();
  }

  getFillColor() {
    return '#2B7EBB';
  }

  renderContainer() {
    return <div {...this.props} style={{height: '450px'}} />;
  }

  renderMarkers() {
    return this.props.markers.map((attr, index) => {
      const position = attr.position;
      // const icon = this.getMarkerIcon(attr);

      return (
        <Marker
          key={index}
          position={position}
          // icon={icon}
        />
      );
    });
  }

  renderMap() {
    return (
      <GoogleMap
        defaultZoom={13}
        defaultCenter={{ lat: -31.422130, lng: -64.186510 }}
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
