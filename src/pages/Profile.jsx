import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../App.css';


const Profile = () => {
  let email = '';
  if (localStorage.getItem('user')) email = JSON.parse(localStorage.getItem('user')).email;
  return (
    <div className="flex">
      <Header title="Perfil" searchEnabled={false} />
      <div className="profile-container">
        <h2 className="blue-text" data-testid="profile-email" style={{ marginTop: '70px' }}>
          {email}
        </h2>
        <div className="buttons-container">
          <Link data-testid="profile-done-btn" to="receitas-feitas">
            <button className="btn profile-btn" type="button">Receitas Feitas</button>
          </Link>
          <Link data-testid="profile-favorite-btn" to="receitas-favoritas">
            <button className="btn profile-btn" type="button">Receitas Favoritas</button>
          </Link>
          <Link data-testid="profile-logout-btn" to="/">
            <button className="btn profile-btn" type="button" onClick={() => localStorage.clear()}>
              Sair
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
