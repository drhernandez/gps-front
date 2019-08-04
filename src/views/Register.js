import React from "react";
import { Link, withRouter } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  FormInput,
  FormFeedback,
  FormGroup,
  Form,
  Button,
  Alert
} from "shards-react";
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
  email: {
    required: false,
    valid: false
  },
  tel: {
    required: false,
    valid: false,
  },
  password: {
    required: false,
    valid: false
  },
  confirmPassword: {
    required: false,
    valid: false
  },
  address: {
    required: false
  },
  zipcode: {
    required: false
  }
}

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: errorsDefault,
      snackbar: {
        visible: false,
        type: constants.Themes.SUCCESS
      }
    }
    this.createAccount.bind(this);
    this.invalidateError.bind(this);
  };

  createAccount(e) {
    e.preventDefault()
    e.persist();
    const errors = _.clone(errorsDefault);
    errors.name.required = !validations.validateRequired(e.target.name.value);
    errors.lastname.required = !validations.validateRequired(e.target.lastname.value);
    errors.email.required = !validations.validateRequired(e.target.email.value);
    errors.email.valid = !validations.validateEmail(e.target.email.value);
    errors.tel.required = !validations.validateRequired(e.target.tel.value);
    errors.tel.valid = !validations.validateNumber(e.target.tel.value);
    errors.password.required = !validations.validateRequired(e.target.password.value);
    errors.password.valid = !validations.validatePassword(e.target.password.value, validations.passwordStrenghts.PASSWORD_STRENGHT_2);
    errors.confirmPassword.required = !validations.validateRequired(e.target.confirmPassword.value);
    errors.confirmPassword.valid = !validations.validateEquals(e.target.password.value, e.target.confirmPassword.value);
    errors.address.required = !validations.validateRequired(e.target.address.value);
    errors.zipcode.required = !validations.validateRequired(e.target.zipcode.value);    

    if (Object.values(errors).find(fieldValidations => Object.values(fieldValidations).find(value => value))) {  // Si alguno de los errores está en true...
      this.setState({
        errors: errors
      })
    } else {
      console.log(e.target.name.value);
      console.log(e.target.lastname.value);
      console.log(e.target.email.value);
      console.log(e.target.tel.value);
      console.log(e.target.password.value);
      console.log(e.target.confirmPassword.value);
      console.log(e.target.address.value);
      console.log(e.target.zipcode.value);

      //call service
      const created = true;
      if (created) {
        this.setState({
          snackbar: {
            visible: true,
            type: constants.Themes.SUCCESS
          }
        })
        setTimeout(() => {
          this.props.history.push("/signin");
        }, 4000);
      } else {
        this.setState({
          snackbar: {
            visible: true,
            type: constants.Themes.ERROR
          }
        });
        setTimeout(() => {
          this.setState({
            snackbar: {
              visible: false
            }
          });
        }, 4000);
      }
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
      <Container fluid className="main-content-container px-4 h-100">
        <Row noGutters className="h-100">
          <Col className="mx-auto register">
            <Card small>
              <CardBody className="px-4">
                <h5 className="register__titulo text-center mt-5 mb-4">Crea una cuenta nueva</h5>
                <Form onSubmit={(e) => this.createAccount(e)} noValidate>
                  <FormGroup>
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
                      {/* Email */}
                      <Col md="7" className="form-group">
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
                      {/* Teléfono */}
                      <Col md="5" className="form-group">
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
                      {/* Contraseña */}
                      <Col md="6" className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <FormInput
                          type="password"
                          id="password"
                          placeholder="Contraseña"
                          autoComplete="current-password"
                          invalid={this.state.errors.password.required || this.state.errors.password.valid || this.state.errors.confirmPassword.valid}
                          onChange={() => this.invalidateError("password")}
                        />
                        {this.state.errors.password.required && <FormFeedback>Campo requerido</FormFeedback>}
                        {this.state.errors.password.valid && <FormFeedback>La contraseña debe contener un mínimo
                          de 8 caracteres, una mayúscula y un número
                      </FormFeedback>}
                      </Col>
                      {/* Repetir contraseña */}
                      <Col md="6" className="form-group">
                        <label htmlFor="confirmPassword">Repetir contraseña</label>
                        <FormInput
                          type="password"
                          id="confirmPassword"
                          placeholder="Repetir contraseña"
                          invalid={this.state.errors.confirmPassword.required || this.state.errors.confirmPassword.valid}
                          onChange={() => this.invalidateError("confirmPassword")}
                        />
                        {this.state.errors.confirmPassword.required && <FormFeedback>Campo requerido</FormFeedback>}
                        {this.state.errors.confirmPassword.valid && <FormFeedback>Las contraseñas no coinciden</FormFeedback>}
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
                  <FormGroup>
                    <Button type="submit" theme="accent" className="d-table ml-auto">Registrarse</Button>
                  </FormGroup>
                  <FormGroup>
                    <Alert className="mb-3" open={this.state.snackbar.visible} theme={this.state.snackbar.type}>
                      {this.state.snackbar.type === constants.Themes.SUCCESS && "Tu cuenta se creó correctamente. Serás redireccionado al login."}
                      {this.state.snackbar.type === constants.Themes.ERROR && "Algo salió mal al intentar crear la cuenta. Inténtelo de nuevo."}
                    </Alert>
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
            <div className="px-2 pt-3 register__justify_links">
              <Link to="/forgot-password">Olvidaste tu contraseña?</Link>
              <Link to="/signin">Volver al login</Link>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(Register);