import React, { useEffect, useState, useContext, Fragment } from 'react';
import { useParams, useLocation, Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';
import Loading from '../components/Loading';
import { getRecipeDetailsById, searchRecipesByName } from '../services/fetchRecipes';
import RecipeCard from '../components/RecipeCard';
import { RecipesContext } from '../context/RecipesContext';
import { svRecipes } from '../utils/dataDestructure';
import ShareBtn from '../components/ShareBtn';
import FavoriteBtn from '../components/FavoriteBtn';

const ingredientsList = (recipe) => (
  <div>
    <h4>Ingredients</h4>
    <ul>
      {recipe.ingredients.map((ingredient, index) => (
        <li key={ingredient.name} data-testid={`${index}-ingredient-name-and-measure`}>
          {ingredient.name} - {ingredient.quantity}
        </li>
      ))}
    </ul>
  </div>
);

const saveIngredient = (e, index, checkedIngredients, setCheckIngredients) => {
  if (e.target.checked) {
    setCheckIngredients([...checkedIngredients, index]);
  } else {
    setCheckIngredients(checkedIngredients.filter((ingredient) => ingredient !== index));
  }
};

const ingredientsListCheckbox = (recipe, checkedIngredients, setCheckIngredients) => (
  <div>
    <h4>Ingredients</h4>
    <ul>
      {recipe.ingredients.map((ingredient, index) => (
        <li
          className="list-none-style"
          key={ingredient.name}
          data-testid={`${index}-ingredient-step`}
        >
          <input
            type="checkbox"
            id={ingredient.name}
            checked={checkedIngredients.some((ingredientIndex) => ingredientIndex === index)}
            onChange={(e) => saveIngredient(e, index, checkedIngredients, setCheckIngredients)}
          />
          <label htmlFor={ingredient.name}>
            {ingredient.name} - {ingredient.quantity}
          </label>
        </li>
      ))}
    </ul>
  </div>
);

const youtubeVideo = (recipe) => {
  const opts = {
    height: '198',
    width: '324',
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
  <Fragment>
    <h4>Recomendadas</h4>
    <div className="recommended-recipes">
      {recommendedRecipes.map((recipe, index) => (
        <span key={recipe.id} className="margin10p">
          <RecipeCard recipe={recipe} index={index} type={type} page="detailPage" />
        </span>
      ))}
    </div>
  </Fragment>
);

const header = (recipes) => (
  <div>
    <div className="header-div">
      <div>
        <h3 data-testid="recipe-title" className="no-margin">
          {recipes[0].name}
        </h3>
        <span data-testid="recipe-category">
          {recipes[0].category} {recipes[0].alcoholicOrNot}
        </span>
      </div>
      <div className="float-right">
        <FavoriteBtn />
        <ShareBtn />
      </div>
    </div>
  </div>
);

const saveIngredients = (type, id, checkedIngredients) => {
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  inProgressRecipes[`${type}s`] = { ...inProgressRecipes[`${type}s`], [id]: checkedIngredients };
  localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
};

const startRecipe = (pathname, type, id) => {
  let recipeStarted = false;
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (JSON.parse(localStorage.getItem('inProgressRecipes')) && inProgressRecipes[`${type}s`][id]) {
    recipeStarted = true;
  }
  return (
    <Link
      to={`${pathname}/in-progress`}
      className="footer btn"
      data-testid="start-recipe-btn"
      onClick={() => {
        if (!recipeStarted) saveIngredients(type, id);
      }}
    >
      {recipeStarted ? 'Continuar Receita' : 'Iniciar Receita'}
    </Link>
  );
};

const redirectToDoneRecipes = (history) => {
  history.push('/receitas-feitas');
};

const finishRecipe = (history, ingredients, checkedIngredients) => (
  <button
    type="button"
    className="footer btn"
    data-testid="finish-recipe-btn"
    disabled={!(ingredients.length === checkedIngredients.length)}
    onClick={() => redirectToDoneRecipes(history)}
  >
    Finalizar Receita
  </button>
);

const thumbnail = (recipe) => (
  <img src={recipe.image} alt="recipeThumb" data-testid="recipe-photo" className="full-width" />
);

const instructions = (recipe) => (
  <div className="detailPage">
    <h4>Instructions</h4>
    <span data-testid="instructions">{recipe.instructions}</span>
  </div>
);

const RecipeDetail = ({ type, recommendedType, page, history }) => {
  const { saveRecipes, recipes } = useContext(RecipesContext);
  const [recommendedRecipes, setRecommendedRecipes] = useState([]);
  const { id } = useParams();
  const { pathname } = useLocation();
  const [checkedIngredients, setCheckIngredients] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem('inProgressRecipes')) {
      if (page === 'detail') {
        localStorage.setItem('inProgressRecipes', JSON.stringify({ cocktails: {}, meals: {} }));
      } else {
        const inProgressRecipes = { cocktails: {}, meals: {} };
        inProgressRecipes[`${type}s`][id] = [];
        localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
      }
    } else if (page === 'inProgress') {
      if (!JSON.parse(localStorage.getItem('inProgressRecipes'))[`${type}s`][id]) {
        const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'))[`${type}s`];
        inProgressRecipes[`${type}s`][id] = [];
        localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
      }
      setCheckIngredients(JSON.parse(localStorage.getItem('inProgressRecipes'))[`${type}s`][id]);
    }
  }, [page, type, id]);

  useEffect(() => {
    if (page === 'inProgress') saveIngredients(type, id, checkedIngredients);
  }, [checkedIngredients, page, type, id]);

  useEffect(() => {
    getRecipeDetailsById(id, type).then((data) => saveRecipes(data));
    searchRecipesByName('', recommendedType).then((data) =>
      setRecommendedRecipes(svRecipes(data).slice(0, 6)),
    );
  }, [id, type, recommendedType]);

  if (recipes.length === 0) return <Loading />;

  return (
    <div>
      {thumbnail(recipes[0])}
      <div className="detailPage">
        {header(recipes)}
        {page === 'detail'
          ? ingredientsList(recipes[0])
          : ingredientsListCheckbox(recipes[0], checkedIngredients, setCheckIngredients)}
        {instructions(recipes[0])}
        {page === 'detail' ? youtubeVideo(recipes[0]) : null}
        {page === 'detail' ? recommendedCarousel(recommendedRecipes, type) : null}
      </div>
      {page === 'detail'
        ? startRecipe(pathname, type, id)
        : finishRecipe(history, recipes[0].ingredients, checkedIngredients)}
    </div>
  );
};

RecipeDetail.propTypes = {
  recommendedType: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withRouter(RecipeDetail);
