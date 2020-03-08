import React from "react";
import PageTitle from "./../components/common/PageTitle";
import to from "await-to-js";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  FormInput,
  FormFeedback,
  FormGroup,
  FormSelect,
  Form,
  Alert
} from "shards-react";
import Button from "../components/common/Button";
import { UsersService, RolesService } from "../api/services";
import validations from "../utils/ValidationsUtil";
import constants from "../utils/Constants";
import "../styles/register.css";
var _ = require('lodash');

const errorsDefault = {
  name: {
    required: false
  },
  lastname: {
    required: false
  },
  dni: {
    required: false
  },
  email: {
    required: false,
    valid: false
  },
  role: {
    required: false
  },
  tel: {
    required: false,
    valid: false,
  },
  address: {
    required: false
  },
  zipcode: {
    required: false
  }
}

class NewClient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: errorsDefault,
      snackbar: {
        visible: false,
        type: constants.Themes.SUCCESS
      },
      showSppiner: false,
      roles: []
    }
    this.createNewClient.bind(this);
    this.invalidateError.bind(this);
  };

  async componentDidMount() {
    const roles = await RolesService.getRoles();
    this.setState({
      roles: roles
    });
  }

  async createNewClient(e) {
    e.preventDefault()
    e.persist();
    const errors = _.clone(errorsDefault);
    errors.name.required = !validations.validateRequired(e.target.name.value);
    errors.lastname.required = !validations.validateRequired(e.target.lastname.value);
    errors.dni.required = !validations.validateRequired(e.target.dni.value);
    errors.email.required = !validations.validateRequired(e.target.email.value);
    errors.email.valid = !validations.validateEmail(e.target.email.value);
    errors.role.required = !validations.validateRequired(e.target.role.value);
    errors.tel.required = !validations.validateRequired(e.target.tel.value);
    errors.tel.valid = !validations.validateNumber(e.target.tel.value);
    errors.address.required = !validations.validateRequired(e.target.address.value);
    errors.zipcode.required = !validations.validateRequired(e.target.zipcode.value);

    if (Object.values(errors).find(fieldValidations => Object.values(fieldValidations).find(value => value))) {  // Si alguno de los errores está en true...
      this.setState({
        errors: errors
      })
    } else {

      this.setState({
        showSppiner: true
      })

      const user = {
        name: e.target.name.value,
        last_name: e.target.lastname.value,
        dni: e.target.dni.value,
        email: e.target.email.value,
        phone: e.target.tel.value,
        address: e.target.address.value,
        role: e.target.role.value
      };

      const [err, client] = await to(UsersService.createUser(user));
      this.setState({
        snackbar: {
          visible: true,
          type: !err && client ? constants.Themes.SUCCESS : constants.Themes.ERROR
        },
        showSppiner: false
      })
      setTimeout(() => {
        this.setState({
          snackbar: {
            visible: false
          }
        });
      }, 4000);
    }
  }

  invalidateError(field) {
    let errors = this.state.errors;
    Object.keys(errors[field]).forEach(validationType => errors[field][validationType] = false)
    this.setState({
      errors: errors
    })
  }

  render() {
    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle title="Registrar" subtitle="Clientes" className="text-sm-left mb-3 col-sm-12" />
        </Row>

        {
          this.state.snackbar.visible && 
          <Row noGutters className="register__alert_row w-100">
            <Alert className="my-auto w-100" open={this.state.snackbar.visible} theme={this.state.snackbar.type}>
              {this.state.snackbar.type === constants.Themes.SUCCESS && "El cliente se registró correctamente. Ya puedes cargarle nuevos vehículos."}
              {this.state.snackbar.type === constants.Themes.ERROR && "Algo salió mal al intentar registrar el cliente. Inténtelo de nuevo."}
            </Alert>
          </Row>
        }

        <Row noGutters className="h-100 py-4">
          <Col className="mx-auto register">
            <Card small>
              <CardBody className="px-4">
                <Form onSubmit={(e) => this.createNewClient(e)} noValidate>
                  <FormGroup className="py-4 mb-2">
                    <Row form>
                      {/* Nombre */}
                      <Col md="6" className="form-group">
                        <label htmlFor="name">Nombre</label>
                        <FormInput
                          id="name"
                          placeholder="Nombre"
                          invalid={this.state.errors.name.required}
                          onChange={() => this.invalidateError("name")}
                        />
                        <FormFeedback>Campo requerido</FormFeedback>
                      </Col>
                      {/* Apellido */}
                      <Col md="6" className="form-group">
                        <label htmlFor="lastname">Apellido</label>
                        <FormInput
                          id="lastname"
                          placeholder="Apellido"
                          invalid={this.state.errors.lastname.required}
                          onChange={() => this.invalidateError("lastname")}
                        />
                        <FormFeedback>Campo requerido</FormFeedback>
                      </Col>
                    </Row>
                    <Row form>
                      {/* DNI */}
                      <Col md="6" className="form-group">
                        <label htmlFor="dni">DNI</label>
                        <FormInput
                          id="dni"
                          placeholder="DNI"
                          invalid={this.state.errors.dni.required}
                          onChange={() => this.invalidateError("dni")}
                        />
                        <FormFeedback>Campo requerido</FormFeedback>
                      </Col>
                      {/* Teléfono */}
                      <Col md="6" className="form-group">
                        <label htmlFor="tel">Teléfono</label>
                        <FormInput
                          type="tel"
                          id="tel"
                          placeholder="Teléfono"
                          invalid={this.state.errors.tel.required || this.state.errors.tel.valid}
                          onChange={() => this.invalidateError("tel")}
                        />
                        {this.state.errors.tel.required && <FormFeedback>Campo requerido</FormFeedback>}
                        {this.state.errors.tel.valid && <FormFeedback>Solo se permiten números</FormFeedback>}
                      </Col>
                    </Row>
                    <Row form>
                      {/* Email */}
                      <Col md="8" className="form-group">
                        <label htmlFor="email">Email</label>
                        <FormInput
                          type="email"
                          id="email"
                          placeholder="Dirección de correo"
                          autoComplete="email"
                          invalid={this.state.errors.email.required || this.state.errors.email.valid}
                          onChange={() => this.invalidateError("email")}
                        />
                        {this.state.errors.email.required && <FormFeedback>Campo requerido</FormFeedback>}
                        {this.state.errors.email.valid && <FormFeedback>La dirección de correo no es válida. Una dirección válida se vería así: micorreo@dominio.com</FormFeedback>}
                      </Col>
                      <Col className="form-group">
                        <label htmlFor="role">Rol</label>
                        <FormSelect 
                          id="role"
                          placeholder="Rol"
                          invalid={this.state.errors.role.required}
                          onChange={() => this.invalidateError("role")}
                          >
                          {
                            this.state.roles.map((role, index) => {
                              return <option key={role.id} value={role.name}>{role.name}</option>
                            })
                          }
                        </FormSelect>
                        {this.state.errors.role.required && <FormFeedback>Campo requerido</FormFeedback>}
                      </Col>
                    </Row>
                    <Row form>
                      {/* Dirección */}
                      <Col md="9">
                        <label htmlFor="address">Dirección</label>
                        <FormInput
                          id="address"
                          placeholder="Dirección"
                          invalid={this.state.errors.address.required}
                          onChange={() => this.invalidateError("address")}
                        />
                        {this.state.errors.address.required && <FormFeedback>Campo requerido</FormFeedback>}
                      </Col>
                      {/* Zip Code */}
                      <Col md="3">
                        <label htmlFor="zipcode">CP</label>
                        <FormInput
                          id="zipcode"
                          placeholder="CP"
                          invalid={this.state.errors.zipcode.required}
                          onChange={() => this.invalidateError("zipcode")}
                        />
                        {this.state.errors.zipcode.required && <FormFeedback>Campo requerido</FormFeedback>}
                      </Col>
                    </Row>
                  </FormGroup>
                  <FormGroup className="mb-0">
                    <Button type="submit" theme="accent" className="d-table ml-auto" size="100px" label="Registrar nuevo cliente" showSppiner={this.state.showSppiner}></Button>
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default NewClient;