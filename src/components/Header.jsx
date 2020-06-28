import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

const searchIconBtn = (searchEnabled, handleSearchIconClick) => {
  if (searchEnabled) {
    return (
      <button type="button" onClick={() => handleSearchIconClick()}>
        <img data-testid="search-top-btn" alt="icon" src={searchIcon} />
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
    <header>
      <nav className="header">
        <Link to="perfil">
          <img data-testid="profile-top-btn" alt="icon" src={profileIcon} />
        </Link>
        <h1 data-testid="page-title">{title}</h1>
        {searchIconBtn(searchEnabled, handleSearchIconClick)}
        <SearchBar searchInputEnabled={searchInputEnabled} type={type} />
      </nav>
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  searchEnabled: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
};

export default Header;
