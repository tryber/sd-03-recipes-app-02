import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import Loading from '../components/Loading';
import { getRecipeDetailsById, searchRecipesByName } from '../services/fetchRecipes';
import RecipeCard from '../components/RecipeCard';

const ingredientsList = (recipe) => {
  const response = [];
  for (let index = 1; index < 16; index += 1) {
    if (recipe[`strIngredient${index}`]) {
      response.push(
        <li data-testid={`${index}-ingredient-name-and-measure`}>
          - {recipe[`strIngredient${index}`]} - {recipe[`strMeasure${index}`]}
        </li>,
      );
    } else {
      break;
    }
  }
  return response;
};

const youtubeVideo = (recipe) => {
  const opts = {
    height: '219',
    width: '360',
    playerVars: {
      autoplay: 1,
    },
  };
  if (recipe.strYoutube) {
    return (
      <span>
        <h4>Video</h4>
        <YouTube videoId={recipe.strYoutube.split('=')[1]} opts={opts} data-testid="video" />
      </span>
    );
  }
  return null;
};

const recommendedCarousel = (recipes, type) => {
  if (type) {
    return (
      <div>
        <RecipeCard recipe={recipes[0]} index={0} type={type} page="mainPage" />
      </div>
    );
  }
  return null;
};

const RecipeDetail = ({ match: { params, path } }) => {
  const [recipeState, setRecipeState] = useState({
    recipe: {},
    recipeIsFetching: true,
    type: '',
  });
  const [recommendedRecipes, setRecommendedRecipes] = useState([]);

  useEffect(() => {
    const type = path.split('/')[1];
    getRecipeDetailsById(params.id, 'meal').then((data) => {
      if (data.meals) {
        setRecipeState({
          ...recipeState,
          recipe: data.meals[0],
          recipeIsFetching: false,
          type: 'Meal',
        });
        searchRecipesByName('', 'cocktail').then((data) => {
          setRecommendedRecipes(data.drinks.slice(0, 6));
        });
      }
    });
    getRecipeDetailsById(params.id, 'cocktail').then((data) => {
      if (data.drinks) {
        setRecipeState({
          ...recipeState,
          recipe: data.drinks[0],
          recipeIsFetching: false,
          type: 'Drink',
        });
      }
    });
  }, []);

  const { recipe, recipeIsFetching, type } = recipeState;

  if (recipeIsFetching) return <Loading />;

  return (
    <div className="detailPage">
      <img
        src={recipe[`str${type}Thumb`]}
        alt="recipeThumb"
        data-testid="recipe-photo"
        className="full-width"
      />
      <h3 data-testid="recipe-title">{recipe[`str${type}`]}</h3>
      <img src={whiteHeartIcon} alt="share" data-testid="share-btn" />
      <img src={shareIcon} alt="love" data-testid="favorite-btn" />
      <span data-testid="recipe-category">{recipe.strCategory}</span>
      <h4>Ingredients</h4>
      <span>
        <ul>{ingredientsList(recipe)}</ul>
      </span>
      <h4>Instructions</h4>
      <span data-testid="instructions">{recipe.strInstructions}</span>
      {youtubeVideo(recipe)}
      <h4>Recomendadas</h4>
    </div>
  );
};

RecipeDetail.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default RecipeDetail;
