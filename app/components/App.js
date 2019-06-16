// TODO The below rule should be removed once this is fleshed out some
/* eslint react/prefer-stateless-function: 0 */

// app/containers/App.js

/* This is the root of the React app
 * Base/global level components may be initialized here,
 * as well as any startup or page change related tasks
 */

// React
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
// Redux
import { connect } from 'react-redux';
// Containers
import Modal from './modals/ModalContainer';
import Notification from './notifications/NotificationContainer';
// Utils
import Storage from '../utils/Storage';
import Tracking from '../utils/Tracking';
// Config
import headers from '../../config/headers';


let styles = {};
if (process.env.NODE_ENV !== 'test') {
  styles = require('../css/app.css');
}

if (process.env.BROWSER) {
  Tracking.init();
}

function trackPageView(l) {
  const url = l.pathname + l.search;
  // console.log('PAGE VIEW', url);
  Tracking.pageview(url);
}

function getInitialState() {
  return {
    showCookiePolicy: false,
  };
}

class App extends React.Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
  }

  static childContextTypes = {
    loggedInUser: PropTypes.object,
  }

  static propTypes = {
    children: PropTypes.node.isRequired,
    isTransitioning: PropTypes.bool,
    location: PropTypes.object.isRequired,
    loggedInUser: PropTypes.object,
  }

  static defaultProps = {
    isTransitioning: false,
    loggedInUser: null,
  }

  constructor(props) {
    super(props);
    this.state = getInitialState(props);
  }

  componentDidMount() {
    this.initServices();

    if (!Storage.get('accepted_cookies', { path: '/' })) {
      this.setState({
        showCookiePolicy: true,
      });
    }
  }

  componentDidUpdate(prevProps) {
    const { location: prevLocation = {} } = prevProps;
    const {
      location = {},
    } = this.props;


    // track page view
    if (prevLocation.pathname !== location.pathname) {
      trackPageView(location);
    }
  }

  /* Init services
   * - Initialize any third party services that you want to occur on load
   */
  initServices() {
    const {
      location = {},
      loggedInUser,
    } = this.props;

    trackPageView(location);
  }

  getChildContext() {
    return {
      loggedInUser: this.props.loggedInUser,
    };
  }

  render() {
    const {
      children,
      isTransitioning,
      ...props
    } = this.props;

    return (
      <Fragment>
        <Helmet {...headers} />
        <div className={styles.app}>
          { isTransitioning
            ? <h2>Loading...</h2>
            : children
          }
        </div>
        <Modal />
        <Notification />
      </Fragment>
    );
  }
}

export default connect((state) => {
  return {
    loggedInUser: state.auth.get('user'),
  };
})(App);
