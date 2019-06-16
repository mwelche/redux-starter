// app/components/Collection.js
import React from 'react';
// Third party
import { isImmutable } from 'immutable';

const getMinimumResults = (results, minimum) => {
  if (!results) {
    results = [];
  } else {
    results = isImmutable(results)
      ? data.toJS()
      : [...data];
  }

  let i = results.length;
  if (minimum > 0 && i < minimum) {
    for (i; i < minimum; i++) {
      results.push({});
    }
  }

  return results;
}

const Collection = (props) => {
  const {
    className = '',
    children = () => {},
    data = [],
    isLoaded = false,
    isLoading = false,
    minimum = 0,
    style = {},
  } = props;

  const results = getMinimumResults(data, minimum);

  return (
    <ul
      className={`${className}${isLoading ? ' loading' : ''}`}
      style={style}
    >
      {results.map((renderProps, i) => children(renderProps, i))}
      {/*
      isLoaded && (data.length === 0 || data.size === 0) &&
        <div>No results</div>
      */}
    </ul>
  );
};

export default Collection;
