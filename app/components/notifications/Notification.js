import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Actions
import { removeNotification } from '../../actions/notification';

let styles = {};
if (process.env.NODE_ENV !== 'test') {
  styles = require('../../css/notification.css');
}

class Notification extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired,
  }

  static propTypes = {
    content: PropTypes.string,
    timestamp: PropTypes.string,
  }

  static defaultProps = {
    content: '',
    timestamp: '',
  }

  componentDidMount() {
    this.closeTimeout = setTimeout(this.handleCloseNotification, 4000);
  }

  componentWillUnmount() {
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
    }
  }

  handleCloseNotification = () => {
    const {
      dispatch,
    } = this.context.store;
    const {
      timestamp,
    } = this.props;

    dispatch(removeNotification(timestamp));
  }

  render() {
    return (
      <div className={`u-relative u-alignCenter ${styles.wrapper}`}>
        <button
          className={`u-absolute ${styles.close}`}
          onClick={this.handleCloseNotification}
        >
          <i className="icon-close" />
        </button>
        <p className={styles.content}>{this.props.content}</p>
      </div>
    );
  }
}

export default Notification;
