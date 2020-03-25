import React from "react";
import {
  Form,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormInput
} from "shards-react";
import "../../../styles/search.css";

export default (props) => (
  <Form onSubmit={props.searchFunction} className="main-navbar__search w-100 d-none d-md-flex d-lg-flex">
    <InputGroup seamless>
      <InputGroupAddon type="prepend">
        <InputGroupText>
          <i className="material-icons">search</i>
        </InputGroupText>
      </InputGroupAddon>
      <FormInput
        id="search-input"
        disabled={props.disabled}
        className="navbar-search search_box"
        placeholder={props.placeholder}
      />
    </InputGroup>
  </Form>
);
