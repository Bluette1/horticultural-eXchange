import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import GuestLogin from './GuestLogin';
import AuthService from '../services/auth.service';
import { loginSuccess, loginFail, setMessage } from '../actions/auth';

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
  return null;
};

const Login = ({ history }) => {
  const form = useRef();
  const checkBtn = useRef();

  const [guest, setGuest] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  const handleGuestLogin = (e) => {
    e.preventDefault();
    setGuest(true);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(email, password)
        .then((response) => {
          const user = response.data;

          if (response.headers.authorization) {
            user.accessToken = response.headers.authorization;
          }

          localStorage.setItem('user', JSON.stringify(user));

          dispatch(loginSuccess(user));

          history.push('/');
          window.location.reload();
        })
        .catch((error) => {
          const message = (error.response
            && error.response.data
            && error.response.data.message)
            || error.message
            || error.toString();

          dispatch(loginFail());
          dispatch(setMessage(message));
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  if (isLoggedIn) {
    return <Redirect to="/profile" />;
  }

  if (guest) {
    return <GuestLogin history={history} />;
  }

  return (
    <div className="col-md-12" data-testid="login-container">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Form onSubmit={handleLogin} ref={form}>
          <div className="form-group">
            <p>email</p>
            <Input
              type="text"
              className="form-control"
              name="email"
              value={email}
              onChange={onChangeEmail}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <p>Password</p>
            <Input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={onChangePassword}
              validations={[required]}
            />
          </div>

          <div className="form-group mt-3">
            <button
              className="btn btn-primary btn-block"
              disabled={loading}
              type="submit"
              data-testid="submit-btn"
            >
              {loading && <span className="spinner-border spinner-border-sm" />}
              <span>Login</span>
            </button>
          </div>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: 'none' }} ref={checkBtn} />
        </Form>
      </div>
      <div className="d-flex justify-content-end">
        <div className="col-md-4">
          <span
            style={{
              color: '#008000',
              fontWeight: 'bold',
              padding: '5px',
              border: '1px solid',
              cursor: 'pointer',
            }}
            role="presentation"
            onKeyDown={handleGuestLogin}
            onClick={handleGuestLogin}
            data-testid="guest-login"
          >
            Guest Login
          </span>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Login;
