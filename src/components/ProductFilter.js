import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Filter = () => {
  const history = useHistory();
  const products = useSelector((state) => state.product);
  const handleChange = (event) => {
    let {
      target: { value },
    } = event;
    value = JSON.parse(value);

    history.push({
      pathname: "/update-product/form",
      search: `?id=${value.id}`,
      state: value,
    });
  };

  return products && products.length > 0 ? (
    <div className="col-md-3">
      <label for="category-select">PRODUCTS:</label>

      <select name="categories" id="category-select" onChange={handleChange}>
        <option value="">Select a product to update</option>
        {products.map((product) => (
          <option value={JSON.stringify(product)}>{product.name}</option>
        ))}
      </select>
    </div>
  ) : null;
};

export default Filter;
