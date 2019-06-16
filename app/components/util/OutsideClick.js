// app/components/partials/pagination.js

import React from 'react';
import PropTypes from 'prop-types';


class OutsideClick extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      handleDocClickConstruct: this._handleDocumentClick.bind(this),
    };
  }

  componentDidMount() {
    document.addEventListener('click', this.state.handleDocClickConstruct, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.state.handleDocClickConstruct);
  }

  render() {
    return (
      <div onClick={this._handleMyClick.bind(this)} className={this.props.className}>
        {this.props.children}
      </div>
    );
  }

  _handleDocumentClick(e) {
    if (this.props.onOutsideClick !== null) {
      return this.props.onOutsideClick();
    }
  }

  _handleMyClick(event) {
    // console.log('firing this event');
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
  }
}

export default OutsideClick;
