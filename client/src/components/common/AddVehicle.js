import React from "react";
import {
  Row,
  Col,
  FormInput,
  FormFeedback,
  FormGroup,
  FormSelect,
  Form,
  Alert
} from "shards-react";
import "../../styles/addVehicle.css"
import Button from "./Button"
import { VehiclesService } from "../../api/services";
import { to } from "await-to-js";
import validations from "../../utils/ValidationsUtil";
import constants from "../../utils/Constants";
import _ from "lodash"

const errorsDefault = {
  brand: {
    required: false
  },
  brandline: {
    required: false
  },
  plate: {
    required: false
  }
}

export default class AddVehicle extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      errors: errorsDefault,
      showSppiner: false,
      showAlert: false,
      userId: props.userId,
      brands: [],
      brandLines: [],
      brand: null,
      brandLine: null,
      plate: null
    }

    this.getBrands.bind(this);
    this.getModelsByBrand.bind(this);
    this.saveVehicle.bind(this);
    this.handleBrandSelection.bind(this);
    this.handleBrandLineSelection.bind(this);
    this.invalidateError.bind(this);
  }

  async componentDidMount() {
    const brands = await this.getBrands();
    this.setState({
      brands: brands
    })
  }

  async getBrands() {
    const [err, brands] = await to(VehiclesService.getBrands());
    return err ? [] : brands;
  }

  async getModelsByBrand(brandId) {
    const [err, brandLines] = await to(VehiclesService.getBrandLines(brandId));
    return err ? [] : brandLines
  }

  async saveVehicle(e) {
    e.preventDefault();
    e.persist();
    const errors = _.clone(errorsDefault);
    errors.brand.required = !validations.validateRequired(this.state.brand);
    errors.brandline.required = !validations.validateRequired(this.state.brandLine);
    errors.plate.required = !validations.validateRequired(e.target.plate.value);

    if (Object.values(errors).find(fieldValidations => Object.values(fieldValidations).find(value => value))) {  // Si alguno de los errores está en true...
      this.setState({
        errors: errors
      })
    } else {

      this.setState({
        showSppiner: true
      })
      const vehicle = {
        user_id: this.state.userId,
        brand: this.state.brand,
        brand_line: this.state.brandLine,
        plate: e.target.plate.value
      }

      const [err, result] = await to(VehiclesService.createVehicle(vehicle));
      if (err) {
        this.setState({
          showSppiner: false,
          showAlert: true
        })
      }
      else {
        this.setState({
          showSppiner: false
        })
        this.props.addVehicle(vehicle);
      }
    }
  }

  async handleBrandSelection(e) {
    e.preventDefault();
    this.invalidateError("brand");
    const brandId = e.target.value;
    const brand = this.state.brands.find(brand => brand.id == brandId);
    const brandlines = await this.getModelsByBrand(brand.id);
    this.setState({
      brand: brand.name,
      brandLines: brandlines
    });
  }

  handleBrandLineSelection(e) {
    e.preventDefault();
    this.invalidateError("brandline");
    const brandLineId = e.target.value;
    const brandLine = this.state.brandLines.find(brandLine => brandLine.id == brandLineId);
    this.setState({
      brandLine: brandLine.name
    });
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
      <Form className="w-100 main-container p-2" onSubmit={(e) => this.saveVehicle(e)} noValidate>
        <FormGroup className="m-0">
          <Row form>
            {/* Brand */}
            <Col md="4" className="form-group">
              <label htmlFor="brand">Marca</label>
              <FormSelect 
                id="brand" 
                onChange={(e) => this.handleBrandSelection(e)}
                invalid={this.state.errors.brand.required}
              >
                <option key="0"> Seleccione una opción... </option>
                {
                  this.state.brands.map((brand) => {
                    return (<option key={brand.id} value={brand.id}>{brand.name}</option>)
                  })
                }
              </FormSelect>
              <FormFeedback>Campo requerido</FormFeedback>
            </Col>
            {/* Brand Lines */}
            <Col md="4" className="form-group">
              <label htmlFor="brandline">Categoría</label>
              <FormSelect 
                id="brandline" 
                onChange={(e) => this.handleBrandLineSelection(e)}
                invalid={this.state.errors.brandline.required}
              >
                <option key="0"> Seleccione una opción... </option>
                {
                  this.state.brandLines.map((brandline) => {
                    return (<option key={brandline.id} value={brandline.id}>{brandline.name}</option>)
                  })
                }
              </FormSelect>
              <FormFeedback>Campo requerido</FormFeedback>
            </Col>
            {/* Plate */}
            <Col md="4" className="form-group">
              <label htmlFor="plate">Patente</label>
              <FormInput
                id="plate"
                placeholder="Patente"
                invalid={this.state.errors.plate.required}
                onChange={() => this.invalidateError("plate")}
              />
              <FormFeedback>Campo requerido</FormFeedback>
            </Col>
          </Row>
        </FormGroup>
        <FormGroup className="mb-0">
          <Button type="submit" theme="accent" className="d-table ml-auto" label="Guardar vehículo" showSppiner={this.state.showSppiner}></Button>
        </FormGroup>
        {
          this.state.showAlert &&
          <FormGroup className="pt-3 mb-0">
            <Alert className="my-auto w-100" theme={constants.Themes.ERROR}>
              Ocurrió un error al intentar guardar el vehículo. Intentalo de nuevo!
          </Alert>
          </FormGroup>
        }
      </Form>
    )
  }
}