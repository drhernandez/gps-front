import React from "react";
// import PropTypes from "prop-types";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  FormSelect,
  Form,
} from "shards-react";
import PageTitle from "./../components/common/PageTitle";
import Gmap from "./../components/maps/Gmap";
//services
import UsersService from "./../api/services/usersService";

export default class Home extends React.Component {
  // constructor(props) {
  //   super(props);
  // };

  loadDevices() {
    const usersService = new UsersService();
    usersService.getDevicesByUserID(1).then((response) => {
      this.setState({ devices: response });
    }).catch(console.error);
  }

  render() {
    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle title="Where is my car?!" subtitle="Dashboard" className="text-sm-left mb-3" />
        </Row>

        <Row>
          <Col>
            <Card small className="mb-4">
              <CardHeader>
                <Form className="add-new-post">
                  <FormSelect id="feInputState">
                    <option value="null">Elija un vehículo...</option>
                    {/* <option value="ford">Ford</option>
                <option value="toyota">Toyota</option> */}
                  </FormSelect>
                </Form>
              </CardHeader>
              <CardBody>
                <Gmap
                  isMarkerShown={false}
                  googleMapURL="http://maps.google.com/maps/api/js?key=AIzaSyDRZfEBsaT4szZPW1mS3q6xWa_no_l2unc"
                  loadingElement={<div style={{ height: `100%` }} />}
                  containerElement={<div style={{ height: '450px' }} />}
                  mapElement={<div style={{ height: `100%` }} />}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}