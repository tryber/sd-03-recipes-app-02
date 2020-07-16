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
  <div className="light-box">
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
  <div className="light-box">
    <h4>Ingredients</h4>
    <ul>
      {recipe.ingredients.map((ingredient, index) => {
        const isChecked = checkedIngredients.includes(index);
        return (
          <li
            className="list-none-style"
            key={ingredient.name}
            data-testid={`${index}-ingredient-step`}
          >
            <input
              type="checkbox"
              id={`${ingredient.name} - ${index}`}
              checked={isChecked}
              onChange={(e) => saveIngredient(e, index, checkedIngredients, setCheckIngredients)}
            />
            <label
              htmlFor={`${ingredient.name} - ${index}`}
              className={isChecked ? 'line-through' : ''}
            >
              {ingredient.name} - {ingredient.quantity}
            </label>
          </li>
        );
      })}
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
      <div data-testid="video" className="light-box">
        <h4>Video</h4>
        <YouTube videoId={recipe.youtube.split('=')[1]} opts={opts} />
      </div>
    );
  }

  return null;
};

const recommendedCarousel = (recommendedRecipes) => (
  <Fragment>
    <h4>Recomendadas</h4>
    <div className="recommended-recipes">
      {recommendedRecipes.map((recipe, index) => (
        <span key={recipe.id} className="margin10p">
          <RecipeCard recipe={recipe} index={index} page="detailPage" />
        </span>
      ))}
    </div>
  </Fragment>
);

const header = (recipe) => (
  <div>
    <div className="header-div">
      <div>
        <h3 data-testid="recipe-title" className="no-margin">
          {recipe.name}
        </h3>
        <span data-testid="recipe-category">
          {recipe.category} {recipe.alcoholicOrNot}
        </span>
      </div>
      <div className="float-right">
        <FavoriteBtn dataTestId="favorite-btn" recipe={recipe} />
        <ShareBtn
          dataTestId="share-btn"
          id={recipe.id}
          type={recipe.type === 'Meal' ? 'comida' : 'bebida'}
        />
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
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  if (doneRecipes.some((doneRecipe) => doneRecipe.id === id)) return null;
  let recipeStarted = false;
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (JSON.parse(localStorage.getItem('inProgressRecipes')) && inProgressRecipes[`${type}s`][id]) {
    recipeStarted = true;
  }
  return (
    <Link
      to={`${pathname}/in-progress`}
      className="footer btn detail-footer-btn" data-testid="start-recipe-btn"
    >
      {recipeStarted ? 'Continuar Receita' : 'Iniciar Receita'}
    </Link>
  );
};

const redirectToDoneRecipes = (history) => {
  history.push('/receitas-feitas');
};

const saveDoneRecipe = (recipe) => {
  const { id, type, area, category, alcoholicOrNot, name, image, tags } = recipe;
  const newDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  const typeObj = {
    Drink: 'bebida',
    Meal: 'comida',
  };
  newDoneRecipes.push({
    id,
    type: typeObj[type],
    area: area || '',
    category: category || '',
    alcoholicOrNot: alcoholicOrNot || '',
    name,
    image,
    doneDate: new Date().toLocaleDateString('pt-BR'),
    tags,
  });
  localStorage.setItem('doneRecipes', JSON.stringify(newDoneRecipes));
};

const finishRecipe = (history, recipe, checkedIngredients) => {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  if (doneRecipes.some((doneRecipe) => doneRecipe.id === recipe.id)) return null;
  return (
    <button
      type="button"
      className="footer btn detail-footer-btn"
      data-testid="finish-recipe-btn"
      disabled={!(recipe.ingredients.length === checkedIngredients.length)}
      onClick={() => {
        redirectToDoneRecipes(history);
        saveDoneRecipe(recipe);
      }}
    >
      Finalizar Receita
    </button>
  );
};

const thumbnail = (recipe) => (
  <img src={recipe.image} alt="recipeThumb" data-testid="recipe-photo" className="full-width" />
);

const instructions = (recipe) => (
  <div className="detailPage light-box">
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
      localStorage.setItem('inProgressRecipes', JSON.stringify({ cocktails: {}, meals: {} }));
    }
    if (page === 'inProgress') {
      if (!JSON.parse(localStorage.getItem('inProgressRecipes'))[`${type}s`][id]) {
        const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
        inProgressRecipes[`${type}s`][id] = [];
        localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
      }
      setCheckIngredients(JSON.parse(localStorage.getItem('inProgressRecipes'))[`${type}s`][id]);
    }
  }, [page, type, id]);

  useEffect(() => {
    if (page === 'inProgress') saveIngredients(type, id, checkedIngredients);
  }, [checkedIngredients]);

  useEffect(() => {
    getRecipeDetailsById(id, type).then((data) => saveRecipes(data));
    searchRecipesByName('', recommendedType).then((data) =>
      setRecommendedRecipes(svRecipes(data).slice(0, 6)),
    );
  }, [id, type, recommendedType]);

  if (recipes.length === 0 || recipes.length > 1) return <Loading />;

  return (
    <div>
      {thumbnail(recipes[0])}
      <div className="detailPage blue-text">
        {header(recipes[0])}
        {page === 'detail'
          ? ingredientsList(recipes[0])
          : ingredientsListCheckbox(recipes[0], checkedIngredients, setCheckIngredients)}
        {instructions(recipes[0])}
        {page === 'detail' ? youtubeVideo(recipes[0]) : null}
        {page === 'detail' ? recommendedCarousel(recommendedRecipes) : null}
      </div>
      {page === 'detail'
        ? startRecipe(pathname, type, id)
        : finishRecipe(history, recipes[0], checkedIngredients)}
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
