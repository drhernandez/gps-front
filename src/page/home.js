import React from 'react';
import { Page, Panel, Select } from 'react-blur-admin';
import { Row, Col } from 'react-flex-proto';
import { GMap } from 'src/layout/components/gmap';
// SERVICES
const UsersService = require('../services/users');
const TrackingsService = require('../services/trackings');

export class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      trackings: [],
    };
  }

  componentWillMount() {
    this.loadDevices();
  }

  loadDevices() {
    const usersService = new UsersService();
    usersService.getDevicesByUserID(1).then((response) => {
      this.setState({devices: response});
    }).catch(console.log);
  }

  setSelectedAndRerenderMap(value) {
    this.setState({ selectOne: value });
    this.loadTracking(value);
  }

  loadTracking(deviceID) {
    // console.log('loadTracking');
    const trackingsService = new TrackingsService();
    trackingsService.getTrackingsByDeviceID(deviceID).then((response) => {
      const trackings = response;
      let center;
      if (trackings !== null && trackings.lenght > 0) {
        center = trackings[0];
      }
      this.setState({trackings: trackings, center: center});
    });
  }

  render() {
    return (
      <Page title="MONITOREO EN TIEMPO REAL">
        <Row>
          <Col padding={10}>
            <Panel title='Seleccione uno de sus vehículo'>
              <Select
                placeholder='Eliga una opción'
                value={this.state.selectOne}
                options={this.state.devices}
                onChange={value => this.setSelectedAndRerenderMap(value)} />
            </Panel>
          </Col>
        </Row>

        <Row>
          <Col padding={5}>
            <Panel title='Google Map Component'>
              {/* <GMap markers={this.state.trackings} center={this.state.center} /> */}
            </Panel>
          </Col>
        </Row>
      </Page>
    );
  }
}

