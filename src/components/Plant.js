import ToggleBtn from './ToggleBtn';

const Plant = ({ plant }) => {
  const { name, image_url, price, category } = plant;
  return (
    <div className="col-sm-6 col-md-4">
      <div className="plant d-flex justify-content center flex-column">
        <ToggleBtn plant={plant} />
        <img src={image_url} alt="plant image" />
      </div>
      <>
        <h4>{name}</h4>
        <h4>{category}</h4>
        <h4>R {price}</h4>
      </>
    </div>
  );
};

export default Plant;
