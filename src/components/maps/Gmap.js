import React from "react";
import {
  Card, 
  CardHeader,
  CardBody,
  FormSelect,
  Form,
} from "shards-react";
import { 
  withScriptjs, 
  withGoogleMap, 
  GoogleMap, 
  Marker 
} from "react-google-maps"

const Gmap = withScriptjs(withGoogleMap((props) =>
  <div>
    <Card small className="mb-4">
      <CardHeader>
        <Form className="add-new-post">
          <FormSelect id="feInputState">
            <option value="null">Elija un vehículo...</option>
            <option value="ford">Ford</option>
            <option value="toyota">Toyota</option>
          </FormSelect>
        </Form>
      </CardHeader>
      <CardBody>
        <GoogleMap
          defaultZoom={12}
          defaultCenter={{ lat: -31.422130, lng: -64.186510 }}
        >
          {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
        </GoogleMap>
      </CardBody>
    </Card>
  </div>
));

export default Gmap;