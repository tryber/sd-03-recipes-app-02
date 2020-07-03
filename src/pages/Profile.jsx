import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const email = JSON.parse(localStorage.getItem('user')).email;

const Profile = () => (
  <div>
    <Header title="Perfil" searchEnabled={false} />
    <h2 data-testid="profile-email" style={{marginTop: '70px'}}>{email}</h2>
    <Link data-testid="profile-done-btn" to="receitas-feitas">
      <button type="button">Receitas Feitas</button>
    </Link>
    <Link data-testid="profile-favorite-btn" to="receitas-favoritas">
      <button type="button">Receitas Favoritas</button>
    </Link>
    <Link data-testid="profile-logout-btn" to="/">
      <button type="button" onClick={() => localStorage.clear()}>Sair</button>
    </Link>
    <Footer />
  </div>
);

export default Profile;
