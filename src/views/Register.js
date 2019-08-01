import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  FormInput,
  FormFeedback,
  Form,
  Button,
} from "shards-react";
import validations from "../utils/ValidationsUtil";

import "../styles/register.css";

const initialValues = {
  nameRequired: false,
  lastnameRequired: false,
  emailRequired: false,
  emailValid: false,
  telRequired: false,
  telValid: false,
  passwordRequired: false,
  passwordValid: false,
  confirmPasswordRequired: false,
  confirmPasswordValid: false,
  addressRequired: false,
  zipcodeRequired: false
}

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: initialValues
    }
    this.createAccount.bind(this);
    this.invalidateError.bind(this);
  };

  createAccount(e) {
    e.preventDefault()
    e.persist();
    const errors = {
      nameRequired: !validations.validateRequired(e.target.name.value),
      lastnameRequired: !validations.validateRequired(e.target.lastname.value),
      emailRequired: !validations.validateRequired(e.target.email.value),
      emailValid: !validations.validateEmail(e.target.email.value),
      telRequired: !validations.validateRequired(e.target.tel.value),
      telValid: !validations.validateNumber(e.target.tel.value),
      passwordRequired: !validations.validateRequired(e.target.password.value),
      passwordValid: !validations.validatePassword(e.target.password.value, validations.passwordStrenghts.PASSWORD_STRENGHT_2),
      confirmPasswordRequired: !validations.validateRequired(e.target.confirmPassword.value),
      confirmPasswordValid: !validations.validateEquals(e.target.password.value, e.target.confirmPassword.value),
      addressRequired: !validations.validateRequired(e.target.address.value),
      zipcodeRequired: !validations.validateRequired(e.target.zipcode.value)
    }

    if (Object.values(errors).find(hasError => hasError)) {  // Si alguno de los errores está en true...
      this.setState({
        errors: errors
      })
    } else {
      this.setState({
        errors: initialValues
      })
      console.log(e.target.name.value);
      console.log(e.target.lastname.value);
      console.log(e.target.email.value);
      console.log(e.target.tel.value);
      console.log(e.target.password.value);
      console.log(e.target.confirmPassword.value);
      console.log(e.target.address.value);
      console.log(e.target.zipcode.value);

      //call service
    }
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
                {/* <Form onSubmit={(e) => this.createAccount(e)}> */}
                  <Row form>
                    {/* Nombre */}
                    <Col md="6" className="form-group">
                      <label htmlFor="name">Nombre</label>
                      <FormInput
                        id="name"
                        placeholder="Nombre"
                        invalid={this.state.errors.nameRequired}
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
                        invalid={this.state.errors.lastnameRequired}
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
                        invalid={this.state.errors.emailRequired || this.state.errors.emailValid}
                        onChange={() => this.invalidateError("email")}
                      />
                      {this.state.errors.emailRequired && <FormFeedback>Campo requerido</FormFeedback>}
                      {this.state.errors.emailValid && <FormFeedback>Incluye un signo @ en la dirección de correo</FormFeedback>}
                    </Col>
                    {/* Teléfono */}
                    <Col md="5" className="form-group">
                      <label htmlFor="tel">Teléfono</label>
                      <FormInput
                        type="tel"
                        id="tel"
                        placeholder="Teléfono"
                        invalid={this.state.errors.telRequired || this.state.errors.telValid}
                        onChange={() => this.invalidateError("tel")}
                      />
                      {this.state.errors.telRequired && <FormFeedback>Campo requerido</FormFeedback>}
                      {this.state.errors.telValid && <FormFeedback>Solo se permiten números</FormFeedback>}
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
                        invalid={this.state.errors.passwordRequired || this.state.errors.passwordValid || this.state.errors.confirmPasswordValid}
                        onChange={() => this.invalidateError("password")}
                      />
                      {this.state.errors.passwordRequired && <FormFeedback>Campo requerido</FormFeedback>}
                      {this.state.errors.passwordValid && <FormFeedback>La contraseña debe contener un mínimo 
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
                        invalid={this.state.errors.confirmPasswordRequired || this.state.errors.confirmPasswordValid}
                        onChange={() => this.invalidateError("confirmPassword")}
                      />
                      {this.state.errors.confirmPasswordRequired && <FormFeedback>Campo requerido</FormFeedback>}
                      {this.state.errors.confirmPasswordValid && <FormFeedback>Las contraseñas no coinciden</FormFeedback>}
                    </Col>
                  </Row>
                  <Row form>
                    {/* Dirección */}
                    <Col md="9" className="form-group">
                      <label htmlFor="address">Dirección</label>
                      <FormInput
                        id="address"
                        placeholder="Dirección"
                        invalid={this.state.errors.addressRequired}
                        onChange={() => this.invalidateError("address")}
                      />
                      {this.state.errors.addressRequired && <FormFeedback>Campo requerido</FormFeedback>}
                    </Col>
                    {/* Zip Code */}
                    <Col md="3" className="form-group">
                      <label htmlFor="zipcode">CP</label>
                      <FormInput
                        id="zipcode"
                        placeholder="CP"
                        invalid={this.state.errors.zipcodeRequired}
                        onChange={() => this.invalidateError("zipcode")}
                      />
                      {this.state.errors.zipcodeRequired && <FormFeedback>Campo requerido</FormFeedback>}
                    </Col>
                  </Row>
                  <Row>
                    <Button className="ml-auto" type="submit" theme="accent">Registrarse</Button>
                  </Row>
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


  invalidateError(field) {
    switch (field) {
      case "name":
        this.setState(prevState => ({
          errors: {
            ...prevState.errors,
            nameRequired: false
          }
        }))
        break;
      case "lastname":
        this.setState(prevState => ({
          errors: {
            ...prevState.errors,
            lastnameRequired: false
          }
        }))
        break;
      case "email":
        this.setState(prevState => ({
          errors: {
            ...prevState.errors,
            emailRequired: false,
            emailValid: false
          }
        }))
        break;
      case "tel":
        this.setState(prevState => ({
          errors: {
            ...prevState.errors,
            telRequired: false,
            telValid: false
          }
        }))
        break;
      case "password":
        this.setState(prevState => ({
          errors: {
            ...prevState.errors,
            passwordRequired: false,
            passwordValid: false
          }
        }))
        break;
      case "confirmPassword":
        this.setState(prevState => ({
          errors: {
            ...prevState.errors,
            confirmPasswordRequired: false,
            confirmPasswordValid: false
          }
        }))
        break;
      case "address":
        this.setState(prevState => ({
          errors: {
            ...prevState.errors,
            addressRequired: false
          }
        }))
        break;
      case "zipcode":
        this.setState(prevState => ({
          errors: {
            ...prevState.errors,
            zipcodeRequired: false
          }
        }))
        break;
      default:
        this.setState({
          errors: initialValues
        })
        break;
    }
  }
}