import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
  searchRecipesByName,
  searchRecipesByMainIngredients,
  searchRecipesByFirstLetter,
} from '../services/fetchRecipes';
import { RecipesContext } from '../context/RecipesContext';

const SearchBar = ({ searchInputEnabled, type, history }) => {
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
    };

    if (searchParam === 'firstLetter' && searchText.length !== 1) {
      alert('Sua busca deve conter somente 1 (um) caracter');
    } else {
      searchOptions[searchParam](searchText, type).then((data) => {
        setRecipes(data);
        setIsFetching(false);
        if (data.meals) {
          if (data.meals.length === 1) history.push(`/comidas/${data.meals[0].idMeal}`);
          if (data.meals.length === 0) alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
        }
        if (data.drinks && data.drinks.length === 1) {
          if (data.drinks.length === 1) history.push(`/bebidas/${data.drinks[0].idDrink}`);
          if (data.drinks.length === 0) alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
        }
      });
    }
  };

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  if (searchInputEnabled) {
    return (
      <div>
        <input
          type="text"
          data-testid="search-input"
          name="searchText"
          onChange={(e) => handleChange(e)}
        />
        <p>
          <label htmlFor="name">
            <input
              type="radio"
              id="name"
              name="searchParam"
              value="name"
              data-testid="name-search-radio"
              onClick={(e) => handleChange(e)}
            />
            <span>Nome</span>
          </label>
        </p>
        <p>
          <label htmlFor="ingredients">
            <input
              type="radio"
              id="ingredients"
              name="searchParam"
              value="ingredients"
              data-testid="ingredient-search-radio"
              onClick={(e) => handleChange(e)}
            />
            <span>Ingredientes</span>
          </label>
        </p>
        <p>
          <label htmlFor="firstLetter">
            <input
              type="radio"
              id="firstLetter"
              name="searchParam"
              value="firstLetter"
              data-testid="first-letter-search-radio"
              onClick={(e) => handleChange(e)}
            />
            <span>Primeira letra</span>
          </label>
        </p>
        <button type="button" data-testid="exec-search-btn" onClick={() => searchBtn()}>
          Buscar
        </button>
      </div>
    );
  }
  return null;
};

SearchBar.propTypes = {
  searchInputEnabled: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withRouter(SearchBar);
