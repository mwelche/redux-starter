// app/components/Footer.js

// React
import React from 'react';
import { Link } from 'react-router';
// Routes
import RouteConstants from '../constants/Routes';

const {
  ABOUT_ROUTE,
  CONTACT_ROUTE,
} = RouteConstants;

let styles = {};
if (process.env.NODE_ENV !== 'test') {
  styles = require('../css/footer.css');
}

const Footer = () => {
  const openNewTab = url => (e) => {
    e.preventDefault();
    window.open(url);
  };

  return (
    <footer className={styles.main}>
      <section className={`container ${styles.container}`}>
        <ul className={styles.row}>
          {/* Site Links */}
          <li className={styles.item}>
            <Link
              className={`u-inlineBlock ${styles.link}`}
              to={ABOUT_ROUTE}
            >
              About
            </Link>
          </li>
          <li className={styles.item}>
            <Link
              className={`u-inlineBlock ${styles.link}`}
              onClick={openNewTab(CONTACT_ROUTE)}
              target="_blank"
              to={CONTACT_ROUTE}
            >
              Contact
            </Link>
          </li>
        </ul>
        <ul className={styles.row}>
          {/* Site Links */}
          <li className={styles.item}>
            <Link
              className={`u-inlineBlock ${styles.link}`}
              target="_blank"
              to="http://facebook.com/example"
            >
              Facebook
            </Link>
          </li>
          <li className={styles.item}>
            <Link
              className={`u-inlineBlock ${styles.link}`}
              target="_blank"
              to="http://instagram.com/example"
            >
              Instagram
            </Link>
          </li>
          <li className={styles.item}>
            <Link
              className={`u-inlineBlock ${styles.link}`}
              target="_blank"
              to="http://youtube.com/example"
            >
              Youtube
            </Link>
          </li>
          <li className={styles.item}>
            <Link
              className={`u-inlineBlock ${styles.link}`}
              target="_blank"
              to="http://twitter.com/example"
            >
              Twitter
            </Link>
          </li>
        </ul>
        <div className="grid_full">
          <i className={styles.logo} />
        </div>
        <div className={styles.copy}>
          &copy; 2018 EXAMPLE INC.
        </div>
      </section>
    </footer>
  );
};

export default Footer;
