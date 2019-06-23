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
  constructor(props) {
    super(props);
    this.state = {
      vehicles: [],
      trackings: [],
    }
  };

  loadDevices() {
    const usersService = new UsersService();
    usersService.getVehiclesByUserID(10).then((response) => {
      console.log('Response: ', response)
      this.setState({ vehicles: response.data });
    }).catch(console.error);
  }

  handleFormSelectOnChange(event) {
    event.persist();
    console.log(event.target.value);
  }

  componentWillMount() {
    this.loadDevices();
  }

  render() {
    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle title="Where is my f**king car?!" subtitle="Dashboard" className="text-sm-left mb-3 col-sm-12" />
        </Row>

        <Row>
          <Col>
            <Card small className="mb-4">
              <CardHeader>
                <Form className="add-new-post">
                  <FormSelect id="feInputState" defaultValue="default" onChange={this.handleFormSelectOnChange}>
                    <option value="default" disabled>Elija un vehículo...</option>
                    {this.state.vehicles.map((vehicle, idx) => (
                      <option key={vehicle.device_id} value={vehicle.id}>{`${vehicle.type} - ${vehicle.plate}`}</option>
                    ))}
                  </FormSelect>
                </Form>
              </CardHeader>
              <CardBody>
                <Gmap
                  isMarkerShown={false}
                  googleMapURL="http://maps.google.com/maps/api/js?key=YOUR_API_KEY"
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