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

import "../styles/register.css";

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    
    this.createAccount.bind(this);
  };

  createAccount(e) {
    e.preventDefault()
    e.persist();
    console.log(e.target.name.value);
    console.log(e.target.lastname.value);
    console.log(e.target.email.value);
    console.log(e.target.tel.value);
    console.log(e.target.password.value);
    console.log(e.target.repeatPassword.value);
    console.log(e.target.address.value);
    console.log(e.target.zipcode.value);
  }

  render() {
    return (
      <Container fluid className="main-content-container px-4 h-100">
        <Row noGutters className="h-100">
          <Col className="mx-auto register">
            <Card small>
              <CardBody className="px-4">
                <h5 className="register__titulo text-center mt-5 mb-4">Crea una cuenta nueva</h5>
                {/* <Form onSubmit={(e) => this.createAccount(e)} noValidate> */}
                <Form onSubmit={(e) => this.createAccount(e)}>
                  <Row form>
                    {/* Nombre */}
                    <Col md="6" className="form-group">
                      <label htmlFor="name">Nombre</label>
                      <FormInput
                        id="name"
                        placeholder="Nombre"
                        required
                        // invalid={this.state.hasError.name}
                        // onChange={() => { }}
                      />
                      <FormFeedback>Campo requerido</FormFeedback>
                    </Col>
                    {/* Apellido */}
                    <Col md="6" className="form-group">
                      <label htmlFor="lastname">Apellido</label>
                      <FormInput
                        id="lastname"
                        placeholder="Apellido"
                        required
                        // onChange={() => { }}
                      />
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
                        required
                        // onChange={() => { }}
                        autoComplete="email"
                      />
                    </Col>
                    {/* Teléfono */}
                    <Col md="5" className="form-group">
                      <label htmlFor="tel">Teléfono</label>
                      <FormInput
                        type="tel"
                        id="tel"
                        placeholder="Teléfono"
                        required
                        // onChange={() => { }}
                      />
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
                        required
                        // onChange={() => { }}
                        autoComplete="current-password"
                      />
                    </Col>
                    {/* Repetir contraseña */}
                    <Col md="6" className="form-group">
                      <label htmlFor="repeatPassword">Repetir contraseña</label>
                      <FormInput
                        type="password"
                        id="repeatPassword"
                        placeholder="Repetir contraseña"
                        required
                        // onChange={() => { }}
                        // autoComplete="current-password"
                      />
                    </Col>
                  </Row>
                  <Row form>
                    {/* Dirección */}
                    <Col md="9" className="form-group">
                      <label htmlFor="address">Dirección</label>
                      <FormInput
                        id="address"
                        placeholder="Dirección"
                        required
                        // onChange={() => { }}
                      />
                    </Col>
                    {/* Zip Code */}
                    <Col md="3" className="form-group">
                      <label htmlFor="zipcode">CP</label>
                      <FormInput
                        type="number"
                        id="zipcode"
                        placeholder="CP"
                        required
                        // onChange={() => { }}
                      />
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
}