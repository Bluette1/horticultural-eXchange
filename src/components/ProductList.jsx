import { useSelector } from 'react-redux';
import uuid from 'react-uuid';
import Plant from './ProductItem';
import Filter from './CategoryFilter';

const ProductList = () => {
  const { filter: category } = useSelector((state) => state.filter);
  const products = useSelector((state) => state.product);
  const categoryPrdcts = (category) => products.filter(
    (prdct) => prdct.category.toLowerCase() === category.toLowerCase(),
  );
  const ctprdcts = category === 'All Plants' ? products : categoryPrdcts(category);

  return (
    <div className="container d-flex">
      <Filter />
      <>
        {ctprdcts && ctprdcts.length > 0 ? (
          <div className="row d-flex">
            {' '}
            {ctprdcts.map((product) => (
              <Plant key={`plant-${uuid()}`} plant={product} />
            ))}
          </div>
        ) : (
          <></>
        )}
      </>
    </div>
  );
};

export default ProductList;
