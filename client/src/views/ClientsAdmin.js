import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Form,
  FormInput,
  FormFeedback,
  Alert
} from "shards-react";
import Constants from "../utils/Constants";
import Button from "../components/common/Button"
import AddVehicle from "../components/common/AddVehicle";
import PageTitle from "../components/common/PageTitle";
import NavbarSearch from "../components/common/search/NavbarSearch"
import validations from "../utils/ValidationsUtil";
import { UsersService, VehiclesService } from "../api/services";
import "../styles/clientsAdmin.css"
import { to } from "await-to-js";
var _ = require('lodash');

const errorsDefault = []

const errorMessages = {
  generic: {
    type: Constants.Themes.ERROR,
    message: "Algo salió mal al intentar obtener los datos del usuario. Inténtelo de nuevo."
  },
  userNotFound: {
    type: Constants.Themes.WARNING,
    message: "Usuario no encontrado."
  },
  invalidPhysicalId: {
    type: Constants.Themes.ERROR,
    message: "El Nro de placa ingresado es incorrecto o ya está en uso."
  },
  errorDeleteVehicle: {
    type: Constants.Themes.ERROR,
    message: "Algo salió mal al intentar borrar el vehículo. Inténtelo de nuevo."
  }
}

class ClientsAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchBarDisabled: false,
      errors: null,
      sppiners: null,
      showAddForm: false,
      user: null,
      alert: {
        visible: false,
        ...errorMessages.generic
      }
    }
    this.showAddVehicleForm = this.showAddVehicleForm.bind(this);
    this.search = this.search.bind(this);
    this.setDevicePhysicalId = this.setDevicePhysicalId.bind(this);
    this.addVehicle = this.addVehicle.bind(this);
    this.deleteVehicle = this.deleteVehicle.bind(this);
    this.invalidateError = this.invalidateError.bind(this);
    this.toogleSppiner = this.toogleSppiner.bind(this);
  };

  showAddVehicleForm(event) {
    event.preventDefault();
    this.setState({
      showAddForm: true
    })
  }

  async search(e) {
    e.preventDefault();
    e.persist();

    const email = e.target["search-input"].value;
    this.setState({
      searchBarDisabled: true,
      user: null,
      errors: null,
      sppiners: null
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
        this.setState({
          searchBarDisabled: false,
          alert: {
            visible: true,
            ...errorMessages.generic
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
        user.vehicles = results.data;
        const sppiners = [];
        user.vehicles.forEach((vehicle, index) => {
          errorsDefault.push({ required: false });
          sppiners.push({
            save: false,
            delete: false
          })
        });
        this.setState({
          searchBarDisabled: false,
          user: user,
          errors: errorsDefault,
          sppiners: sppiners
        });
      }
    }
  }

  addVehicle(vehicle) {
    const user = this.state.user;
    const sppiners = this.state.sppiners;
    user.vehicles.push(vehicle);
    sppiners.push({
      save: false,
      delete: false
    });
    errorsDefault.push({ required: false });
    this.setState({
      user: user,
      errors: errorsDefault,
      sppiners: sppiners,
      showAddForm: false
    })
  }

  async deleteVehicle(index) {
    const vehicleId = this.state.user.vehicles[index].id;
    this.toogleSppiner(index, "delete");
    const [err] = await to(VehiclesService.deleteVehicle(vehicleId));
    if (err) {
      this.toogleSppiner(index, "delete");
      this.setState({
        searchBarDisabled: false,
        alert: {
          visible: true,
          ...errorMessages.errorDeleteVehicle
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
    } else {
      const user = this.state.user;
      const sppiners = this.state.sppiners;
      user.vehicles.splice(index, 1);
      sppiners.splice(index, 1);
      errorsDefault.splice(index, 1);
      this.setState({
        user,
        errorsDefault,
        sppiners: sppiners
      })
    }
  }

  invalidateError(index) {
    const errors = this.state.errors; 
    Object.keys(errors[index]).forEach(validationType => errors[index][validationType] = false)
    this.setState({
      errors: errors
    });
  }

  async setDevicePhysicalId(event, index) {
    event.preventDefault();
    event.persist();
    const errors = _.clone(errorsDefault);
    errors[index].required = !validations.validateRequired(event.target[`devicePhysicalId-${index}`].value);

    if (Object.values(errors[index]).find(value => value)) {  // Si alguno de los errores está en true...
      this.setState({
        errors: errors
      })
    } else {
      this.toogleSppiner(index, "save");
      const vehicleId = this.state.user.vehicles[index].id;
      const devicePhysicalId = event.target[`devicePhysicalId-${index}`].value;
      const [err, result] = await to(VehiclesService.activate(vehicleId, devicePhysicalId));
      
      if (err) {
        this.setState({
          alert: {
            visible: true,
            ...errorMessages.invalidPhysicalId
          },
        });
        this.toogleSppiner(index, "save");
        setTimeout(() => {
          this.setState({
            alert: {
              visible: false
            }
          });
        }, 4000);
      } 
      else {
        const user = this.state.user;
        user.vehicles[index] = result;
        this.setState({
          user
        });
        this.toogleSppiner(index, "save");
      }
    }
  }

  toogleSppiner(index, type) {
    const sppiners = this.state.sppiners;
    sppiners[index][type] = !sppiners[index][type];
    this.setState({
      sppiners: sppiners
    })
  }

  render() {
    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle title="Administrar" subtitle="Clientes" className="text-sm-left mb-3 col-sm-12" />
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
              <NavbarSearch disabled={this.state.searchBarDisabled} placeholder="Buscar clientes por email..." searchFunction={(e) => this.search(e)}/>
            </CardHeader>
            { this.state.user &&
              <CardBody>
                <CardTitle>Datos personales</CardTitle>
                <Container>
                  <Row>
                    <Col md='3'>
                      <Row>
                        <label htmlFor="name">Nombre</label>
                      </Row>
                      <Row>
                        <p className="row-data">{this.state.user.name}</p>
                      </Row>
                    </Col>
                    <Col md='3'>
                      <Row>
                        <label htmlFor="lastname">Apellido</label>
                      </Row>
                      <Row>
                        <p className="row-data">{this.state.user.last_name}</p>
                      </Row>
                    </Col>
                    <Col md='2'>
                      <Row>
                        <label htmlFor="dni">DNI</label>
                      </Row>
                      <Row>
                        <p className="row-data">{this.state.user.dni}</p>
                      </Row>
                    </Col>
                    <Col md='4'>
                      <Row>
                        <label htmlFor="email">Correo</label>
                      </Row>
                      <Row>
                        <p className="row-data">{this.state.user.email}</p>
                      </Row>
                    </Col>
                  </Row>
                </Container>
                <CardTitle>Vehículos <i className="material-icons px-1 icon-blue" onClick={(e) => this.showAddVehicleForm(e)}>add_circle_outline</i></CardTitle>
                <Container>
                  {
                    this.state.user.vehicles.length > 0 &&
                    <table className="table custom-table mb-0">
                      <thead className="bg-light">
                        <tr>
                          <th scope="col" className="border-0">#</th>
                          <th scope="col" className="border-0">Marca</th>
                          <th scope="col" className="border-0">Categoría</th>
                          <th scope="col" className="border-0">Patente</th>
                          <th scope="col" className="border-0">Nro de placa</th>
                          <th scope="col" className="border-0"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          this.state.user.vehicles.map((vehicle, index) => {
                            return (
                              <tr key={index + 1}>
                                <td>{index + 1}</td>
                                <td>{vehicle.brand}</td>
                                <td>{vehicle.brand_line}</td>
                                <td>{vehicle.plate}</td>
                                <td style={{maxWidth: "150px"}}>{
                                  vehicle.device ? vehicle.device.physical_id :
                                    <Form id={"form-" + index} onSubmit={(e) => this.setDevicePhysicalId(e, index)} noValidate>
                                      <FormInput size="sm"
                                        id={`devicePhysicalId-${index}`}
                                        invalid={this.state.errors[index].required}
                                        onChange={() => this.invalidateError(index)}
                                      />
                                      <FormFeedback>Campo requerido</FormFeedback>
                                    </Form>
                                }</td>
                                <td>
                                  {
                                    !vehicle.devicePhysicalId && 
                                    <Button 
                                      form={"form-" + index} 
                                      sppinerClassName="my-auto mx-auto"
                                      className="no-hover p-1 m-1" 
                                      outline 
                                      size="sm" 
                                      type="submit" 
                                      showSppiner={this.state.sppiners[index].save} 
                                      label={<i className="material-icons icon-blue icon-x-large mx-auto my-auto">save</i>}
                                    />
                                  }
                                  <Button 
                                    className="no-hover p-1 m-1" 
                                    outline 
                                    sppinerClassName="my-auto mx-auto"
                                    size="sm" 
                                    onClick={() => this.deleteVehicle(index)} 
                                    showSppiner={this.state.sppiners[index].delete} 
                                    label={<i className="material-icons icon-blue icon-x-large mx-auto my-auto">delete</i>}
                                  />
                                </td>
                              </tr>
                            )
                          })
                        }
                      </tbody>
                    </table>
                  }
                  {
                    this.state.user.vehicles.length === 0 && !this.state.showAddForm &&
                    <Row>
                      <p className="row-data-dissable">El usuario aún no posee vehículos cargados. Para agregar nuevos vehículos puedes usar el botón al costado del título o hacer <span onClick={(e) => this.showAddVehicleForm(e)} className="click-here">click aquí</span></p>
                    </Row>
                  }
                  {
                    this.state.showAddForm &&
                    <Row>
                      <AddVehicle userId={this.state.user.id} addVehicle={(vehicle) => this.addVehicle(vehicle)} />
                    </Row>
                  }
                </Container>
              </CardBody>
            }
          </Card>
        </Row>
      </Container>
    );
  }
}

export default ClientsAdmin;