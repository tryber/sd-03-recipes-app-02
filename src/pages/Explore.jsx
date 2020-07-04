import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const Explore = () => (
  <div style={{ marginTop:"70px" }}>
    <Header title="Explorar" searchEnabled={false} />
    <Link data-testid="explore-food" to="explorar/comidas">
      <button type="button">Explorar Comidas</button>
    </Link>
    <Link data-testid="explore-drinks" to="explorar/bebidas">
      <button type="button">Explorar Bebidas</button>
    </Link>
    <Footer />
  </div>
);

export default Explore;
