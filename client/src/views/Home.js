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
  Alert
} from "shards-react";
import constants from "../utils/Constants";
import PageTitle from "./../components/common/PageTitle";
import Gmap from "./../components/common/maps/Gmap";
import { Marker } from "./../components/common/maps/Marker";
import to from "await-to-js";
import { connect } from "react-redux";
import { VehiclesService } from "../api/services"

const alerts = {
  generic: {
    type: constants.Themes.ERROR,
    message: "Hubo un error al intentar cargar la ubicación. Inténtelo de nuevo"
  }
}

class Home extends React.Component {
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

    this.loadVehicles = this.loadVehicles.bind(this);
    this.getCurrentLocation = this.getCurrentLocation.bind(this);
    this.handleDeviceOnChange = this.handleDeviceOnChange.bind(this);
    this.invalidateAlert = this.invalidateAlert.bind(this);
  };

  componentDidMount() {
    this.loadVehicles();
  }

  componentWillUnmount() {
    clearInterval(this.dataPolling);
  }

  async loadVehicles() {
    const [err, response] = await to(VehiclesService.searchVehicles(this.props.userId));
    if (!err && response.paging.total) {
      this.setState({
        vehicles: response.data
      });
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
        zoom: 15,
        alert: {
          visible: false,
          body: {}
        }
      })
    } else {
      this.setState({
        trackings: [],
        markers: [],
        center: null,
        zoom: null,
        alert: {
          visible: true,
          body: alerts.generic
        }
      })
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

  invalidateAlert() {
    this.setState({
      alert: {
        visible: false,
        body: {}
      }
    })
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
                  <FormSelect id="feInputState" defaultValue="default" onChange={this.handleDeviceOnChange}>
                    <option value="default" disabled>Elija un vehículo...</option>
                    {this.state.vehicles.map((vehicle, idx) => (
                      <option key={vehicle.id} value={vehicle.id}>{`${vehicle.brand} ${vehicle.brand_line} - ${vehicle.plate}`}</option>
                    ))}
                  </FormSelect>
                </Form>
              </CardHeader>
              <CardBody>
                <Gmap
                  isMarkerShown
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

function mapStateToProps(state) {
  const { userInfo } = state
  return { userId: userInfo.id }
}

export default connect(mapStateToProps)(Home)