import { Link, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const BoardModerator = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  if (!currentUser) {
    return <Redirect to="/login" />;
  }
  if (currentUser && !currentUser.supervisor_role && !currentUser.superadmin_role) {
    alert('Unauthorized action! You need to be logged in as admin or supervisor.');
    return <Redirect to="/profile" />;
  }
  return (
    <div className="pt-5 container d-flex justify-content-center align-items-center ">
      <div>
        <header className="jumbotron">
          <h3 style={{ textTransform: 'uppercase', paddingBottom: '30px' }}>Moderator Board</h3>
        </header>
        <div className="d-flex flex-column mod">
          <span className="d-flex justify-content-between">
            <i className="fa fa-plus-circle" aria-hidden="true" />
            <Link to="/register">Add User</Link>
            <i className="fa fa-user-circle-o" aria-hidden="true" />
          </span>
          <span className="d-flex justify-content-between">
            <i className="fa fa-minus-circle" aria-hidden="true" />
            <Link to="/deregister">Remove User</Link>
            <i className="fa fa-user-circle-o" aria-hidden="true" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default BoardModerator;
