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
import { connect } from "react-redux";
import { VehiclesService } from "../api/services"

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

class HeatMap extends React.Component {
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
    this.getTrackings = this.getTrackings.bind(this);
  };

  componentDidMount() {
    this.loadVehicles();
  }

  async loadVehicles() {
    const [err, response] = await to(VehiclesService.searchVehicles(this.props.userId));
    if (!err && response.paging.total) {
      this.setState({
        vehicles: response.data
      });
    }
  }
  
  async getTrackings(event) {
    event.preventDefault();
    event.persist();
    const filters = {
      deviceId: event.target.value,
      startDate: new Date(),
      finishDate: new Date()
    }
    filters.startDate.setMonth(filters.startDate.getMonth() - 1);
    const [err, response] = await to(VehiclesService.searchTrackings(filters));
    if (!err && response.paging.total) {
      this.setState({
        trackings: response.data,
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
          body: !err && !response.paging.total ? alerts.trackingsNotFound : alerts.generic
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
                  <FormSelect id="feInputState" defaultValue="default" onChange={this.getTrackings}>
                    <option value="default" disabled>Elija un vehículo...</option>
                    {this.state.vehicles.map((vehicle, idx) => (
                      <option key={vehicle.id} value={vehicle.device.id}>{`${vehicle.brand} ${vehicle.brand_line} - ${vehicle.plate}`}</option>
                    ))}
                  </FormSelect>
                </Form>
              </CardHeader>
              <CardBody>
                <Gmap
                  isHeatMapLayerShown
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

function mapStateToProps(state) {
  const { userInfo } = state
  return { userId: userInfo.id }
}

export default connect(mapStateToProps)(HeatMap)