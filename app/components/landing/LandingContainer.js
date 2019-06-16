// TODO: this rule should be removed when this class has a state
/* eslint react/prefer-stateless-function: 0 */

// app/components/landing/LandingContainer.js

import React, { Fragment } from 'react';
// Redux
import { connect } from 'react-redux';
// Components
import Landing from './Landing';
import Footer from '../Footer';

class LandingContainer extends React.Component {
  render() {
    return (
      <Fragment>
        <Landing {...this.props} />
        <Footer {...this.props} />
      </Fragment>
    );
  }
}

export default connect((state) => {
  return {
    loggedInUser: state.auth.get('user'),
  };
})(LandingContainer);
