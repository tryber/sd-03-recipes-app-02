import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

const searchInput = (searchInputEnabled) => {
  if (searchInputEnabled) {
    return <input type="text" data-testid="search-input" />;
  }
  return null;
};

const searchButton = (searchEnabled, handleSearchIconClick) => {
  if (searchEnabled) {
    return (
      <button type="button" onClick={() => handleSearchIconClick()}>
        <img data-testid="search-top-btn" alt="icon" src={searchIcon} />
      </button>
    );
  }
  return null;
};

const Header = ({ title, searchEnabled }) => {
  const [state, setState] = useState({ searchInputEnabled: false });
  const { searchInputEnabled } = state;
  const handleSearchIconClick = () => {
    setState({ searchInputEnabled: !state.searchInputEnabled });
  };
  return (
    <header>
      <nav>
        <Link to="perfil">
          <img data-testid="profile-top-btn" alt="icon" src={profileIcon} />
        </Link>
        <h1 data-testid="page-title">{title}</h1>
        {searchButton(searchEnabled, handleSearchIconClick)}
        {searchInput(searchInputEnabled)}
      </nav>
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  searchEnabled: PropTypes.string.isRequired,
};

export default Header;
