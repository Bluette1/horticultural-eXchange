import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import ToggleBtn from './ToggleBtn';
import OutOfStock from './OutOfStock';

const Plant = ({ plant }) => {
  const history = useHistory();
  const {
    name, image_url: imageUrl, price, in_stock: inStock,
  } = plant;
  const { user: currentUser } = useSelector((state) => state.auth);
  const handleClick = () => {
    history.push({
      pathname: `/product/${name.toLowerCase().replace(/ /g, '-')}`,
      state: { plant },
    });
  };

  const classPlantDiv = currentUser && inStock ? 'plant-toggle plant d-flex justify-content center flex-column' : 'plant d-flex justify-content center flex-column';

  return (
    <div
      className="col-sm-6 col-md-4"
      role="presentation"
      onKeyDown={handleClick}
      onClick={handleClick}
    >
      <div className={classPlantDiv}>
        {!inStock && <OutOfStock />}
        <button
          className="view btn-primary my-2"
          onClick={handleClick}
          data-testid="action-button"
          type="button"
        >
          View item
        </button>
        {currentUser && inStock && <ToggleBtn prdct={plant} />}
        <img src={imageUrl} alt="plant" />
      </div>
      <>
        <h4>{name.toUpperCase()}</h4>
        <h4>
          R
          {price}
        </h4>
      </>
    </div>
  );
};
Plant.propTypes = {
  plant: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Plant;
