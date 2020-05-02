import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Form,
  FormCheckbox,
  FormInput,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Alert
} from "shards-react"
import Button from "../components/common/Button"
import PageTitle from "./../components/common/PageTitle";
import Spinner from 'react-bootstrap/Spinner'
import Constants from "../utils/Constants";
//services
import { VehiclesService, AlertsService } from "../api/services"
import { to } from "await-to-js";
import { connect } from "react-redux";
// import store from "../redux/store";
import "../styles/alerts.css";

class Alerts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      vehicles: [],
      alerts: [],
      snackbar: {
        visible: false,
        type: Constants.Themes.SUCCESS
      },
      showSppiner: true,
      vehicleSppiners: {}
    }
    this.loadVehicles = this.loadVehicles.bind(this);
    this.updateAlerts = this.updateAlerts.bind(this);
    this.toogleAlert = this.toogleAlert.bind(this);
    this.toogleVehicleSppiner = this.toogleVehicleSppiner.bind(this);
    this.handleOnchangeSpeed = this.handleOnchangeSpeed.bind(this);
  }

  

  componentDidMount() {
    this.loadVehicles();
  }

  async loadVehicles() {
    const userId = this.props.userId;
    const [err, response] = await to(VehiclesService.searchVehicles(userId));
    if (!err && response.paging.total) {
      const vehicleSppiners = {};
      for(var i = 0; i < response.data.length; i++) {
        vehicleSppiners[response.data[i].id] = false;
        const [err2, alerts] = await to(VehiclesService.getVehicleAlerts(response.data[i].id));
        if (!err2 && alerts.speed && alerts.movement) {
          response.data[i].alerts = alerts;
        }
      }
      this.setState({
        vehicles: response.data,
        showSppiner: false,
        vehicleSppiners: vehicleSppiners
      });
    } else {
      this.setState({
        vehicles: [],
        showSppiner: false,
        vehicleSppiners: {}
      });
    }
  }

  async updateAlerts(vehicle) {
    this.toogleVehicleSppiner(vehicle.id);
    const [err] = await to(AlertsService.updateAlerts(vehicle.alerts));
    this.toogleVehicleSppiner(vehicle.id);
    this.setState({
      snackbar: {
        visible: true,
        type: !err ? Constants.Themes.SUCCESS : Constants.Themes.ERROR
      }
    });
    setTimeout(() => {
      this.setState({
        snackbar: {
          visible: false
        }
      });
    }, 5000);
  }

  handleOnchangeSpeed(vehicleId, value) {
    let vehicles = this.state.vehicles
    let target = vehicles.find((vehicle) => vehicle.id === vehicleId)
    target.alerts.speed.speed = Number(value);
    this.setState({
      vehicles: vehicles
    })
  }

  toogleAlert(alert) {
    alert.active = !alert.active
    this.setState({
      vehicles: this.state.vehicles
    })
  }

  toogleVehicleSppiner(vehicleId) {
    const sppiners = this.state.vehicleSppiners;
    sppiners[vehicleId] = !sppiners[vehicleId];
    this.setState({
      vehicleSppiners: sppiners
    });
  }

  render() {

    return (
      <Container fluid className="main-content-container px-4">
      {/* Page Header */}
      <Row noGutters className="page-header py-4">
        <PageTitle title="Alertas" className="text-sm-left mb-3 col-sm-12" />
      </Row>

      <Alert className="mb-3" open={this.state.snackbar.visible} theme={this.state.snackbar.type}>
        {this.state.snackbar.type === Constants.Themes.SUCCESS && "Los cambios fueron efectuados con éxito"}
        {this.state.snackbar.type === Constants.Themes.ERROR && "Algo salió mal al intentar guardar los cambios. Inténtelo de nuevo."}
      </Alert>

        {this.state.showSppiner &&
          <Row>
            <Spinner animation="border" variant="primary" />
          </Row>
        }

        {!this.state.showSppiner &&
          <Row>
            {this.state.vehicles.map((vehicle,index) => (
              <Col key={vehicle.id} xl="5" lg="6">
                <Card small className="mb-4">
                  <CardHeader className="border-bottom">
                    <h6 className="m-0">{`${vehicle.brand} ${vehicle.brand_line} - ${vehicle.plate}`}</h6>
                  </CardHeader>
                  {
                    vehicle.alerts? 
                    <Form>
                      <ListGroup flush>
                        <ListGroupItem className="px-3">
                          <div className="py-2">
                            <strong className="text-muted d-block mb-2">
                              Alarma de movimiento
                            </strong>
                            <FormCheckbox id={'cbx-' + index + '-mvmnt'} toggle small
                              checked={vehicle.alerts.movement.active}
                              onChange={() => this.toogleAlert(vehicle.alerts.movement)}>
                              {vehicle.alerts.movement.active ? 'Activada' : 'Desactivada'}
                            </FormCheckbox>
                          </div>
                          <div className="pt-2">
                            <strong className="text-muted d-block mb-2">
                              Alarma de velocidad
                            </strong>
                            <Row>
                              <Col lg="12" xl="5" className="px-3 py-1">
                                <FormCheckbox id={'cbx-' + index + '-speed'} toggle small
                                  checked={vehicle.alerts.speed.active}
                                  onChange={() => this.toogleAlert(vehicle.alerts.speed)}>
                                  {vehicle.alerts.speed.active ? 'Activada' : 'Desactivada'}
                                </FormCheckbox>
                              </Col>
                              <Col lg="12" xl="7" className="px-3">
                                <InputGroup className="mb-3">
                                  <InputGroupAddon type="prepend">
                                    <InputGroupText>Velocidad max</InputGroupText>
                                  </InputGroupAddon>
                                  <FormInput disabled={!vehicle.alerts.speed.active} size="sm"
                                    value={vehicle.alerts.speed.speed}
                                    onChange={(event) => this.handleOnchangeSpeed(vehicle.id, event.target.value)} />
                                  <InputGroupAddon type="append">
                                    <InputGroupText>Km / h.</InputGroupText>
                                  </InputGroupAddon>
                                </InputGroup>
                              </Col>
                            </Row>
                          </div>
                        </ListGroupItem>
                        <ListGroupItem className="pt-0">
                          <Button id={'save-btn-' + index} block onClick={() => this.updateAlerts(vehicle)} label="Guardar" showSppiner={this.state.vehicleSppiners[vehicle.id]}></Button>
                        </ListGroupItem>
                      </ListGroup>
                    </Form> 
                    :
                    <Error />
                  }
                </Card>
              </Col>
            ))}
          </Row>
        }

    </Container>
  )
  }
}


const Error = (props) => (
  <Container fluid className="main-content-container px-4 pb-4">
    <div className="alerts_error">
      <div className="error__content">
        <i class="material-icons">error_outline</i>
        <h4>Ups.. Algo salió mal</h4>
        <p>Ocurrió un error en el sistema. Inténtelo de nuevo.</p>
      </div>
    </div>
  </Container>
);

function mapStateToProps(state) {
  const { userInfo } = state
  return { userId: userInfo.id }
}

export default connect(mapStateToProps)(Alerts)