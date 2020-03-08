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

class ClientsAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchBarDisabled: false,
      errors: null,
      sppiners: null,
      showAddForm: false,
      userData: null,
      alert: {
        visible: false,
        type: Constants.Themes.ERROR
      }
    }
    this.showAddVehicleForm.bind(this);
    this.search.bind(this);
    this.saveDevicePhysicalId.bind(this);
    this.addVehicle.bind(this);
    this.deleteVehicle.bind(this);
    this.invalidateError.bind(this);
    this.toogleSppiner.bind(this);
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
      userData: null,
      errors: null,
      sppiners: null
    })
    const [err, response] = await to(UsersService.getUserByEmail(email));
    if (err != null) {
      console.log(err);
      this.setState({
        searchBarDisabled: false,
        alert: {
          visible: true,
          type: err.status === 404 ? Constants.Themes.WARNING : Constants.Themes.ERROR
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
      const userData = response;
      const sppiners = [];
      userData.vehicles.forEach((vehicle, index) => {
        errorsDefault.push({ required: false });
        sppiners.push({
          save: false,
          delete: false
        })
      });
      this.setState({
        searchBarDisabled: false,
        userData: userData,
        errors: errorsDefault,
        sppiners: sppiners
      });
    }
  }

  addVehicle(vehicle) {
    const userData = this.state.userData;
    const sppiners = this.state.sppiners;
    userData.vehicles.push(vehicle);
    sppiners.push({
      save: false,
      delete: false
    });
    errorsDefault.push({ required: false });
    this.setState({
      userData: userData,
      errors: errorsDefault,
      sppiners: sppiners,
      showAddForm: false
    })
  }

  async deleteVehicle(index) {
    const vehicleId = this.state.userData.vehicles[index].id;
    this.toogleSppiner(index, "delete");
    const [err] = await to(VehiclesService.deleteVehicle(vehicleId));
    if (!err) {
      const userData = this.state.userData;
      const sppiners = this.state.sppiners;
      userData.vehicles.splice(index, 1);
      sppiners.splice(index, 1);
      errorsDefault.splice(index, 1);
      this.setState({
        userData,
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

  async saveDevicePhysicalId(event, index) {
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
      const vehicleId = this.state.userData.vehicles[index].id;
      const devicePhysicalId = event.target[`devicePhysicalId-${index}`].value;
      const [err, result] = await to(VehiclesService.setPhysicalIdToVehicle(vehicleId, devicePhysicalId));
      
      if (err) {
        // ver que onda
        console.log(err);
      } 
      else {
        const userData = this.state.userData;
        userData.vehicles[index] = result;
        this.setState({
          userData
        })
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
          // <Row noGutters className="register__alert_row w-100">
          <Row noGutters className="w-100">
            <Alert className="my-auto w-100" open={this.state.alert.visible} theme={this.state.alert.type}>
              {this.state.alert.type === Constants.Themes.WARNING && "Usuario no encontrado."}
              {this.state.alert.type === Constants.Themes.ERROR && "Algo salió mal al intentar obtener el usuario. Inténtelo de nuevo."}
            </Alert>
          </Row>
        }

        <Row noGutters className="py-4">
          <Card small className="mx-auto w-75 mb-4">
            <CardHeader className="mt-3">
              <NavbarSearch disabled={this.state.searchBarDisabled} placeholder="Buscar clientes por email..." searchFunction={(e) => this.search(e)}/>
            </CardHeader>
            { this.state.userData &&
              <CardBody>
                <CardTitle>Datos personales</CardTitle>
                <Container>
                  <Row>
                    <Col md='3'>
                      <Row>
                        <label htmlFor="name">Nombre</label>
                      </Row>
                      <Row>
                        <p className="row-data">{this.state.userData.name}</p>
                      </Row>
                    </Col>
                    <Col md='3'>
                      <Row>
                        <label htmlFor="lastname">Apellido</label>
                      </Row>
                      <Row>
                        <p className="row-data">{this.state.userData.last_name}</p>
                      </Row>
                    </Col>
                    <Col md='2'>
                      <Row>
                        <label htmlFor="dni">DNI</label>
                      </Row>
                      <Row>
                        <p className="row-data">{this.state.userData.dni}</p>
                      </Row>
                    </Col>
                    <Col md='4'>
                      <Row>
                        <label htmlFor="email">Correo</label>
                      </Row>
                      <Row>
                        <p className="row-data">{this.state.userData.email}</p>
                      </Row>
                    </Col>
                  </Row>
                </Container>
                <CardTitle>Vehículos <i className="material-icons px-1 icon-blue" onClick={(e) => this.showAddVehicleForm(e)}>add_circle_outline</i></CardTitle>
                <Container>
                  {
                    this.state.userData.vehicles.length > 0 &&
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
                          this.state.userData.vehicles.map((vehicle, index) => {
                            return (
                              <tr key={index + 1}>
                                <td>{index + 1}</td>
                                <td>{vehicle.brand}</td>
                                <td>{vehicle.brandline}</td>
                                <td>{vehicle.plate}</td>
                                <td style={{maxWidth: "150px"}}>{
                                  vehicle.devicePhysicalId ? vehicle.devicePhysicalId :
                                    <Form id={"form-" + index} onSubmit={(e) => this.saveDevicePhysicalId(e, index)} noValidate>
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
                    this.state.userData.vehicles.length === 0 && !this.state.showAddForm &&
                    <Row>
                      <p className="row-data-dissable">El usuario aún no posee vehículos cargados. Para agregar nuevos vehículos puedes usar el botón al costado del título o hacer <span onClick={(e) => this.showAddVehicleForm(e)} className="click-here">click aquí</span></p>
                    </Row>
                  }
                  {
                    this.state.showAddForm &&
                    <Row>
                      <AddVehicle addVehicle={(vehicle) => this.addVehicle(vehicle)} />
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