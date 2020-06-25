import React from 'react';
// import { searchMealsByName }

const SearchBar = ({ searchInputEnabled }) => {
  if (searchInputEnabled) {
    return (
      <div>
        <input type="text" data-testid="search-input" />
        <p>
          <label>
            <input type="radio" id="ingredients" name="filters" value="ingredients" data-testid="ingredient-search-radio" />
            <span>Ingredientes</span>
          </label>
        </p>
        <p>
          <label htmlFor="name">
            <input type="radio" id="name" name="filters" value="name" data-testid="name-search-radio" />
            <span>Nome</span>
          </label>
        </p>
        <p>
          <label htmlFor="firstLetter">
            <input type="radio" id="firstLetter" name="filters" value="firstLetter" data-testid="first-letter-search-radio" />
            <span>Primeira letra</span>
          </label>
        </p>
        <button type="button" data-testid="exec-search-btn">Buscar</button>
      </div>
    );
  }
  return null;
};

export default SearchBar;
