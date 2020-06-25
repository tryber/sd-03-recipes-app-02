import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const checkEmail = (email) => {
  if (email.match(/\S+@\S+\.\S+/i)) {
    return true;
  }
  return false;
};

const checkPassword = (password) => {
  if (password.length > 6) {
    return true;
  }
  return false;
};

const emailInput = (email, handleChange) => (
  <input
    type="email"
    value={email}
    className="col s10 offset-s1"
    data-testid="email-input"
    onChange={(e) => handleChange(e)}
    id="email"
  />
);

const passwordInput = (password, handleChange) => (
  <input
    type="password"
    value={password}
    className="col s10 offset-s1"
    data-testid="password-input"
    onChange={(e) => handleChange(e)}
    id="password"
  />
);

const saveTokens = () => {
  localStorage.setItem('mealsToken', 1);
  localStorage.setItem('cocktailsToken', 1);
};

const saveEmail = (email) => localStorage.setItem('user', JSON.stringify({ email }));

const submitButton = (enableButton, email) => (
  <Link to="/comidas">
    <button
      type="button"
      disabled={enableButton}
      className="col s10 offset-s1 waves-effect waves-light btn"
      data-testid="login-submit-btn"
      onClick={() => {
        saveTokens();
        saveEmail(email);
      }}
    >
      Entrar
    </button>
  </Link>
);

const Login = () => {
  const [state, setState] = useState({
    enableButton: true,
    email: '',
    password: '',
  });
  const { enableButton, email, password } = state;

  useEffect(() => {
    if (checkEmail(email) && checkPassword(password)) {
      setState({ ...state, enableButton: false });
    } else {
      setState({ ...state, enableButton: true });
    }
  }, [email, password]);

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <div className="row">
      {emailInput(email, handleChange)}
      {passwordInput(password, handleChange)}
      {submitButton(enableButton, email)}
    </div>
  );
};

export default Login;
