import React, { useEffect, useState, useContext } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
// import blackHeartIcon from '../images/blackHeartIcon.svg';
import Loading from '../components/Loading';
import { getRecipeDetailsById, searchRecipesByName } from '../services/fetchRecipes';
import RecipeCard from '../components/RecipeCard';
import { RecipesContext } from '../context/RecipesContext';
import { svRecipes } from '../utils/dataDestructure';

const ingredientsList = (recipe) =>
  recipe.ingredients.map((ingredient, index) => (
    <li data-testid={`${index}-ingredient-name-and-measure`}>
      {ingredient.name} - {ingredient.quantity}
    </li>
  ));

const youtubeVideo = (recipe) => {
  const opts = {
    height: '219',
    width: '360',
    playerVars: {
      autoplay: 1,
    },
  };
  if (recipe.youtube) {
    return (
      <span data-testid="video">
        <h4>Video</h4>
        <YouTube videoId={recipe.youtube.split('=')[1]} opts={opts} />
      </span>
    );
  }
  return null;
};

const recommendedCarousel = (recommendedRecipes, type) => (
  <div className="recommended-recipes">
    {recommendedRecipes.map((recipe, index) => (
      <span className="margin10p">
        <RecipeCard recipe={recipe} index={index} type={type} page="detailPage" />
      </span>
    ))}
  </div>
);

// const checkFavorite = (recipe, type) => {
//   let newFavorites = [];
//   if (localStorage.getItem('favoriteRecipes')) {
//     newFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
//   }
//   if (type === 'Meal' && newFavorites.find((favoriteRecipe) =>
// (favoriteRecipe.id === recipe.idMeal))) {

//   }
//   if (type === 'Drink' && newFavorites.find((favoriteRecipe) =>
// (favoriteRecipe.id === recipe.idDrink))) {

//   }
// }

const favoriteBtn = (recipe, type, favoriteIcon) => {
  const { strArea: area, strCategory: category } = recipe;
  let newFavorites = [];
  if (localStorage.getItem('favoriteRecipes')) {
    newFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
  }

  const saveFavorite = () => {
    if (type === 'Meal') {
      const { idMeal: id, strMeal: name, strMealThumb: image } = recipe;
      const alcoholicOrNot = false;
      newFavorites.push({ id, type, area, category, alcoholicOrNot, name, image });
    } else {
      const { idMeal: id, strDrink: name, strDrinkThumb: image } = recipe;
      const alcoholicOrNot = true;
      newFavorites.push({ id, type, area, category, alcoholicOrNot, name, image });
    }
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
  };

  return (
    <button data-testid="favorite-btn" className="invisible-btn" onClick={() => saveFavorite()}>
      <img src={favoriteIcon} alt="share" />
    </button>
  );
};

const shareBtn = (shareState, setShareState, pathname) => (
  <button
    data-testid="share-btn"
    className="invisible-btn"
    onClick={() => {
      navigator.clipboard.writeText(`http://localhost:3000${pathname}`);
      setShareState('Link copiado!');
    }}
  >
    <img src={shareIcon} alt="share" />
    {shareState}
  </button>
);

const RecipeDetail = ({ type, recommendedType }) => {
  const { saveRecipes, recipes } = useContext(RecipesContext);
  const [shareState, setShareState] = useState('');
  const [recommendedRecipes, setRecommendedRecipes] = useState([]);
  const [favoriteIcon, setFavoriteIcon] = useState(whiteHeartIcon);
  const { pathname } = useLocation();
  const { id } = useParams();

  useEffect(() => {
    getRecipeDetailsById(id, type).then((data) => saveRecipes(data));
    searchRecipesByName('', recommendedType).then((data) =>
      setRecommendedRecipes(svRecipes(data).slice(0, 6)),
    );
  }, [id]);

  if (recipes.length === 0 || recommendedRecipes.length === 0) return <Loading />;
  console.log(recommendedRecipes);
  return (
    <div className="detailPage">
      <img
        src={recipes[0].image}
        alt="recipeThumb"
        data-testid="recipe-photo"
        className="full-width"
      />
      <h3 data-testid="recipe-title">{recipes[0].name}</h3>
      {favoriteBtn(recipes[0], type, favoriteIcon, setFavoriteIcon)}
      {shareBtn(shareState, setShareState, pathname)}
      <span data-testid="recipe-category">{recipes[0].category}</span>
      <h4>Ingredients</h4>
      <span>
        <ul>{ingredientsList(recipes[0])}</ul>
      </span>
      <h4>Instructions</h4>
      <span data-testid="instructions">{recipes[0].instructions}</span>
      {youtubeVideo(recipes[0])}
      <h4>Recomendadas</h4>
      {recommendedCarousel(recommendedRecipes, type)}
      <button className="footer" type="button" data-testid="start-recipe-btn">
        Iniciar Receita
      </button>
    </div>
  );
};

RecipeDetail.propTypes = {
  recommendedType: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default RecipeDetail;
