import React, { useState, useEffect } from 'react';

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
    type="text"
    value={email}
    className="col
  s10 offset-s1"
    data-testid="email-input"
    onChange={(e) => handleChange(e)}
    id="email"
  />
);

const passwordInput = (password, handleChange) => (
  <input
    type="text"
    value={password}
    className="col s10 offset-s1"
    data-testid="password-input"
    onChange={(e) => handleChange(e)}
    id="password"
  />
);

const submitButton = (enableButton) => (
  <button
    type="button"
    disabled={enableButton}
    className="col s10 offset-s1 waves-effect waves-light btn"
    data-testid="login-submit-btn"
  >
    Entrar
  </button>
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
      {submitButton(enableButton)}
    </div>
  );
};

export default Login;
