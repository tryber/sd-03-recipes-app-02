import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const FoodRecipes = () => (
  <div>
    <Header title="Comidas" type="meal" searchEnabled />
    <Footer />
  </div>
);

export default FoodRecipes;
