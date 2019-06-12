import React from 'react';
import PropTypes from 'prop-types';

export class ErrorMessage extends React.Component {
  static propTypes = {
    error: PropTypes.node.isRequired,
  }

  render() {
    return (
      <div className='red-text'>
        {this.props.error}
      </div>
    );
  }
}
