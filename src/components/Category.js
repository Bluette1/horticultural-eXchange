import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeFilter } from "../actions/filter";

const Category = ({ plant, category }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { image_url } = plant;
  const handleClick = () => {
    dispatch(changeFilter(category));
    history.push({
      pathname: '/category-product',
      search: `?category=${category}`,
  });

  }
  return (
    <div className="col-sm-6 col-md-4" onClick={handleClick}>
      <div className="category d-flex justify-content center flex-column">
        <img src={image_url} alt="category image" />
      </div>
      <>
        <h4>{category.toUpperCase()}</h4>
      </>
    </div>
  );
};

export default Category;
