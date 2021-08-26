import PropTypes from 'prop-types';

const CheckoutCartItem = ({ cartItem }) => {
  const item = cartItem;
  const { name, price, quantity } = item;

  return (
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
  );
};

CheckoutCartItem.propTypes = {
  cartItem: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default CheckoutCartItem;
