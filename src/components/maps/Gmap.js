import React from "react";
import {
  Card, 
  CardHeader,
  CardBody,
  FormSelect,
  Form,
} from "shards-react";

const GoogleMap = (props) => (
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
        Hola
      </CardBody>
    </Card>
  </div>
);

export default GoogleMap;