import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';


const Profile = () => {
  let email = '';
  if(localStorage.getItem('user')) email = JSON.parse(localStorage.getItem('user')).email;
  return (
    <div>
      <Header title="Perfil" searchEnabled={false} />
      <h2 data-testid="profile-email" style={{ marginTop: '70px' }}>{email}</h2>
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
  )
};

export default Profile;
