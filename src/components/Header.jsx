import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

const searchIconBtn = (searchEnabled, handleSearchIconClick) => {
  if (searchEnabled) {
    return (
      <button type="button" className="invisible-btn" onClick={() => handleSearchIconClick()}>
        <img data-testid="search-top-btn" alt="icon" src={searchIcon} className="yellow-text" />
      </button>
    );
  }
  return null;
};

const Header = ({ title, searchEnabled, type }) => {
  const [state, setState] = useState({ searchInputEnabled: false });
  const { searchInputEnabled } = state;
  const handleSearchIconClick = () => {
    setState({ searchInputEnabled: !state.searchInputEnabled });
  };
  return (
    <div>
      <header className="header ruby-bg yellow-text">
        <Link to="perfil">
          <img data-testid="profile-top-btn" alt="icon" src={profileIcon} className="yellow-text" />
        </Link>
        <h1 data-testid="page-title">{title}</h1>
        {searchIconBtn(searchEnabled, handleSearchIconClick)}
      </header>
      <SearchBar searchInputEnabled={searchInputEnabled} type={type} />
    </div>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  searchEnabled: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
};

export default Header;
