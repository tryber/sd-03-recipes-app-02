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

const submitButton = (disableButton, email) => (
  <Link to="/comidas">
    <button
      type="button"
      disabled={disableButton}
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
    disableButton: true,
    email: '',
    password: '',
  });
  const { disableButton, email, password } = state;

  useEffect(() => {
    if (checkEmail(email) && checkPassword(password)) {
      setState({ ...state, disableButton: false });
    } else {
      setState({ ...state, disableButton: true });
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
      {loginInput(email, handleChange, "email")}
      {loginInput(password, handleChange, "password")}
      {submitButton(disableButton, email)}
    </div>
  );
};

export default Login;
