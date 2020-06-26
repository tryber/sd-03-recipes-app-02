import { Link } from 'react-router-dom';
import React, { useState } from 'react';

const checkEmail = (email) => email.match(/\S+@\S+\.\S+/i);

const checkPassword = (password) => (password.length > 6);

const loginInput = (state, handleChange, type) => (
  <input
    type={type}
    value={state}
    className="col s10 offset-s1"
    data-testid={`${type}-input`}
    onChange={(e) => handleChange(e)}
    id={type}
  />
);

const saveTokens = () => {
  localStorage.setItem('mealsToken', 1);
  localStorage.setItem('cocktailsToken', 1);
};

const saveEmail = (email) => localStorage.setItem('user', JSON.stringify({ email }));

const submitButton = (state) => (
  <Link to="/comidas">
    <button
      type="button"
      disabled={!(checkEmail(state.email) && checkPassword(state.password))}
      className="col s10 offset-s1 waves-effect waves-light btn"
      data-testid="login-submit-btn"
      onClick={() => {
        saveTokens();
        saveEmail(state.email);
      }}
    >
      Entrar
    </button>
  </Link>
);

const Login = () => {
  const [state, setState] = useState({
    email: '',
    password: '',
  });
  const { email, password } = state;

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <div className="row">
      {loginInput(email, handleChange, 'email')}
      {loginInput(password, handleChange, 'password')}
      {submitButton(state)}
    </div>
  );
};

export default Login;
