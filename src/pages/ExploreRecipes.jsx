import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ExploreRecipes = ({ title }) => (
  <div>
    <Header title={title} searchEnabled={false} />
    <Footer />
  </div>
);

ExploreRecipes.propTypes = {
  title: PropTypes.string.isRequired,
};

export default ExploreRecipes;
