const Plant = ({ plant }) => {
  const { name, image_url, price, category } = plant;
  return (
    <div className="col-sm-6 col-md-4">
      <>
        <img src={image_url} alt="plant image" />
      </>
      <>
        <h4>{name}</h4>
        <h4>{category}</h4>
        <h4>{price}</h4>
      </>
    </div>
  );
};

export default Plant;
