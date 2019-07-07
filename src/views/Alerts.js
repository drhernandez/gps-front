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
  Button
} from "shards-react"
import PageTitle from "./../components/common/PageTitle";
//services
import UsersService from "./../api/services/usersService";
import VehiclesService from "./../api/services/vehiclesService";

export default class Alerts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      vehicles: [],
      alerts: []
    }
    this.toogleAlert = this.toogleAlert.bind(this);
  }

  async loadVehicles() {
    const usersService = new UsersService();
    const vehiclesServices = new VehiclesService();
    let vehicles = await usersService.getVehiclesByUserID(10);
    for (let i = 0; i < vehicles.length; i++) {
      vehicles[i].alerts = await vehiclesServices.getVehicleAlerts(vehicles[i].id)
    }
    this.setState({
      vehicles: vehicles
    });
  }

  async componentWillMount() {
    this.loadVehicles();
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

        <Row>
          {this.state.vehicles.map((vehicle) => (
            <Col key={vehicle.id} xl="5" lg="6">
              <Card small className="mb-4">
                <CardHeader className="border-bottom">
                  <h6 className="m-0">{`${vehicle.type} - ${vehicle.plate}`}</h6>
                </CardHeader>
                <ListGroup flush>
                  <ListGroupItem className="px-3">
                    <Form>
                      <div className="py-2">
                        <strong className="text-muted d-block mb-2">
                          Alarma de movimiento
                      </strong>
                        <FormCheckbox toggle small 
                          checked={vehicle.alerts.movementAlert.active} 
                          onChange={() => this.toogleAlert(vehicle.alerts.movementAlert)}>
                          { vehicle.alerts.movementAlert.active ? 'Desactivada' : 'Activada' }
                      </FormCheckbox>
                      </div>
                      <div className="py-2">
                        <strong className="text-muted d-block mb-2">
                          Alarma de velocidad
                      </strong>
                        <Row>
                          <Col lg="4">
                            <FormCheckbox toggle small
                              checked={vehicle.alerts.speedAlert.active}
                              onChange={() => this.toogleAlert(vehicle.alerts.speedAlert)}>
                              {vehicle.alerts.speedAlert.active ? 'Desactivada' : 'Activada'}
                            </FormCheckbox>
                          </Col>
                          <Col lg="8">
                            <InputGroup className="mb-3">
                              <InputGroupAddon type="prepend">
                                <InputGroupText><i className="material-icons">directions_car</i></InputGroupText>
                              </InputGroupAddon>
                              <FormInput placeholder="Velocidad máxima" />
                            </InputGroup>
                          </Col>
                        </Row>
                      </div>
                    </Form>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Button block>Guardar</Button>
                  </ListGroupItem>
                </ListGroup>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    )
  }
}