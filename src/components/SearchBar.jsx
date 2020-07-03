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
        if (data.meals || data.drinks) {
          setRecipes((data.meals || data.drinks).slice(0, 12));
          setIsFetching(false);
        } else {
          return alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
        }
        if (type === 'meal' && data.meals.length === 1) {
          history.push(`/comidas/${data.meals[0].idMeal}`);
        }
        if (type === 'cocktail' && data.drinks.length === 1) {
          history.push(`/bebidas/${data.drinks[0].idDrink}`);
        }
        return null;
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
      <div className="search-bar">
        <input
          type="text"
          data-testid="search-input"
          name="searchText"
          className="search-input"
          onChange={(e) => handleChange(e)}
        />
        <div className="blue-text">
          <label htmlFor="name">
            <input
              type="radio"
              id="name"
              name="searchParam"
              value="name"
              data-testid="name-search-radio"
              className="search-radio"
              onClick={(e) => handleChange(e)}
            />
            <span>Nome</span>
          </label>
          <label htmlFor="ingredients">
            <input
              type="radio"
              id="ingredients"
              name="searchParam"
              value="ingredients"
              data-testid="ingredient-search-radio"
              className="search-radio"
              onClick={(e) => handleChange(e)}
            />
            <span>Ingredientes</span>
          </label>
          <label htmlFor="firstLetter">
            <input
              type="radio"
              id="firstLetter"
              name="searchParam"
              value="firstLetter"
              data-testid="first-letter-search-radio"
              className="search-radio"
              onClick={(e) => handleChange(e)}
            />
            <span>Primeira letra</span>
          </label>
        </div>
        <button
          data-testid="exec-search-btn" type="button" className="search-btn btn"
          onClick={() => searchBtn()}
        >
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
