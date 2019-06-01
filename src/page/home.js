import React from 'react';
import { Page, Panel, Select } from 'react-blur-admin';
import { Row, Col } from 'react-flex-proto';
import { GMap } from 'src/layout/components/gmap';

export class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
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
                options={[{ value: 1, label: 'Ford' }, { value: 2, label: 'Toyota' }]}
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

