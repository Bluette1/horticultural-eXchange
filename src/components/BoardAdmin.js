import { Link } from "react-router-dom";

const BoardUser = () => {
  return (
    <div className="container">
      <header className="jumbotron">
        <h3>Admin Board</h3>
      </header>
      <div className="d-flex flex-column">
          <Link to={"/new-plant"}>Add a product item</Link>
          <Link to={"/new-category"}>Add a product category</Link>
          <Link to={"/update-product/select"}>Update an existing product</Link>
        </div>
    </div>
  );
};

export default BoardUser;
