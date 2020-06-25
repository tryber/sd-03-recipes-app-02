import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import FoodRecipes from './pages/FoodRecipes';
import DrinkRecipes from './pages/DrinkRecipes';
import FoodRecipeDetail from './pages/FoodRecipeDetail';
import DrinkRecipeDetail from './pages/DrinkRecipeDetail';
import Profile from './pages/Profile';
import Explore from './pages/Explore';
import ExploreFoods from './pages/ExploreFoods';
import ExploreDrinks from './pages/ExploreDrinks';
import ExploreDrinksIngredients from './pages/ExploreDrinksIngredients';
import ExploreFoodsIngredients from './pages/ExploreFoodsIngredients';
import ExploreFoodsArea from './pages/ExploreFoodsArea';
import MadeRecipes from './pages/MadeRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';

function App() {
  return (
    <div id="meals">
      <Router>
        <Switch>
          <Route exact path="/comidas" component={FoodRecipes} />
          <Route exact path="/comidas/:id" component={FoodRecipeDetail} />
          <Route exact path="/comidas/:id/in-progress" component={FoodRecipeDetail} />
          <Route exact path="/bebidas" component={DrinkRecipes} />
          <Route exact path="/bebidas/:id" component={DrinkRecipeDetail} />
          <Route exact path="/bebidas/:id/in-progress" component={DrinkRecipeDetail} />
          <Route exact path="/perfil" component={Profile} />
          <Route exact path="/explorar" component={Explore} />
          <Route exact path="/explorar/comidas" component={ExploreFoods} />
          <Route exact path="/explorar/comidas/ingredientes" component={ExploreFoodsIngredients} />
          <Route exact path="/explorar/comidas/area" component={ExploreFoodsArea} />
          <Route exact path="/explorar/bebidas" component={ExploreDrinks} />
          <Route exact path="/explorar/bebidas/ingredientes" component={ExploreDrinksIngredients} />
          <Route exact path="/receitas-feitas" component={MadeRecipes} />
          <Route exact path="/receitas-favoritas" component={FavoriteRecipes} />
          <Route exact path="/" component={Login} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
