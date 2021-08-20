import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import queryString from 'query-string';
import { updatePlant } from '../services/product.service';

const PlantForm = (props) => {
  const location = useLocation();
  const { id } = queryString.parse(location.search);
  const product = location.state;
  const form = useRef();
  const checkBtn = useRef();
  const [name, setName] = useState(product.name);
  const [commonName, setCommonName] = useState(product.common_name || '');
  const [inStock, setInStock] = useState(product.in_stock);
  const [category, setCategory] = useState(product.category);
  const [price, setPrice] = useState(product.price);
  const [description, setDescription] = useState(product.description || '');
  const [image, setImage] = useState(null);
  const { message } = useSelector((state) => state.message);
  const [imageSelected, setImageSelected] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChangeName = (e) => {
    const name = e.target.value;
    setName(name);
  };

  const onChangeCommonName = (e) => {
    const name = e.target.value;
    setCommonName(name);
  };

  const onChangeCategory = (e) => {
    const category = e.target.value;
    setCategory(category);
  };
  const onChangeDescription = (e) => {
    const description = e.target.value;
    setDescription(description);
  };
  const onChangeInStock = (e) => {
    const inStock = !e.target.value;
    setInStock(inStock);
  };

  const onChangePrice = (e) => {
    const price = e.target.value;
    setPrice(price);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) { // eslint-disable-line no-underscore-dangle
      const res = await updatePlant(id, {
        image,
        name,
        category,
        price,
        commonName,
        inStock,
        description,
      });
      if (res.status && res.status !== 200) {
        setLoading(false);
      } else {
        props.history.push('/');
        window.location.reload();
      }
    } else {
      setLoading(false);
    }
  };

  const handleChangeImage = (event) => {
    setImage(event.target.files[0]);
    setImageSelected(true);
  };

  return (
    <div className="col-md-12">
      <Form onSubmit={handleSubmit} ref={form}>
        <div className="form-group">
          <p>name</p>
          <Input
            type="text"
            className="form-control"
            name="name"
            placeholder={product.name}
            value={name}
            onChange={onChangeName}
          />
        </div>

        <div className="form-group">
          <p>Category</p>
          <Input
            className="form-control"
            name="category"
            placeholder={product.category}
            value={category}
            onChange={onChangeCategory}
          />
        </div>
        <div className="form-group">
          <h4>Is product out of stock?</h4>
          <div className=" row d-flex flex-row">
            <p>Yes</p>
            <Input
              className="col-1"
              type="checkbox"
              name="in-stock"
              value={inStock}
              onChange={onChangeInStock}
            />
          </div>
        </div>

        <div className="form-group">
          <p>Price</p>
          <Input
            className="form-control"
            name="price"
            value={price}
            placeholder={product.price}
            onChange={onChangePrice}
          />
        </div>
        <div className="form-group">
          <input type="file" name="image" onChange={handleChangeImage} />
          {' '}
          {imageSelected ? (
            <span>
              <p>
                Filename:
                {image.name}
              </p>
              <p>
                Filetype:
                {image.type}
              </p>
              <p>
                Size in bytes:
                {image.size}
              </p>
              <p>
                lastModifiedDate:
                {image.lastModifiedDate.toLocaleDateString()}
              </p>
            </span>
          ) : (
            <p>Select an image file</p>
          )}
        </div>
        <div className="form-group">
          <p>Description</p>
          <textarea
            id="description"
            name="description"
            rows="4"
            cols="50"
            value={description}
            onChange={onChangeDescription}
          >
            Enter description
          </textarea>
        </div>
        <div className="form-group">
          <p>Common name</p>
          <Input
            className="form-control"
            name="common-name"
            value={commonName}
            onChange={onChangeCommonName}
          />
        </div>
        <div className="form-group ">
          <button
            className="btn btn-primary btn-block"
            disabled={loading}
            type="submit"
          >
            {loading && <span className="spinner-border spinner-border-sm" />}
            <span>Update Product</span>
          </button>
        </div>

        {message && (
          <div className="form-group">
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          </div>
        )}
        <CheckButton style={{ display: 'none' }} ref={checkBtn} />
      </Form>
    </div>
  );
};

PlantForm.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};
export default PlantForm;
