import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import isGuestUser from '../helpers/isGuestUser';

const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  if (!currentUser) {
    return <Redirect to="/login" />;
  }
  const userValue = isGuestUser(currentUser) ? 'Guest User' : 'User';

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.email}</strong>
          {' '}
          Profile
        </h3>
      </header>
      {!isGuestUser(currentUser) && (
      <p>
        {' '}
        <strong>Token:</strong>
        {' '}
        {currentUser.accessToken.substring(0, 20)}
        {' '}
        ...
        {' '}
        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
      </p>
      )}
      {!isGuestUser(currentUser) && (
      <p>
        <strong>Id:</strong>
        {' '}
        {currentUser.id}
      </p>
      )}
      <p>
        <strong>Email:</strong>
        {' '}
        {currentUser.email}
      </p>
      <strong>Authorities:</strong>
      <ul>
        {currentUser.user_role && <li>{userValue}</li>}
        {currentUser.superadmin_role && <li>Admin</li>}
        {currentUser.supervisor_role && <li>Moderator</li>}
      </ul>
    </div>
  );
};

export default Profile;
