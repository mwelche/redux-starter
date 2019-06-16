// app/components/Footer.js

// React
import React, { Fragment }from 'react';
import { Link } from 'react-router';

let styles = {};
if (process.env.NODE_ENV !== 'test') {
  styles = require('../../css/landing.css');
}

function getInitialState() {
  return {};
}

class Landing extends React.Component {
  constructor(props) {
    super(props);

    this.state = getInitialState();
  }

  render() {
    /* 
    This is the default landing page!
    Feel free to delete all the styling and markup in here for your own project
    */
    return (
      <Fragment>
        <div className={styles.header}>
          <h1 className={`u-alignCenter`}>
            Redux-starter
          </h1>
          <h3 className={`u-alignCenter`}>
            by Mathieu Welche
          </h3>
        </div>
        <div className={`container grid_flex_wrap ${styles.content}`}>
          <h4 className={`grid_full`}>What we've got:</h4>
          <ul className={`grid_full`}>
            <li>React 16.x</li>
            <li>React Router 3.2.0</li>
            <li>Redux 4.x</li>
            <li>express server side rendering</li>
          </ul>
        </div>
      </Fragment>
    );
  }
};

export default Landing;
