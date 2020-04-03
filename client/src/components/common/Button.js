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

// export default class Button extends React.Component {

//   render() {
//     return (
//       this.props.showSppiner ?
//         <Spinner className={this.props.sppinerClassName || "d-table my-auto mx-auto"} animation="border" variant="primary" style={{ verticalAlign: "inherit" }} />
//         :
//         <ShardsButton
//           type={this.props.type || "button"}
//           theme={this.props.theme || "accent"}
//           className={this.props.className}
//           form={this.props.form}
//           outline={this.props.outline}
//           size={this.props.size}
//           onClick={this.props.onClick}
//         >
//           {this.props.label}
//         </ShardsButton>
//     )
//   }
// }