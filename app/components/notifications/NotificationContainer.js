// TODO: this rule should be removed when this class has a state
/* eslint react/prefer-stateless-function: 0 */

// app/containers/ModalContainer.js

// React
import React from 'react';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';
// Components
import Notification from './Notification';
// Actions
import { closeNotiication } from '../../actions/notification';

let styles = {};
if (process.env.NODE_ENV !== 'test') {
  styles = require('../../css/notification.css');
}

class NotificationContainer extends React.Component {
  static contextTypes = {
    store: PropTypes.object.isRequired,
  }

  static propTypes = {
    component: PropTypes.element,
  }

  render() {
    const {
      notifications,
    } = this.props;

    if (notifications.length) {
      return (
        <div className={styles.container}>
          {/* {components} */}
          {notifications.map((notification, i) => (
            <Notification
              key={`${notification.content}-${i}`}
              {...notification}
            />
          ))}
        </div>
      );
    }
    return (
      <div />
    );
  }
}

export default connect((state) => {
  const notifications = state.notification.get('notifications');
  
  return {
    notifications,
  };
})(NotificationContainer);
