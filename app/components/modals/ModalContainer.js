// TODO: this rule should be removed when this class has a state
/* eslint react/prefer-stateless-function: 0 */

// app/components/modals/ModalContainer.js

// React
import React from 'react';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';
// Actions
import { closeModal } from '../../actions/modal';

let styles = {};
if (process.env.NODE_ENV !== 'test') {
  styles = require('../../css/modal.css');
}

class ModalContainer extends React.Component {
  static contextTypes = {
    store: PropTypes.object.isRequired,
  }

  static propTypes = {
    component: PropTypes.element,
    isActive: PropTypes.bool.isRequired,
    rootClose: PropTypes.bool.isRequired,
  }

  handleOutsideClick = (e) => {
    if (e.target === this.refs.overlay && this.props.rootClose) {
      this.context.store.dispatch(closeModal());
    }
  }

  render() {
    const {
      isActive,
      component,
    } = this.props;

    console.log('modal container render', this.props);

    if (isActive) {
      return (
        <div className={styles.overlay} onClick={this.handleOutsideClick} ref="overlay">
          {component}
        </div>
      );
    }
    return (
      <div />
    );
  }
}

export default connect((state) => {
  return {
    component: state.modal.get('component'),
    isActive: state.modal.get('isActive'),
    rootClose: state.modal.get('rootClose'),
  };
})(ModalContainer);
