/*global google*/
import React from "react";
// import PropTypes from "prop-types";
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
//services
import UsersService from "./../api/services/usersService";
import VehiclesService from "./../api/services/vehiclesService";


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

  async loadDevices() {
    const usersService = new UsersService();
    const vehicles = await usersService.getVehiclesByUserID(10);
    this.setState({
      vehicles: vehicles
    });
  }

  async getCurrentLocation(vehicleID) {
    const vehiclesServices = new VehiclesService();
    const location = await vehiclesServices.getCurrentLocation(vehicleID);
    if (location !== null || location !== undefined) {
      const marker = new Marker(location.id, location.label, undefined, google.maps.Animation.DROP, location.lat, location.lng);
      this.setState({
        trackings: [location],
        markers: [marker],
        center: marker.position,
        zoom: 15
      })
    }
  }

  handleDeviceOnChange(event) {
    event.persist();
    this.getCurrentLocation(event.target.value);
  }

  componentWillMount() {
    this.loadDevices();
  }

  render() {
    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle title="Where is my car?!" subtitle="Dashboard" className="text-sm-left mb-3 col-sm-12" />
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
                  googleMapURL="http://maps.google.com/maps/api/js?key=AIzaSyAAx3DLDKUqNQOEp8zi3G2xEuAYfgZoPTo"
                  loadingElement={<div style={{ height: `100%` }} />}
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

// function getDefaultIcon() {
//   const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#ea4234"/><path d="M0 0h24v24H0z" fill="none"/></svg>`
//   return { url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg), scaledSize: { width: 40, height: 40 } }
// }