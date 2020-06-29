import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer/Footer';
import Categories from '../components/Categories';

const FoodRecipes = () => (

  <div>
    <Header title="Comidas" type="meal" searchEnabled />
    <Categories type='meal' />
    <Footer />
  </div>
);

export default FoodRecipes;
