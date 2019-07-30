import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  FormInput,
  FormGroup,
  FormCheckbox,
  Form,
  Button,
} from "shards-react";

import "../styles/login.css";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      remember: false
    }

    this.toogleCheckbox.bind(this);
    this.login.bind(this);
  };

  toogleCheckbox() {
    this.setState({
      remember: !this.state.remember
    })
  }

  login(e) {
    e.preventDefault()
    e.persist();
    console.log(e.target.email.value);
    console.log(e.target.password.value);
    console.log("remember me: ", this.state.remember)
  }

  render() {
    return (
      <Container fluid className="main-content-container px-4 h-100">
        <Row noGutters className="h-100">
          <Col className="mx-auto login">
            <Card small>
              <CardBody className="px-4">
                {/* <img class="login__logo d-table mx-auto mb-3" src="../images/shards-dashboards-logo.svg" alt="Login Template" /> */}
                <h5 className="login__titulo text-center mt-5 mb-4">Ingresa a tu cuenta</h5>
                <Form onSubmit={e => this.login(e)}>
                  <FormGroup>
                    <label htmlFor="email">Email</label>
                    <FormInput id="email" type="email" placeholder="Email" />
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="password">Contraseña</label>
                    <FormInput id="password" type="password" placeholder="Contraseña" />
                  </FormGroup>
                  <FormGroup>
                    <FormCheckbox checked={this.state.remember} onChange={() => this.toogleCheckbox()}>
                      Recordarme
                    </FormCheckbox>
                  </FormGroup>
                  <Button type="submit" pill className="d-table mx-auto mb-5">Iniciar Sesión</Button>
                </Form>
              </CardBody>
            </Card>
            <div className="px-2 pt-3 login__justify_links">
              <Link to="/forgot-password">Olvidaste tu contraseña?</Link>
              <Link to="/signup">Crea una cuenta nueva</Link>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}