import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { createPlant } from "../services/plant.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const PlantForm = (props) => {
  const form = useRef();
  const checkBtn = useRef();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const { message } = useSelector(state => state.message);
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
      const res = await createPlant({ image, name, category, price });
      if (res.status !== 201 || !res) {
        setLoading(false);
      } else {
        props.history.push("/");
        window.location.reload();
      }
     
    } else {
      setLoading(false);
    }
  };


  const handleChangeImage = event => {
    setImage(event.target.files[0]);
    setImageSelected(true);
  }

  return (
    <div className="col-md-12">

        <Form onSubmit={handleSubmit} ref={form}>
          <div className="form-group">
            <label htmlFor="name">name</label>
            <Input
              type="text"
              className="form-control"
              name="name"
              value={name}
              onChange={onChangeName}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <Input
              className="form-control"
              name="category"
              value={category}
              onChange={onChangeCategory}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">Price</label>
            <Input
              className="form-control"
              name="price"
              value={price}
              onChange={onChangePrice}
              validations={[required]}
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
                      {' '}
                      {image.lastModifiedDate.toLocaleDateString()}
                    </p>
                  </span>
                ) : (
                  <p>Select an image file</p>
                )}
          </div>
          <div className="form-group ">
            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Add Plant</span>
            </button>
          </div>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
    </div>
  );
};

export default PlantForm;