import React from "react";
import { Link, withRouter } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  FormInput,
  FormGroup,
  FormFeedback,
  Form,
  Button,
  Alert
} from "shards-react";
import validations from "../utils/ValidationsUtil";
import constants from "../utils/Constants";
import "../styles/login.css";
var _ = require('lodash');

const errorsDefault = {
  email: {
    required: false,
    valid: false
  }
}

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: errorsDefault,
      remember: false,
      snackbar: {
        visible: false,
        type: constants.Themes.SUCCESS
      }
    }

    this.restorePassword.bind(this);
    this.invalidateError.bind(this);
  };

  restorePassword(e) {
    e.preventDefault()
    e.persist();
    const errors = _.clone(errorsDefault);
    errors.email.required = !validations.validateRequired(e.target.email.value);
    errors.email.valid = !validations.validateEmail(e.target.email.value);
    
    if (Object.values(errors).find(fieldValidations => Object.values(fieldValidations).find(value => value))) {  // Si alguno de los errores está en true...
      this.setState({
        errors: errors
      })
    } else {
      //call service
      const sent = true
      if (sent) {
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
        })
        setTimeout(() => {
          this.setState({
            snackbar: {
              visible: false,
              type: constants.Themes.SUCCESS
            }
          })
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
          <Col className="mx-auto login">
            <Card small>
              <CardBody className="px-4">
                <h5 className="login__titulo text-center mt-5 mb-4">Recupera tu contraseña</h5>
                <Form onSubmit={e => this.restorePassword(e)} noValidate>
                  <FormGroup>
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
                    <div className="px-2">
                      <small>Recibirás un email con las instrucciones para recuperar tu contraseña.</small>
                    </div>
                  </FormGroup>
                  <Button type="submit" pill className="d-table mx-auto mb-4">Recuperar contraseña</Button>
                  <FormGroup>
                    <Alert className="mb-3" open={this.state.snackbar.visible} theme={this.state.snackbar.type}>
                      {this.state.snackbar.type === constants.Themes.SUCCESS && "Ya te enviamos las instrucciones para recuperar tu contraseña, revisa tu casilla de correo. Te redireccionaremos al login"}
                      {this.state.snackbar.type === constants.Themes.ERROR && "Algo salió mal al intentar enviarte las instrucciones. Inténtelo de nuevo."}
                    </Alert>
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
            <div className="px-2 pt-3 login__center_links">
              <Link to="/signin">Volver al login</Link>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(ForgotPassword);