// app/components/LoadMore.js

// React
import React from 'react';
import PropTypes from 'prop-types';

let styles = {};
if (process.env.NODE_ENV !== 'test') {
  styles = require('../../css/load.css');
}

LoadMore.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string,
};

export default function LoadMore({
  children = '',
  className = '',
  onClick = () => {},
}) {
  return (
    <button
      className={`${styles.loadMore}${className ? ` ${className}` : ''}`}
      onClick={onClick}
    >
      Load more{children ? ` ${children}` : ''}
    </button>
  );
}
