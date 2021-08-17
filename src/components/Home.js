import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { registerCategories } from "../actions/category";
import { registerProducts } from "../actions/product";
import uuid from "react-uuid";
import UserService from "../services/user.service";
import CategoryService from "../services/category.service";
import Category from "./Category";

const Home = () => {
  const [errDisplay, setErrDisplay] = useState("");
  const dispatch = useDispatch();
  const randomInteger = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;
  const categoryPrdcts = (category) =>
    products.filter((prdct) => prdct.category.toLowerCase() === category.toLowerCase());
  const getCategoryPrdct = (category) => {
    const ctprdcts = categoryPrdcts(category);
    console.log("ctprdcts: ", ctprdcts);
    const idx = randomInteger(0, ctprdcts.length - 1);
    return ctprdcts[idx];
  };
  const getCategories = (categories) => categories.map((item) => item.category);
  const products = useSelector((state) => state.product);
  const categories = useSelector((state) => state.category);
  console.log("categories: ", categories);
  console.log("products: ", products);
  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        dispatch(registerProducts(response.data));
        CategoryService.getCategories().then(
          (res) => {
            dispatch(registerCategories(getCategories(res.data)));
          },
          (err) => {
            const _errContent =
              (err.response && err.response.data) ||
              err.message ||
              err.toString();

            setErrDisplay(_errContent);
          }
        );
      },
      (error) => {
        const _errorContent =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setErrDisplay(_errorContent);
      }
    );
  }, []);

  if (errDisplay !== "") {
    return <p>{errDisplay}</p>;
  }

  return (
    <div className="container">
      <>
        {categories && categories.length > 0 ? (
          <div className="row d-flex">
            {" "}
            {categories.map((category) => (
              <Category
                key={`plant-${uuid()}`}
                plant={getCategoryPrdct(category)}
                category={category}
              />
            ))}
          </div>
        ) : (
          <>
            <p className="no-plants">No categories were found</p>
          </>
        )}
      </>
    </div>
  );
};

export default Home;
