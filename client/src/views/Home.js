/*global google*/
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
import Gmap from "./../components/maps/Gmap";
import { Marker } from "./../components/maps/Marker";
import to from "await-to-js";
//services
import { UsersService, VehiclesService } from "../api/services"

export default class Home extends React.Component {
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
    const [err, vehicles] = await to(UsersService.getVehiclesByUserID(10));
    if (!err && vehicles) {
      this.setState({
        vehicles: vehicles
      });
    }
    else {
      console.log(err);
    }
  }

  async getCurrentLocation(vehicleID) {
    const [err, location] = await to(VehiclesService.getCurrentLocation(vehicleID));
    if (!err && location) {
      const marker = new Marker(location.id, location.label, undefined, google.maps.Animation.DROP, location.lat, location.lng );
      this.setState({
        trackings: [location],
        markers: [marker],
        center: marker.position,
        zoom: 15
      })
    }
    else {
      console.log(err);
    }
  }

  handleDeviceOnChange(event) {
    event.persist();
    this.getCurrentLocation(event.target.value);
  }

  componentWillMount() {
    this.loadVehicles();
  }

  render() {
    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle title="Ubicación actual" subtitle="Mapa" className="text-sm-left mb-3 col-sm-12" />
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
                  isMarkerShown
                  containerElement={<div style={{ height: '450px' }} />}
                  mapElement={<div style={{ height: `100%` }} />}
                  zoom={this.state.zoom}
                  markers={this.state.markers}
                  center={this.state.center}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}