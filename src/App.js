import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import MainRecipes from './pages/MainRecipes';
import RecipeDetail from './pages/RecipeDetail';
import Profile from './pages/Profile';
import Explore from './pages/Explore';
import ExploreRecipes from './pages/ExploreRecipes';
import ExploreByIngredients from './pages/ExploreByIngredients';
import ExploreFoodsByArea from './pages/ExploreFoodsByArea';
import MadeRecipes from './pages/MadeRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import RecipesProvider from './context/RecipesContext';
import NotFound from './pages/NotFound';

const foodRoutes = () => (
  <Switch>
    <Route
      exact
      path="/comidas"
      render={(props) => <MainRecipes {...props} type="meal" title="Comidas" />}
    />
    <Route
      exact
      path="/comidas/:id"
      render={(props) => (
        <RecipeDetail {...props} type="meal" recommendedType="cocktail" page="detail" />
      )}
    />
    <Route
      exact
      path="/comidas/:id/in-progress"
      render={(props) => (
        <RecipeDetail {...props} type="meal" recommendedType="cocktail" page="inProgress" />
      )}
    />
  </Switch>
);

const drinkRoutes = () => (
  <Switch>
    <Route
      exact
      path="/bebidas"
      render={(props) => <MainRecipes {...props} type="cocktail" title="Bebidas" />}
    />
    <Route
      exact
      path="/bebidas/:id"
      render={(props) => (
        <RecipeDetail {...props} type="cocktail" recommendedType="meal" page="detail" />
      )}
    />
    <Route
      exact
      path="/bebidas/:id/in-progress"
      render={(props) => (
        <RecipeDetail {...props} type="cocktail" recommendedType="meal" page="inProgress" />
      )}
    />
  </Switch>
);

const exploreRoutes = () => (
  <Switch>
    <Route exact path="/explorar" component={Explore} />
    <Route
      exact
      path="/explorar/comidas"
      render={(props) =>
        <ExploreRecipes {...props} title="Explorar Comidas" url="comidas" type="meal" />}
    />
    <Route
      exact path="/explorar/comidas/ingredientes"
      render={(props) => <ExploreByIngredients {...props} type="meal" url="comidas" />}
    />
    <Route exact path="/explorar/comidas/area" component={ExploreFoodsByArea} />
    <Route
      exact
      path="/explorar/bebidas"
      render={(props) => <ExploreRecipes
        {...props} title="Explorar Bebidas" url="bebidas" type="cocktail"
      />}
    />
    <Route
      exact path="/explorar/bebidas/ingredientes"
      render={(props) => <ExploreByIngredients {...props} type="cocktail" url="bebidas" />}
    />
  </Switch>
);

const App = () => (
  <RecipesProvider>
    <Router>
      {foodRoutes()}
      {drinkRoutes()}
      {exploreRoutes()}
      <Switch>
        <Route exact path="/perfil" component={Profile} />
        <Route exact path="/receitas-feitas" component={MadeRecipes} />
        <Route exact path="/receitas-favoritas" component={FavoriteRecipes} />
        <Route exact path="/" component={Login} />
        <Route exact path="/explorar/bebidas/area" component={NotFound} />
      </Switch>
    </Router>
  </RecipesProvider>
);

export default App;
