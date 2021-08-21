import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import CategoryService from '../services/category.service';

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

const CategoryForm = (props) => {
  const form = useRef();
  const checkBtn = useRef();
  const { message } = useSelector((state) => state.message);

  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const onChangeName = (e) => {
    const name = e.target.value;
    setName(name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      const res = await CategoryService.createCategory({ category: name });
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

  return (
    <div className="col-md-12">
      <Form onSubmit={handleSubmit} ref={form}>
        <div className="form-group">
          <p>name</p>
          <Input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={onChangeName}
            validations={[required]}
          />
        </div>

        <div className="form-group ">
          <button
            className="btn btn-primary btn-block"
            disabled={loading}
            type="submit"
          >
            {loading && <span className="spinner-border spinner-border-sm" />}
            <span>Add Product Category</span>
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
CategoryForm.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default CategoryForm;
