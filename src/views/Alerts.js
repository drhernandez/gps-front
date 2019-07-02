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

export default class Alerts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      vehicles: []
    }
  }

  async loadVehicles() {
    const usersService = new UsersService();
    const vehicles = await usersService.getVehiclesByUserID(10);
    this.setState({
      vehicles: vehicles
    });
  }

  componentWillMount() {
    this.loadVehicles();
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
            <Col sm="5">
              <Card key={vehicle.id} small className="mb-4">
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
                        <FormCheckbox toggle small>
                          Default
                      </FormCheckbox>
                      </div>
                      <div className="py-2">
                        <strong className="text-muted d-block mb-2">
                          Alarma de velocidad
                      </strong>
                      <Row>
                        <Col md="4">
                          <FormCheckbox toggle small>
                            Default
                          </FormCheckbox>
                        </Col>
                        <Col md="8">
                          <InputGroup className="mb-3">
                            <InputGroupAddon type="prepend">
                              {/* <i className="material-icons">map</i> */}
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