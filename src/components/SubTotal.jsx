import PropTypes from 'prop-types';

const SubTotal = ({ price, quantity }) => (
  <tr>
    <td>SubTotal</td>
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
    <td>{`R ${price * quantity}`}</td>
  </tr>
);

SubTotal.propTypes = {
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
};

export default SubTotal;
