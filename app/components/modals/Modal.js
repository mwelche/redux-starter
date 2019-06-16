// app/components/modals/Modal.js

// React
import React from 'react';
import PropTypes from 'prop-types';

// Actions
import { closeModal } from '../../actions/modal';

export default class Modal extends React.Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
  }

  close = () => {
    this.context.store.dispatch(closeModal());
  }
}
