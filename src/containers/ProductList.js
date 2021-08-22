import { useSelector } from 'react-redux';
import uuid from 'react-uuid';
import Plant from '../components/ProductItem';
import Filter from '../components/CategoryFilter';

const ProductList = () => {
  const { filter: category } = useSelector((state) => state.filter);
  const products = useSelector((state) => state.product);
  const categoryPrdcts = (category) => products.filter(
    (prdct) => prdct.category.toLowerCase() === category.toLowerCase(),
  );
  const ctprdcts = category === 'All Plants' ? products : categoryPrdcts(category);

  return (
    <div className="container d-lg-flex">
      <Filter />
      <>
        {ctprdcts && ctprdcts.length > 0 ? (
          <div className="row d-flex pt-lg-0 pt-3">
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
