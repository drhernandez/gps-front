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
  Alert,
  DatePicker
} from "shards-react";
import constants from "../utils/Constants";
import PageTitle from "./../components/common/PageTitle";
import Button from "../components/common/Button";
import Gmap from "./../components/common/maps/Gmap";
import to from "await-to-js";
import { connect } from "react-redux";
import { VehiclesService } from "../api/services"
import { subMonths } from "date-fns";

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
      },
      selectedDevice: null,
      startDate: subMonths(new Date(), 1),
      endDate: new Date(),
      showSppiner: false,
      disableDates: true
    }

    this.loadVehicles = this.loadVehicles.bind(this);
    this.getTrackings = this.getTrackings.bind(this);
    this.handleDeviceOnChange = this.handleDeviceOnChange.bind(this);
    this.setStartDate = this.setStartDate.bind(this);
    this.setEndDate = this.setEndDate.bind(this);
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

  async getTrackings(deviceId) {
    this.setState({
      disableDates: true
    })
    const filters = {
      deviceId: deviceId,
      startDate: this.state.startDate,
      finishDate: this.state.endDate
    }
    const [err, response] = await to(VehiclesService.searchTrackings(filters));
    if (!err && response.paging.total) {
      this.setState({
        trackings: response.data,
        alert: {
          visible: false,
          body: {}
        },
        disableDates: false,
        showSppiner: false
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
        },
        disableDates: false,
        showSppiner: false
      })
    }
  }

  handleDeviceOnChange(event) {
    event.persist();
    event.preventDefault();
    const deviceId = event.target.value
    this.setState({
      selectedDevice: deviceId
    })
    this.getTrackings(deviceId);
  }

  setStartDate(date) {
    this.setState({
      startDate: date
    })
  }

  setEndDate(date) {
    this.setState({
      endDate: date
    })
  }

  render() {
    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle title="Histórico" subtitle="Mapa" className="mb-3 col-sm-12" />
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
                <Form>
                  <Row>
                    <Col className="col-12 col-lg-5 mb-1">
                      <FormSelect id="feInputState" defaultValue="default" onChange={this.handleDeviceOnChange}>
                        <option value="default" disabled>Elija un vehículo...</option>
                        {this.state.vehicles.map((vehicle, idx) => (
                          <option key={vehicle.id} value={vehicle.device.id}>{`${vehicle.brand} ${vehicle.brand_line} - ${vehicle.plate}`}</option>
                        ))}
                      </FormSelect>
                    </Col>
                    <Col className="col-12 col-lg-4 d-flex mb-1" style={{ maxHeight: "35px" }}>
                      <DatePicker
                        placeholderText="Desde"
                        dateFormat="dd/MM/yyyy"
                        selected={this.state.startDate}
                        onChange={date => this.setStartDate(date)}
                        maxDate={new Date()}
                        dropdownMode="select"
                        disabled={this.state.disableDates}
                        popperModifiers={{
                          preventOverflow: {
                            enabled: true,
                          },
                        }}
                      />
                      <DatePicker
                        placeholderText="Hasta"
                        dateFormat="dd/MM/yyyy"
                        selected={this.state.endDate}
                        onChange={date => this.setEndDate(date)}
                        minDate={this.state.startDate}
                        dropdownMode="select"
                        disabled={this.state.disableDates}
                        popperModifiers={{
                          preventOverflow: {
                            enabled: true,
                          },
                        }}
                      />
                      <span className="input-group-text" style={{ fontSize: "1rem!important" }}>
                        <i className="material-icons"></i>
                      </span>
                    </Col>
                    <Col className="col-12 col-lg-2">
                      <Button className="update-btn" block theme="accent" label="Actualizar"
                        disabled={this.state.disableDates} showSppiner={this.state.showSppiner}
                        onClick={e => this.getTrackings(this.state.selectedDevice)}
                      />
                    </Col>
                  </Row>
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