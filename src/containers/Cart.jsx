import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import uuid from 'react-uuid';
import CartItem from '../components/CartItem';

const Cart = () => {
  const crtItems = useSelector((state) => state.cart);
  const { user: currentUser } = useSelector((state) => state.auth);
  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  const total = () => {
    let sum = 0;
    for (let index = 0; index < crtItems.length; index += 1) {
      const item = crtItems[index];
      sum += item.quantity * item.price;
    }
    return sum;
  };

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>Items in Cart</h3>
        <table style={{ width: '100%' }}>
          <thead>
            {' '}
            <tr>
              <th className="product-remove">&nbsp;</th>
              <th className="product-thumbnail">&nbsp;</th>
              <th className="product-name">Product</th>
              <th className="product-price">Price</th>
              <th className="product-quantity">Quantity</th>
              <th className="product-subtotal">Total</th>
            </tr>
          </thead>
          <tbody>
            {crtItems.map((item) => <CartItem key={`item-${uuid()}`} item={item} />)}
          </tbody>
          <tfoot>
            <tr>
              <td />
              <td />
              <td />
              <td>Sum</td>
              <td>{total()}</td>
            </tr>
          </tfoot>
        </table>
        <Link to="/payment">Checkout</Link>
      </header>
    </div>
  );
};

export default Cart;
