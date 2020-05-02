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
  Alert,
} from "shards-react";
import Button from "../components/common/Button";
import { AuthService } from "../api/services";
import validations from "../utils/ValidationsUtil";
import constants from "../utils/Constants";
import store from "../redux/store";
import { setUserInfoAction } from "../redux/actions/actions";
import "../styles/login.css";
var _ = require('lodash');

const errorsDefault = {
  email: {
    required: false
  },
  password: {
    required: false
  }
}

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: errorsDefault,
      remember: false,
      showAlert: false,
      showSppiner: false
    }

    this.login = this.login.bind(this);
    this.invalidateError.bind(this);
  };

  async login(e) {
    e.preventDefault()
    e.persist();
    const errors = _.clone(errorsDefault);
    errors.email.required = !validations.validateRequired(e.target.email.value);
    errors.password.required = !validations.validateRequired(e.target.password.value);

    if (Object.values(errors).find(fieldValidations => Object.values(fieldValidations).find(value => value))) {  // Si alguno de los errores está en true...
      this.setState({
        errors: errors
      })
    } 
    else {
      this.setState({
        showSppiner: true
      });
      const email = e.target.email.value;
      const pass = e.target.password.value;
      const [err, tokenInfo] = await to(AuthService.login(email, pass));
      if (!err && tokenInfo != null) {
        await store.dispatch(setUserInfoAction(tokenInfo.user));
        this.props.history.push("/");
      } else {
        this.setState({
          showAlert: true,
          showSppiner: false
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
        <Row noGutters className="h-100">
          <Col className="mx-auto login">
            <Card small>
              <CardBody className="px-4">
                <h5 className="login__titulo text-center mt-5 mb-4">Ingresa a tu cuenta</h5>
                <Form onSubmit={this.login} noValidate>
                  <FormGroup>
                    <label htmlFor="email">Email</label>
                    <FormInput
                      type="email"
                      id="email"
                      placeholder="Dirección de correo"
                      autoComplete="email"
                      invalid={this.state.errors.email.required}
                      onChange={() => this.invalidateError("email")}
                    />
                    <FormFeedback>Campo requerido</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="password">Contraseña</label>
                    <FormInput 
                      id="password" 
                      type="password" 
                      placeholder="Contraseña"
                      invalid={this.state.errors.password.required}
                      onChange={() => this.invalidateError("password")} />
                    <FormFeedback>Campo requerido</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Button type="submit" theme="accent" className="d-table mx-auto" label="Iniciar Sesión" showSppiner={this.state.showSppiner}></Button>
                  </FormGroup>
                  <FormGroup>
                    <Alert className="mb-3" open={this.state.showAlert} theme={constants.Themes.ERROR}>
                      Los datos ingresados no son correctos. Intentá de nuevo
                    </Alert>
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
            <div className="px-2 pt-3 login__justify_links">
              <Link to="/forgot-password">Olvidaste tu contraseña?</Link>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(Login);