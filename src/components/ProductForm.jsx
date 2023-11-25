import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import uuid from 'react-uuid';
import PropTypes from 'prop-types';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Select from 'react-validation/build/select';
import CheckButton from 'react-validation/build/button';
import { createPlant } from '../services/product.service';

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
  return null;
};

const ProductForm = (props) => {
  const form = useRef();
  const checkBtn = useRef();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const { message } = useSelector((state) => state.message);
  const categories = useSelector((state) => state.category);
  const [imageSelected, setImageSelected] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChangeName = (e) => {
    const name = e.target.value;
    setName(name);
  };

  const onChangeCategory = (e) => {
    const category = e.target.value;
    setCategory(category);
  };

  const onChangePrice = (e) => {
    const price = e.target.value;
    setPrice(price);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      const res = await createPlant({
        image,
        name,
        category,
        price,
      });
      if (res.status !== 201 || !res) {
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
    <div className="col-12 col-lg-6" data-testid="productform-container">
      <Form onSubmit={handleSubmit} ref={form}>
        <div className="form-group">
          <h4>Name</h4>
          <Input
            type="text"
            className="form-control"
            name="name"
            value={name}
            onChange={onChangeName}
            validations={[required]}
          />
        </div>

        <div className="form-group my-5">
          <label htmlFor="category-select">
            <span className="h4">Choose a category:</span>
            <Select
              name="category-select"
              id="categories-select"
              onChange={onChangeCategory}
            >
              <option value="">--Please choose a category--</option>
              {categories.map((item) => (
                <option
                  value={item}
                  key={`category-${uuid()}`}
                  validations={[required]}
                >
                  {item}
                </option>
              ))}
            </Select>
          </label>
        </div>

        <div className="form-group my-5">
          <h4>Price</h4>
          <Input
            className="form-control"
            name="price"
            value={price}
            onChange={onChangePrice}
            validations={[required]}
          />
        </div>
        <div className="form-group my-5">
          <input type="file" name="image" onChange={handleChangeImage} />
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
                {image.lastModifiedDate
                  ? image.lastModifiedDate.toLocaleDateString()
                  : Date.now()}
              </p>
            </span>
          ) : (
            <h4>Select an image file</h4>
          )}
        </div>
        <div className="form-group ">
          <button
            className="btn btn-primary btn-block"
            disabled={loading}
            type="submit"
            data-testid="submit-btn"
          >
            {loading && (
              <span className="spinner-border spinner-border-sm mx-2" />
            )}
            <span>Add Product</span>
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

ProductForm.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ProductForm;
