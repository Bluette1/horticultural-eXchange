import { Link } from "react-router-dom";

const BoardUser = () => {
  return (
    <div className="container">
      <header className="jumbotron">
        <h3>Admin Board</h3>
      </header>
      <div className="d-flex flex-column">
          <Link to={"/new-plant"}>Add a plant item</Link>
          <Link to={"/new-category"}>Add a plant category</Link>
        </div>
    </div>
  );
};

export default BoardUser;
