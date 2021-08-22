import { Link, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const BoardAdmin = () => {
  const { user: currentUser } = useSelector((state) => state.auth);

  if (!currentUser) {
    return <Redirect to="/login" />;
  }
  if (
    currentUser
    && !currentUser.supervisor_role
    && !currentUser.superadmin_role
  ) {
    alert(
      'Unauthorized action! You need to be logged in as admin or supervisor.',
    );
    return <Redirect to="/profile" />;
  }
  return (
    <div className="container d-flex justify-content-center ">
      <div className="col-md-6">
        <header className="jumbotron">
          <h3
            style={{
              textTransform: 'uppercase',
              paddingBottom: '50px',
              paddingTop: '50px',
              textAlign: 'center',
            }}
          >
            Admin Board
          </h3>
        </header>
        <div className="d-flex flex-column admin">
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
          <span className="d-flex justify-content-between">
            <i className="fa fa-plus-circle" aria-hidden="true" />
            <Link to="/new-plant">Add a product item</Link>
            <i className="fa fa-leaf" aria-hidden="true" />
          </span>
          <span className="d-flex justify-content-between">
            <i className="fa fa-plus-circle" aria-hidden="true" />
            <Link to="/new-category">Add a product category</Link>
            <i className="fa fa-object-group" aria-hidden="true" />
          </span>
          <span className="d-flex justify-content-between">
            <i className="fa fa-plus-circle" aria-hidden="true" />
            <Link to="/update-product/select">Update an existing product</Link>
            <i className="fa fa-leaf" aria-hidden="true" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default BoardAdmin;
