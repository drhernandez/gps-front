import React from 'react';
import { Page, Panel, Select } from 'react-blur-admin';
import { Row, Col } from 'react-flex-proto';
import { GMap } from 'src/layout/components/gmap';
// SERVICES
const UsersService = require('../services/users');

export class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
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
                onChange={value => this.setState({ selectOne: value })} />
            </Panel>
          </Col>
        </Row>

        <Row>
          <Col padding={5}>
            <Panel title='Google Map Component'>
              <GMap />
            </Panel>
          </Col>
        </Row>
      </Page>
    );
  }
}

