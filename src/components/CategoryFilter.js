import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { changeFilter } from "../actions/filter";
import uuid from "react-uuid";

const Filter = () => {
  const { filter: category } = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const history = useHistory();
  let categories = [...useSelector((state) => state.category), "All Plants"];
  if (category) {
    categories = categories.filter((item) => item.toLowerCase() !== category.toLowerCase());
  }
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    if (value !== "") {
      dispatch(changeFilter(value));
      history.push({
        pathname: "/category-product",
        search: `?category=${value}`,
      });
    }
  };

  return (
    <div className="col-md-3">
      <label htmlFor="category-select">PRODUCT CATEGORIES:</label>
      {categories && categories.length > 1 ? <select name="categories" id="category-select" onChange={handleChange}>
        <option value={category ? category: ""}> {category ? category : 'Select a category'}</option>
        {categories.map((item) => (
          <option key={`category-${uuid()}`} value={item}>{item}</option>
        ))}
      </select> : null }
      
    </div>
  );
};

export default Filter;
