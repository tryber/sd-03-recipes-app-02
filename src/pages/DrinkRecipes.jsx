import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer/Footer';
import Categories from '../components/Categories';

const DrinkRecipes = () => (
  <div>
    <Header title="Bebidas" type="cocktail" searchEnabled />
    <Categories type='cocktail' />
    <Footer />
  </div>
);

export default DrinkRecipes;
