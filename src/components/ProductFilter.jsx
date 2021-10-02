import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import uuid from 'react-uuid';

const Filter = () => {
  const history = useHistory();
  const products = useSelector((state) => state.product);
  const handleChange = (event) => {
    let {
      target: { value },
    } = event;
    value = JSON.parse(value);

    history.push({
      pathname: '/update-product/form',
      search: `?id=${value.id}`,
      state: value,
    });
  };

  return products && products.length > 0 ? (
    <div className="col-md-3" data-testid="productfilter-container">
      <label htmlFor="category-select">
        PRODUCTS:
        <select name="categories" id="product-select" onChange={handleChange}>
          <option value="">Select a product to update</option>
          {products.map((product) => (
            <option key={`product-${uuid()}`} value={JSON.stringify(product)}>
              {product.name}
            </option>
          ))}
        </select>
      </label>
    </div>
  ) : null;
};

export default Filter;
