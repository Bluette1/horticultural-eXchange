import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import isGuestUser from '../helpers/isGuestUser';

const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          {currentUser.user_role && <strong>{currentUser.email}</strong>}
          {currentUser.name && <strong>{currentUser.name}</strong>}
          &nbsp;
          Profile
        </h3>
      </header>
      {!isGuestUser(currentUser) && (
        <p>
          {' '}
          <strong>Token:</strong>
          {currentUser.accessToken.substring(0, 20)}
          ...
          {' '}
          {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
        </p>
      )}
      {!isGuestUser(currentUser) && (
        <p>
          <strong>Id:</strong>
          {currentUser.id}
        </p>
      )}
      {currentUser.user_role && (
        <p>
          <strong>Email:</strong>
          {currentUser.email}
        </p>
      )}
      <strong>Authorities:</strong>
      <ul>
        {isGuestUser(currentUser) && <li>Guest User</li>}
        {currentUser.user_role && <li>User</li>}
        {currentUser.superadmin_role && <li>Admin</li>}
        {currentUser.supervisor_role && <li>Moderator</li>}
      </ul>
    </div>
  );
};

export default Profile;
