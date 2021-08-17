import { useSelector } from "react-redux";
import Plant from "./Plant";
import uuid from "react-uuid";
import Filter from "./Filter";

const ProductList = () => {
  const { filter: category } = useSelector((state) => state.filter);
  const products = useSelector((state) => state.product);
  const categoryPrdcts = (category) =>
    products.filter(
      (prdct) => prdct.category.toLowerCase() === category.toLowerCase()
    );
  const ctprdcts = category === 'All plants' ? products: categoryPrdcts(category);

  return (
    <div className="container d-flex">
      <Filter />
      <>
        {ctprdcts && ctprdcts.length > 0 ? (
          <div className="row d-flex">
            {" "}
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
