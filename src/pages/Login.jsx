import { Link } from 'react-router-dom';
import React, { useState } from 'react';

const checkEmail = (email) => email.match(/\S+@\S+\.\S+/i);

const checkPassword = (password) => (password.length > 6);

const textInput = (state, handleChange, type, placeholder) => (
  <input
    type={type}
    value={state}
    className="login-input col s10 offset-s1"
    data-testid={`${type}-input`}
    onChange={(e) => handleChange(e)}
    id={type}
    placeholder={placeholder}
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
      className="login-btn btn col s10 offset-s1 waves-effect waves-light"
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
    <div className="login-page row">
      <h1 className="blue-text">Login</h1>
      {textInput(email, handleChange, 'email', 'Email')}
      {textInput(password, handleChange, 'password', 'Senha')}
      {submitButton(state)}
    </div>
  );
};

export default Login;
