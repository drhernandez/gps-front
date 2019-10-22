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
  Button,
  Alert
} from "shards-react"
import PageTitle from "./../components/common/PageTitle";
import Spinner from 'react-bootstrap/Spinner'
//services
import UsersService from "./../api/services/usersService";
import VehiclesService from "./../api/services/vehiclesService";
import AlertsService from "./../api/services/alertsService";
import Constants from "../utils/Constants";

export default class Alerts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      vehicles: [],
      alerts: [],
      snackbar: {
        visible: false,
        type: Constants.Themes.SUCCESS
      },
      showSppiner: true
    }
    this.loadVehicles = this.loadVehicles.bind(this);
    this.updateAlerts = this.updateAlerts.bind(this);
    this.toogleAlert = this.toogleAlert.bind(this);
    this.handleOnchangeSpeed = this.handleOnchangeSpeed.bind(this);
  }

  async componentWillMount() {
    this.loadVehicles();
  }

  async loadVehicles() {
    const usersService = new UsersService();
    const vehiclesServices = new VehiclesService();
    let vehicles = await usersService.getVehiclesByUserID(10);
    for (let i = 0; i < vehicles.length; i++) {
      vehicles[i].alerts = await vehiclesServices.getVehicleAlerts(vehicles[i].id)
    }
    this.setState({
      vehicles: vehicles,
      showSppiner: false
    });
  }

  async updateAlerts(alerts) {
    const alertsService = new AlertsService();
    const updated = await alertsService.updateAlerts(alerts);
    this.setState({
      snackbar: {
        visible: true,
        type: updated ? Constants.Themes.SUCCESS : Constants.Themes.ERROR
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
            {this.state.vehicles.map((vehicle) => (
              <Col key={vehicle.id} xl="5" lg="6">
                <Card small className="mb-4">
                  <CardHeader className="border-bottom">
                    <h6 className="m-0">{`${vehicle.type} - ${vehicle.plate}`}</h6>
                  </CardHeader>
                  <Form>
                    <ListGroup flush>
                      <ListGroupItem className="px-3">
                        <div className="py-2">
                          <strong className="text-muted d-block mb-2">
                            Alarma de movimiento
                          </strong>
                          <FormCheckbox toggle small
                                        checked={vehicle.alerts.movement.active}
                                        onChange={() => this.toogleAlert(vehicle.alerts.movement)}>
                            {vehicle.alerts.movement.active ? 'Activada' : 'Desactivada'}
                          </FormCheckbox>
                        </div>
                        <div className="py-2">
                          <strong className="text-muted d-block mb-2">
                            Alarma de velocidad
                          </strong>
                          <Row>
                            <Col lg="12" xl="4" className="px-3 py-1">
                              <FormCheckbox toggle small
                                            checked={vehicle.alerts.speed.active}
                                            onChange={() => this.toogleAlert(vehicle.alerts.speed)}>
                                {vehicle.alerts.speed.active ? 'Activada' : 'Desactivada'}
                              </FormCheckbox>
                            </Col>
                            <Col lg="12" xl="8" className="px-3">
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
                      <ListGroupItem>
                        <Button onClick={() => this.updateAlerts(vehicle.alerts)} block>Guardar</Button>
                      </ListGroupItem>
                    </ListGroup>
                  </Form>
                </Card>
              </Col>
            ))}
          </Row>
        }

    </Container>
  )
  }
}
