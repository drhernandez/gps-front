import _ from 'lodash';
import React from 'react';
// import {GoogleMapLoader, GoogleMap, Marker} from 'react-gl-maps';
import {GoogleMapLoader, GoogleMap} from 'react-gl-maps';

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

  // getMarkerIcon(attr) {
  //   const svg = this.generateIcon(attr.label);
  //   return {
  //     url: 'data:image/svg+xml;base64,' + window.btoa(svg),
  //     scaledSize: new google.maps.Size(125, 60),
  //     anchor: new google.maps.Point(15, 15),
  //   };
  // }

  getFillColor() {
    return '#2B7EBB';
  }

  // generateIcon(label, opts = {}) {
  //   const fillColor = this.getFillColor();
  //   _.defaults(opts, {
  //     fontSize: '30px',
  //     fontColor: 'white',
  //     strokeColor: '#ffffff',
  //     fillColor,
  //     circleOpacity: '0.8',
  //   });

  //   return `
  //     <svg xmlns="http://www.w3.org/2000/svg">
  //       <defs>
  //         <style>
  //           .marker-label {
  //             font-size:${opts.fontSize};
  //             font-family:'Lato';
  //             fill:${opts.fontColor};
  //           }
  //         </style>
  //       </defs>
  //       <circle cx="32" cy="32" r="32" fill="${opts.fillColor}" opacity="${opts.circleOpacity}"></circle>
  //       <text class="marker-label" fill="white" text-anchor="middle" transform="translate(31 40)" >${label}</text>
  //     </svg>
  //   `;
  // }


  renderContainer() {
    return <div {...this.props} style={{height: '450px'}} />;
  }

  // renderMarkers() {
  //   return this.constructor.testMarkers.map((attr, index) => {
  //     const position = attr.position;
  //     const icon = this.getMarkerIcon(attr);

  //     return (
  //       <Marker
  //         key={index}
  //         position={position}
  //         icon={icon}
  //       />
  //     );
  //   });
  // }

  renderMap() {
    return (
      <GoogleMap
        defaultZoom={13}
        defaultCenter={{ lat: -31.422130, lng: -64.186510}}
        defaultOptions={{ scrollwheel: false }}
        defaultStyles={[{
          'featureType': 'all',
          'elementType': 'all',
          'stylers': [
            {'saturation': 0},
            {'lightness': 30},
            {'gamma': 0.5},
            // {
            //   'featureType': 'road.highway',
            //   'elementType': 'geometry.fill',
            //   'stylers': [
            //     {
            //       'saturation': '100',
            //     },
            //     {
            //       'lightness': '69',
            //     },
            //     {
            //       'gamma': '1.40',
            //     },
            //   ],
            // },
          //   {
          //     'featureType': 'administrative.province',
          //     'elementType': 'geometry.stroke',
          //     'stylers': [
          //       {
          //         'saturation': '100',
          //       },
          //       {
          //         'lightness': '27',
          //       },
          //     ],
          //   },
          //   {
          //     'featureType': 'road.highway.controlled_access',
          //     'elementType': 'labels.icon',
          //     'stylers': [
          //       {
          //         'saturation': '100',
          //       },
          //     ],
          //   },
          //   {
          //     'featureType': 'road.arterial',
          //     'elementType': 'geometry.fill',
          //     'stylers': [
          //       {
          //         'saturation': '43',
          //       },
          //       {
          //         'lightness': '51',
          //       },
          //     ],
          //   },
          //   {
          //     'featureType': 'landscape',
          //     'elementType': 'geometry.fill',
          //     'stylers': [
          //       {
          //         'color': '#32373c',
          //       },
          //     ],
          //   },
          ]},
        ]}
        >
        {/* {this.renderMarkers()} */}
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
