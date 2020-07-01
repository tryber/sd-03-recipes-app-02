import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import Loading from '../components/Loading';
import { getRecipeDetailsById, searchRecipesByName } from '../services/fetchRecipes';
import RecipeCard from '../components/RecipeCard';
import { useLocation, useParams } from 'react-router-dom';

const ingredientsList = (recipe) => {
  const response = [];
  for (let index = 1; index < 16; index += 1) {
    if (recipe[`strIngredient${index}`]) {
      response.push(
        <li data-testid={`${index - 1}-ingredient-name-and-measure`}>
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
      <span data-testid="video">
        <h4>Video</h4>
        <YouTube videoId={recipe.strYoutube.split('=')[1]} opts={opts} />
      </span>
    );
  }
  return null;
};

const recommendedCarousel = (recommendedRecipes, type) => {
  if (type) {
    const invertedType = {
      Meal: 'cocktail',
      Drink: 'meal',
    };
    return (
      <div className="recommended-recipes">
        {recommendedRecipes.map((recipe, index) => (
          <span className="margin10p">
            <RecipeCard recipe={recipe} index={index} type={invertedType[type]} page="detailPage" />
          </span>
        ))}
      </div>
    );
  }
  return null;
};

// const checkFavorite = (recipe, type) => {
//   let newFavorites = [];
//   if (localStorage.getItem('favoriteRecipes')) {
//     newFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
//   }
//   if (type === 'Meal' && newFavorites.find((favoriteRecipe) => (favoriteRecipe.id === recipe.idMeal))) {

//   }
//   if (type === 'Drink' && newFavorites.find((favoriteRecipe) => (favoriteRecipe.id === recipe.idDrink))) {

//   }
// }

const favoriteBtn = (recipe, type) => {
  const { strArea: area, strCategory: category } = recipe;
  let newFavorites = [];
  if (localStorage.getItem('favoriteRecipes')) {
    newFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
  }

  const saveFavorite = () => {
    if (type === 'Meal') {
      const { idMeal: id, strMeal: name, strMealThumb: image } = recipe;
      const alcoholicOrNot = false;
      newFavorites.push({ id, type, area, category, alcoholicOrNot, name, image })
    } else {
      const { idMeal: id, strDrink: name, strDrinkThumb: image } = recipe;
      const alcoholicOrNot = true;
      newFavorites.push({ id, type, area, category, alcoholicOrNot, name, image })
    }
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites))
  }

  return (
    <button
      data-testid="favorite-btn"
      className="invisible-btn"
      onClick={() => saveFavorite()}
    >
      <img src={favoriteIcon} alt="share" />
    </button>
  );
};

const shareBtn = (shareState, setShareState, pathname) => (
  <button data-testid="share-btn" className="invisible-btn">
    <img
      src={shareIcon}
      alt="share"
      onClick={() => {
        navigator.clipboard.writeText(`http://localhost:3000${pathname}`);
        setShareState('Link copiado!');
      }}
    />
    {shareState}
  </button>
);

const RecipeDetail = () => {
  const [recipeState, setRecipeState] = useState({
    recipe: {},
    recipeIsFetching: true,
    type: '',
  });
  const [shareState, setShareState] = useState('');
  const [recommendedRecipes, setRecommendedRecipes] = useState([]);
  const [favoriteIcon, setFavoriteIcon] = useState(whiteHeartIcon);
  let { pathname } = useLocation();
  const params = useParams();

  useEffect(() => {
    const typePath = pathname.split('/')[1];
    if (typePath === 'comidas') {
      getRecipeDetailsById(params.id, 'meal').then((data) => {
        setRecipeState({
          ...recipeState,
          recipe: data.meals[0],
          recipeIsFetching: false,
          type: 'Meal',
        });
        searchRecipesByName('', 'cocktail').then((cocktails) => {
          setRecommendedRecipes(cocktails.drinks.slice(0, 6));
        });
      });
    }
    if (typePath === 'bebidas') {
      getRecipeDetailsById(params.id, 'cocktail').then((data) => {
        setRecipeState({
          ...recipeState,
          recipe: data.drinks[0],
          recipeIsFetching: false,
          type: 'Drink',
        });
        searchRecipesByName('', 'meal').then((meals) => {
          setRecommendedRecipes(meals.meals.slice(0, 6));
        });
      });
    }
  }, [pathname]);

  const { recipe, recipeIsFetching, type } = recipeState;

  if (recipeIsFetching || recommendedRecipes.length === 0) return <Loading />;

  return (
    <div className="detailPage">
      <img
        src={recipe[`str${type}Thumb`]}
        alt="recipeThumb"
        data-testid="recipe-photo"
        className="full-width"
      />
      <h3 data-testid="recipe-title">{recipe[`str${type}`]}</h3>
      {favoriteBtn(recipe, type, favoriteIcon, setFavoriteIcon)}
      {shareBtn(shareState, setShareState, pathname)}
      <span data-testid="recipe-category">{recipe.strCategory}</span>
      <h4>Ingredients</h4>
      <span>
        <ul>{ingredientsList(recipe)}</ul>
      </span>
      <h4>Instructions</h4>
      <span data-testid="instructions">{recipe.strInstructions}</span>
      {youtubeVideo(recipe)}
      <h4>Recomendadas</h4>
      {recommendedCarousel(recommendedRecipes, type)}
      <button className="footer" type="button" data-testid="start-recipe-btn">
        Iniciar Receita
      </button>
    </div>
  );
};

RecipeDetail.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default RecipeDetail;
