import React, { useState, useContext } from 'react';
import { searchRecipesByName, searchRecipesByMainIngredients, searchRecipesByFirstLetter } from '../services/fetchRecipes';
import { RecipesContext } from '../context/RecipesContext';

const SearchBar = ({ searchInputEnabled, type }) => {
  const [state, setState] = useState({
    searchParam: 'name',
    searchText: '',
  });

  const { setIsFetching, setRecipes } = useContext(RecipesContext);
  const { searchParam, searchText } = state;

  const searchBtn = () => {
    const searchOptions = {
      ingredients: searchRecipesByMainIngredients,
      name: searchRecipesByName,
      firstLetter: searchRecipesByFirstLetter,
    }
    searchOptions[searchParam](searchText, type).then((data) => {
      setRecipes(data);
      setIsFetching(false);
    })
  }

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  if (searchInputEnabled) {
    return (
      <div>
        <input type="text" data-testid="search-input" name="searchText" onChange={(e) => handleChange(e)} />
        <p>
          <label htmlFor="name">
            <input type="radio" id="name" name="searchParam" value="name" data-testid="name-search-radio" onClick={(e) => handleChange(e)} />
            <span>Nome</span>
          </label>
        </p>
        <p>
          <label>
            <input type="radio" id="ingredients" name="searchParam" value="ingredients" data-testid="ingredient-search-radio" onClick={(e) => handleChange(e)} />
            <span>Ingredientes</span>
          </label>
        </p>
        <p>
          <label htmlFor="firstLetter">
            <input type="radio" id="firstLetter" name="searchParam" value="firstLetter" data-testid="first-letter-search-radio" onClick={(e) => handleChange(e)} />
            <span>Primeira letra</span>
          </label>
        </p>
        <button type="button" data-testid="exec-search-btn" onClick={() => searchBtn()}>Buscar</button>
      </div>
    );
  }
  return null;
};

export default SearchBar;
