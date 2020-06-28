import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ExploreRecipes = ({title}) => (
  <div>
    <Header title={title} searchEnabled={false} />
    <Footer />
  </div>
);

export default ExploreRecipes;
