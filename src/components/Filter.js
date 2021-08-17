import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { changeFilter } from "../actions/filter";

const Filter = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const categories = [...useSelector((state) => state.category), "All Plants"];
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    if (value !== "") {
      dispatch(changeFilter(value));
      history.push({
        pathname: "/product-category",
        search: `?category=${value}`,
      });
    }
  };

  return (
    <div className="col-md-3">
      <label for="category-select">PRODUCT CATEGORIES:</label>

      <select name="categories" id="category-select" onChange={handleChange}>
        <option value="">Select a category</option>
        {categories.map((category) => (
          <option value={category}>{category}</option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
