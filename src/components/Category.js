const Category = ({ plant, category }) => {
  const { image_url } = plant;
  return (
    <div className="col-sm-6 col-md-4">
      <div className="plant d-flex justify-content center flex-column">
        <img src={image_url} alt="category image" />
      </div>
      <>
        <h4>{category.toUpperCase()}</h4>
      </>
    </div>
  );
};

export default Category;
