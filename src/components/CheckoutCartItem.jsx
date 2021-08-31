import PropTypes from 'prop-types';
import SubTotal from './SubTotal';

const CheckoutCartItem = ({ cartItem }) => {
  const item = cartItem;
  const {
    product: { name, price },
    quantity,
  } = item;

  return (
    <>
      <tr>
        <td>{`${name} x ${quantity}`}</td>
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td>{`R ${price}`}</td>
      </tr>
      <SubTotal price={price} quantity={quantity} />
    </>
  );
};

CheckoutCartItem.propTypes = {
  cartItem: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default CheckoutCartItem;
