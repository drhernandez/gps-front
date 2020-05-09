import React from "react";
import { Button as ShardsButton } from "shards-react";
import Spinner from 'react-bootstrap/Spinner'

export default class Button extends React.Component {

  render() {
    return (
        
        <ShardsButton 
          type={this.props.type || "button"} 
          theme={this.props.theme || "accent"} 
          block={this.props.block} 
          className={this.props.className}
          form={this.props.form}
          outline={this.props.outline}
          size={this.props.size}
          onClick={this.props.onClick}
        >
          {this.props.showSppiner ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/> : this.props.label}
        </ShardsButton>      
    )
  }
}