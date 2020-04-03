// import PropTypes from "prop-types";
import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  FormSelect,
  Form,
  Alert
} from "shards-react";
import constants from "../utils/Constants";
import PageTitle from "./../components/common/PageTitle";
import Gmap from "./../components/common/maps/Gmap";
import to from "await-to-js";
import { VehiclesService } from "../api/services"
import store from "../redux/store";

const alerts = {
  generic: {
    type: constants.Themes.ERROR,
    message: "Hubo un error al intentar cargar los datos. Inténtelo de nuevo"
  },
  trackingsNotFound: {
    type: constants.Themes.WARNING,
    message: "No se han registrado datos para este vehículo"
  }
}

export default class HeatMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicles: [],
      trackings: [],
      markers: [],
      center: null,
      zoom: null,
      alert: {
        visible: false,
        body: {}
      }
    }
  };

  componentDidMount() {
    this.loadVehicles();
  }

  async loadVehicles() {
    const userId = store.getState().userInfo.id;
    const [err, response] = await to(VehiclesService.searchVehicles(userId));
    if (!err && response.paging.total) {
      this.setState({
        vehicles: response.data
      });
    }
  }
  
  async getTrackings(vehicleID) {
    const [err, trackings] = await to(VehiclesService.getTrackings(vehicleID));
    if (!err && trackings.length) {
      this.setState({
        trackings: trackings,
        alert: {
          visible: false,
          body: {}
        }
      });
    }
    else {
      this.setState({
        trackings: [],
        markers: [],
        center: null,
        zoom: null,
        alert: {
          visible: true,
          body: !err && !trackings.length ? alerts.trackingsNotFound : alerts.generic
        }
      })
    }
  }

  handleDeviceOnChange(event) {
    event.persist();
    this.getTrackings(event.target.value);
  }

  render() {
    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <Col>
            <PageTitle title="Ubicación actual" subtitle="Mapa" className="text-sm-left mb-3 col-sm-12" />
          </Col>
          <Col>
            <Alert open={this.state.alert.visible} className="m-0" theme={this.state.alert.body.type}>
              {this.state.alert.body.message}
            </Alert>
          </Col>
        </Row>

        <Row>
          <Col>
            <Card small className="mb-4">
              <CardHeader>
                <Form className="add-new-post">
                  <FormSelect id="feInputState" defaultValue="default" onChange={(event) => this.handleDeviceOnChange(event)}>
                    <option value="default" disabled>Elija un vehículo...</option>
                    {this.state.vehicles.map((vehicle, idx) => (
                      <option key={vehicle.id} value={vehicle.id}>{`${vehicle.brand} ${vehicle.brand_line} - ${vehicle.plate}`}</option>
                    ))}
                  </FormSelect>
                </Form>
              </CardHeader>
              <CardBody>
                <Gmap
                  isHeatMapLayerShown
                  containerElement={<div style={{ height: '450px' }} />}
                  mapElement={<div style={{ height: `100%` }} />}
                  // zoom={this.state.zoom}
                  // markers={this.state.markers}
                  center={this.state.center}
                  trackings={this.state.trackings}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

// function getDefaultIcon() {
//   const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#ea4234"/><path d="M0 0h24v24H0z" fill="none"/></svg>`
//   return { url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg), scaledSize: { width: 40, height: 40 } }
// }