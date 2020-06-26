import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Categories from '../components/Categories';

const DrinkRecipes = () => (
  <div>
    <Header title="Bebidas" searchEnabled />
    <Categories type='cocktail' />
    <Footer />
  </div>
);

export default DrinkRecipes;
