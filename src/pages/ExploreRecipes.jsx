import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getRandomRecipe } from '../services/fetchRecipes';

const ExploreRecipes = ({ title, url, type, history }) => {
  const handleClick = () => {
    let idType = 'idDrink';
    if (type === 'meal') idType = 'idMeal';
    getRandomRecipe(type).then((data) =>
      history.push(`/${url}/${(data.drinks || data.meals)[0][idType]}`),
    );
  };
  return (
    <div style={{ marginTop: '70px' }}>
      <Header title={title} searchEnabled={false} />
      <div className="explore">
        <Link to={`/explorar/${url}/ingredientes`} data-testid="explore-by-ingredient">
          <button className="btn explore-btn" type="button">
            Por Ingredientes
          </button>
        </Link>
        {type === 'meal' ? (
          <Link to={'/explorar/comidas/area'} data-testid="explore-by-area">
            <button type="button" className="btn explore-btn">
              Por Local de Origem
            </button>
          </Link>
        ) : null}
        <button
          className="btn explore-btn"
          type="button"
          data-testid="explore-surprise"
          onClick={handleClick}
        >
          Me Surpreenda!
        </button>
      </div>
      <Footer />
    </div>
  );
};

ExploreRecipes.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withRouter(ExploreRecipes);
