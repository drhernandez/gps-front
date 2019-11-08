import React from "react";
import to from "await-to-js";
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
  Alert,
} from "shards-react";
import Spinner from 'react-bootstrap/Spinner'
import validations from "../utils/ValidationsUtil";
import constants from "../utils/Constants";
import { RecoveryService } from "../api/services";
import "../styles/resetPass.css";
var _ = require('lodash');

const errorsDefault = {
  password: {
    required: false,
    valid: false
  },
  confirmPassword: {
    required: false,
    valid: false
  },
}

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRecoveryIdValid: true,
      errors: errorsDefault,
      showSppiner: true,
      showAlert: false,
      isExecutingRequest: false
    }

    this.validateRecoveryId.bind(this);
    this.changePassword.bind(this);
    this.invalidateError.bind(this);
  };

  componentDidMount() {
    this.validateRecoveryId();
  }

  async validateRecoveryId() {
    const recoveryId = this.props.match.params.recovery_id;
    const [err] = await to(RecoveryService.validateRecoveryId(recoveryId));
    this.setState({
      isRecoveryIdValid: !err,
      showSppiner: !this.state.showSppiner
    })
  }

  async changePassword(e) {
    this.setState({
      isExecutingRequest: true
    })
    e.preventDefault()
    e.persist();
    const errors = _.clone(errorsDefault);
    errors.password.required = !validations.validateRequired(e.target.password.value);
    errors.password.valid = !validations.validatePassword(e.target.password.value, validations.passwordStrenghts.PASSWORD_STRENGHT_2);
    errors.confirmPassword.required = !validations.validateRequired(e.target.confirmPassword.value);
    errors.confirmPassword.valid = !validations.validateEquals(e.target.password.value, e.target.confirmPassword.value);

    if (Object.values(errors).find(fieldValidations => Object.values(fieldValidations).find(value => value))) {  // Si alguno de los errores está en true...
      this.setState({
        errors: errors
      })
    }
    else {
      const recoveryId = this.props.match.params.recovery_id;
      const password = e.target.password.value;
      const [err] = await to(RecoveryService.resetPassword(recoveryId, password));
      if (!err) {
        this.props.history.push("/signin");
      } else {
        this.setState({
          showAlert: true
        })
        setTimeout(() => {
          this.setState({
            showAlert: false
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

        {this.state.showSppiner &&
          <Row>
            <Spinner animation="border" variant="primary" />
          </Row>
        }

        {!this.state.showSppiner && this.state.isRecoveryIdValid &&
          <Row noGutters className="h-100">
            <Col className="mx-auto reset-pass">
              <Card small>
                <CardBody className="px-4">
                  <h5 className="reset-pass__titulo text-center mt-5 mb-4">Elige una nueva contraseña</h5>
                  <Form onSubmit={e => this.changePassword(e)} noValidate>
                    <FormGroup>
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
                      de 8 caracteres, una mayúscula y un número </FormFeedback>}
                    </FormGroup>
                    <FormGroup>
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
                    </FormGroup>
                    <FormGroup>
                      {
                        this.state.isExecutingRequest ? 
                          <Spinner animation="border" variant="primary" className="d-table mx-auto" /> :
                          <Button type="submit" pill className="d-table mx-auto">Cambiar contraseña</Button>  
                      }
                    </FormGroup>
                    <FormGroup>
                      <Alert className="mb-3" open={this.state.showAlert} theme={constants.Themes.ERROR}>
                        Ocurrió un error. Intentá de nuevo
                    </Alert>
                    </FormGroup>
                  </Form>
                </CardBody>
              </Card>
              <div className="px-2 pt-3 reset-pass__justify_links">
                <Link to="/signin">Volver al login</Link>
                <Link to="/signup">Crea una cuenta nueva</Link>
              </div>
            </Col>
          </Row>
        }
      </Container>
    );
  }
}

export default withRouter(ResetPassword);