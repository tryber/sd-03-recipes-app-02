import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Explore = () => (
  <div style={{ marginTop: '70px' }}>
    <Header title="Explorar" searchEnabled={false} />
    <div className="explore">
      <Link data-testid="explore-food" to="explorar/comidas">
        <button className="btn explore-btn" type="button">Explorar Comidas</button>
      </Link>
      <Link data-testid="explore-drinks" to="explorar/bebidas">
        <button className="btn explore-btn" type="button">Explorar Bebidas</button>
      </Link>
    </div>
    <Footer />
  </div>
);

export default Explore;
