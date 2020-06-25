import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Recipes from './pages/Recipes';

function App() {
  return (
    <div id="meals">
      <Router>
        <Switch>
          <Route path="/comidas" component={Recipes} />
          <Route exact path="/" component={Login} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
