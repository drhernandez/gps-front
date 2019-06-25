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
//services
import UsersService from "./../api/services/usersService";
import VehiclesService from "./../api/services/vehiclesService";

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

  async loadDevices() {
    const usersService = new UsersService();
    const vehicles = await usersService.getVehiclesByUserID(10);
    this.setState({ 
      vehicles: vehicles 
    });
  }

  async getCurrentLocation(vehicleID) {
    const vehiclesServices = new VehiclesService();
    const currentLocation = await vehiclesServices.getCurrentLocation(vehicleID);
    if (currentLocation !== null || currentLocation !== undefined) {
      const marker = new Marker(currentLocation.id, currentLocation.label, "default", currentLocation.lat, currentLocation.lng);
      this.setState({
        trackings: [currentLocation],
        markers: [marker],
        center: marker.position,
        zoom: 15
      })
    }
    console.log(this.state);
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
                  googleMapURL="http://maps.google.com/maps/api/js?key=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
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


class Marker {
  constructor(id, label, icon, lat, lng) {
    this.position =
    this.id = id;
    this.label = label;
    // this.icon = icon;
    this.position = new Position(lat, lng);
  }
  // Getter
  // get area() {
  //   return this.calcArea();
  // }
  // Método
  // calcArea() {
  //   return this.height * this.width;
  // }
}

class Position {
  constructor(lat, lng) {
    this.lat = lat;
    this.lng = lng;
  }
}
