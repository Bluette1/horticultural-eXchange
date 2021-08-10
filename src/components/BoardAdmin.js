import { Link } from "react-router-dom";

const BoardUser = () => {
  return (
    <div className="container">
      <header className="jumbotron">
        <h3>Admin Board</h3>
        <Link to={"/new-plant"}>Add a plant item</Link>
      </header>
    </div>
  );
};

export default BoardUser;
