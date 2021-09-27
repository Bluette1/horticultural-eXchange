import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import AuthService from '../services/auth.service';

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

const Deregister = ({ history }) => {
  const form = useRef();
  const checkBtn = useRef();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { message } = useSelector((state) => state.message);
  const { user: currentUser } = useSelector((state) => state.auth);
  const namespace = (currentUser) => (currentUser.supervisor_role ? 'mod' : 'admin');

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const handleDeregister = (e) => {
    e.preventDefault();

    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.deregister(email, currentUser)
        .then(() => {
          history.push(`/${namespace(currentUser)}`);
          window.location.reload();
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };
  return (
    <div className="col-md-12" data-testid="deregister-container">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Form onSubmit={handleDeregister} ref={form}>
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
            <button
              className="btn btn-primary btn-block"
              type="submit"
              disabled={loading}
              data-testid="submit-btn"
            >
              {loading && <span className="spinner-border spinner-border-sm" />}
              <span>Deregister User</span>
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
    </div>
  );
};
Deregister.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};
export default Deregister;
