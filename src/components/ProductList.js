import { useSelector } from "react-redux";
import Plant from "./Plant";
import uuid from "react-uuid";

const ProductList = () => {
  const { filter: category } = useSelector((state) => state.filter);
  const products = useSelector((state) => state.product);
  const categoryPrdcts = (category) =>
    products.filter(
      (prdct) => prdct.category.toLowerCase() === category.toLowerCase()
    );
  const ctprdcts = categoryPrdcts(category);

  return (
    <div className="container">
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
