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
} from "shards-react";
import PageTitle from "./../components/common/PageTitle";
import Gmap from "./../components/common/maps/Gmap";
import to from "await-to-js";
//services
import { VehiclesService } from "../api/services"
import store from "../redux/store";

export default class HeatMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicles: [],
      trackings: [],
      markers: [],
      center: null,
      zoom: null
    }
  };

  async loadVehicles() {
    const userId = store.getState().userInfo.userId;
    const [err, vehicles] = await to(VehiclesService.getVehiclesByUserID(userId));
    if (!err && vehicles) {
      this.setState({
        vehicles: vehicles
      });
    }
    else {
      console.log(err);
    }
  }
  
  async getTrackings(vehicleID) {
    const [err, trackings] = await to(VehiclesService.getTrackings(vehicleID));
    if (!err && trackings) {
      this.setState({
        trackings: trackings
      });
    }
    else {
      console.log(err);
    }
  }

  handleDeviceOnChange(event) {
    event.persist();
    this.getTrackings(event.target.value);
  }

  componentDidMount() {
    this.loadVehicles();
  }

  render() {
    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle title="Lugares más visitados" subtitle="Mapa" className="text-sm-left mb-3 col-sm-12" />
        </Row>

        <Row>
          <Col>
            <Card small className="mb-4">
              <CardHeader>
                <Form className="add-new-post">
                  <FormSelect id="feInputState" defaultValue="default" onChange={(event) => this.handleDeviceOnChange(event)}>
                    <option value="default" disabled>Elija un vehículo...</option>
                    {this.state.vehicles.map((vehicle, idx) => (
                      <option key={vehicle.device_id} value={vehicle.id}>{`${vehicle.type} - ${vehicle.plate}`}</option>
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