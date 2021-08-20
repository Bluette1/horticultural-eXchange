import { Link } from 'react-router-dom';

const BoardModerator = () => (
  <div className="container">
    <header className="jumbotron">
      <h3>Moderator Board</h3>
    </header>
    <div className="d-flex flex-column">
      <Link to="/register">Add User</Link>
      <Link to="/de-register">Remove User</Link>
    </div>
  </div>
);

export default BoardModerator;
