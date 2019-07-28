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

    this.restorePassword.bind(this);
  };

  restorePassword(e) {
    e.preventDefault()
    e.persist();
    console.log(e.target.email.value);
  }

  render() {
    return (
      <Container fluid className="main-content-container px-4 h-100">
        <Row noGutters className="h-100">
          <Col className="mx-auto login">
            <Card small>
              <CardBody className="px-4">
                {/* <img class="login__logo d-table mx-auto mb-3" src="../images/shards-dashboards-logo.svg" alt="Login Template" /> */}
                <h5 className="login__titulo text-center mt-5 mb-4">Recupera tu contraseña</h5>
                <Form onSubmit={e => this.restorePassword(e)}>
                  <FormGroup>
                    <label htmlFor="email">Email</label>
                    <FormInput id="email" type="email" placeholder="Email" />
                    <div className="px-2">
                      <small>Recibirás un email con las instrucciones para recuperar tu contraseña.</small>
                    </div>
                  </FormGroup>
                  <Button type="submit" pill className="d-table mx-auto mb-4">Recuperar contraseña</Button>
                </Form>
              </CardBody>
            </Card>
            <div className="px-2 pt-3 login__center_links">
              <Link to="/login">Volver al login</Link>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}