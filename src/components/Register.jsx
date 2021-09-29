import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import { isEmail } from 'validator';
import AuthService from '../services/auth.service';
import { registerSuccess, registerFail, setMessage } from '../actions/auth';

const namespace = (currentUser) =>
  currentUser.supervisor_role ? 'mod' : 'admin';

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

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
  return null;
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
  return null;
};

const Register = () => {
  const form = useRef();
  const checkBtn = useRef();

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { user: currentUser } = useSelector((state) => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successful, setSuccessful] = useState(false);

  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  const history = useHistory();

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      let addUser;
      if (isLoggedIn) {
        addUser = AuthService.registerUser(
          {
            user: { email, password },
          },
          currentUser,
        );
      } else {
        addUser = AuthService.register(email, password);
      }
      addUser
        .then(() => {
          if (isLoggedIn) {
            history.push(`/${namespace(currentUser)}`);
          } else {
            dispatch(registerSuccess());
            dispatch(setMessage('You have successfully registered'));
            history.push('/login');
          }
          window.location.reload();
        })
        .catch((error) => {
          const message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          dispatch(registerFail());
          dispatch(setMessage(message));
          setSuccessful(false);
        });
    }
  };

  const btnLabel = isLoggedIn ? 'Add User' : 'Sign Up';

  return (
    <div className="col-md-12" data-testid="register-container">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <p>Email</p>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
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
                  validations={[required, vpassword]}
                />
              </div>

              <div className="form-group">
                <button
                  className="btn btn-primary btn-block"
                  type="submit"
                  data-testid="submit-btn"
                >
                  {btnLabel}
                </button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={
                  successful ? 'alert alert-success' : 'alert alert-danger'
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: 'none' }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default Register;
