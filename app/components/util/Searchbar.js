// app/components/util/searchbar.js

import React from 'react';
import PropTypes from 'prop-types';
// Components
// import OutsideClick from '../util/OutsideClick';

let styles = {};
if (process.env.NODE_ENV !== 'test') {
  styles = require('../../css/searchbar.css');
}

function getInitialState(props) {
  const { value } = props;

  return {
    inheritedQuery: value,
    query: value,
  };
}

class Searchbar extends React.Component {
  static defaultProps = {
    className: '',
    isLoading: false,
  }

  static defaultProps = {
    className: '',
    isLoading: false,
    placeholder: 'Search',
  }

  static propTypes = {
    className: PropTypes.string,
    isLoading: PropTypes.bool,
    onClear: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.inheritedQuery !== nextProps.value) {
      return getInitialState(nextProps);
    }

    return {};
  }

  constructor(props) {
    super(props);

    this.state = getInitialState(props);
  }

  handleKeys = (e) => {
    const {
      onSearch,
    } = this.props;
    const { query } = this.state;

    if (e.charCode === 13) {
      onSearch(query);
    }
  }

  handleChange = (e) => {
    this.setState({ query: e.target.value });
  }

  handleClear = () => {
    const {
      onClear,
    } = this.props;

    this.setState({ query: '' });
    onClear();
  }

  handleSearch = () => {
    const {
      onSearch,
    } = this.props;
    const { query } = this.state;

    onSearch(query);
  }

  render() {
    const {
      className: pclassName,
      isLoading,
      placeholder,
    } = this.props;
    const {
      query,
    } = this.state;

    let className = pclassName;
    if (className) {
      className = `${className} `;
    }

    return (
      <div className={`grid_flex ${styles.container}`}>
        <div className="u-relative grid_full">
          <input
            className={`${className}${styles.input}`}
            onKeyPress={this.handleKeys}
            onChange={this.handleChange}
            placeholder={placeholder}
            type="test"
            value={query}
          />
          {isLoading
            ? (
              <div className={styles.icon}>
                <div className={`u-block loader ${styles.loader}`} />
              </div>
            )
            : query.length > 0
              ? (
                <button
                  className={styles.clearBtn}
                  onClick={this.handleClear}
                >
                  <i className="icon-close" />
                </button>
              )
              : null
          }
        </div>
        <button
          className={`u-bold btn-pink ${className}${styles.searchBtn}`}
          onClick={this.handleSearch}
        >
          <i className="icon-search" />
        </button>
      </div>
    );
  }
}

export default Searchbar;
