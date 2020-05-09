/*global google*/
import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Form,
  FormSelect,
  Alert
} from "shards-react";
import NavbarSearch from "../components/common/search/NavbarSearch";
import PageTitle from "../components/common/PageTitle";
import Gmap from "./../components/common/maps/Gmap";
import { Marker } from "./../components/common/maps/Marker";
import Constants from "../utils/Constants";
import { UsersService, VehiclesService } from "../api/services";
import { to } from "await-to-js";
import "../styles/clientTracking.css";

const errorMessages = {
  generic: {
    type: Constants.Themes.ERROR,
    message: "Algo salió mal al intentar obtener los datos del usuario. Inténtelo de nuevo."
  },
  userNotFound: {
    type: Constants.Themes.WARNING,
    message: "Usuario no encontrado."
  }
}

class ClientTracking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchBarDisabled: false,
      user: null,
      trackings: [],
      markers: [],
      center: null,
      zoom: null,
      alert: {
        visible: false,
        ...errorMessages.generic
      }
    }
    this.search = this.search.bind(this);
    this.handleDeviceOnChange = this.handleDeviceOnChange.bind(this);
  };

  componentWillUnmount() {
    clearInterval(this.dataPolling);
  }

  async search(e) {
    e.preventDefault();
    e.persist();

    const email = e.target["search-input"].value;
    this.setState({
      searchBarDisabled: true,
      user: null
    })

    const [err, user] = await to(UsersService.getUserByEmail(email));
    if (err != null) {
      this.setState({
        searchBarDisabled: false,
        alert: {
          visible: true,
          ...errorMessages.userNotFound
        },
        showSppiner: false
      })
      setTimeout(() => {
        this.setState({
          alert: {
            visible: false
          }
        });
      }, 4000);
    }
    else {
      let [err, results] = await to(VehiclesService.searchVehicles(user.id));
      if (err != null) {
        console.log(err);
        this.setState({
          searchBarDisabled: false,
          alert: {
            visible: true,
            ...errorMessages.generic
          }
        })
        setTimeout(() => {
          this.setState({
            alert: {
              visible: false
            }
          });
        }, 4000);
      }
      else {
        user.vehicles = results.data;
        this.setState({
          searchBarDisabled: false,
          user: user
        });
      }
    }
  }

  handleDeviceOnChange(event) {
    event.persist();
    this.getCurrentLocation(event.target.value);
    this.dataPolling = setInterval(
      () => {
        try {
          this.getCurrentLocation(event.target.value);
        } catch (error) {
        }
      }, 4000);
  }

  async getCurrentLocation(vehicleID) {
    const [err, location] = await to(VehiclesService.getCurrentLocation(vehicleID));
    if (!err && location) {
      const marker = new Marker(location.id, location.label, undefined, google.maps.Animation.DROP, location.lat, location.lng);
      this.setState({
        trackings: [location],
        markers: [marker],
        center: marker.position,
        zoom: 15,
        alert: {
          visible: false,
          body: {}
        }
      })
    }
  }

  render() {
    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle title="Tracking" subtitle="Clientes" className="text-sm-left mb-3 col-sm-12" />
        </Row>

        {
          this.state.alert.visible &&
          <Row noGutters className="w-100">
            <Alert className="my-auto w-100" open={this.state.alert.visible} theme={this.state.alert.type}>
              {this.state.alert.message}
            </Alert>
          </Row>
        }

        <Row noGutters className="py-4">
          <Card small className="mx-auto w-100 mb-4">
            <CardHeader className="mt-3">
              <Row>
                <Col>
                  <NavbarSearch disabled={this.state.searchBarDisabled} placeholder="Buscar clientes por email..." searchFunction={this.search} />
                </Col>
                <Col>
                  <Form className="add-new-post">
                    <FormSelect id="feInputState" defaultValue="default" disabled={this.state.user == null} onChange={this.handleDeviceOnChange}>
                      <option value="default" disabled>Elija un vehículo...</option>
                      {this.state.user && this.state.user.vehicles.map((vehicle, idx) => (
                        <option key={vehicle.id} value={vehicle.id}>{`${vehicle.brand} ${vehicle.brand_line} - ${vehicle.plate}`}</option>
                      ))}
                    </FormSelect>
                  </Form>
                </Col>
              </Row>
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
        </Row>
      </Container>
    );
  }
}

export default ClientTracking;