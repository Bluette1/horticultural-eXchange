import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import uuid from 'react-uuid';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import swal from 'sweetalert';
import { resetCart } from '../actions/cart';
import createPaymentIntent from '../services/payment.service';
import logo from '../logo.png';
import CheckoutCartItem from './CheckoutCartItem';
import CartItemsService from '../services/cartitem.service';
import isGuestUser from '../helpers/isGuestUser';

export default function CheckoutForm() {
  const cartItems = useSelector((state) => state.cart);
  const { user: currentUser } = useSelector((state) => state.auth);
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  const [errDisplay, setErrDisplay] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const history = useHistory();
  const emptyCart = () => {
    if (isGuestUser(currentUser)) {
      dispatch(resetCart());
    } else {
      CartItemsService.deleteCartItems().then(
        () => {
          dispatch(resetCart());
        },
        (err) => {
          const errContent = (err.response && err.response.data)
            || err.message
            || err.toString();
          setErrDisplay(JSON.stringify(errContent));
        },
      );
    }
  };
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    window.onload = function () {
      createPaymentIntent(cartItems).then((res) => {
        setClientSecret(res.data.clientSecret);
      });
    };
  }, []);

  const cardStyle = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: 'antialiased',
        '::placeholder': {
          color: '#32325d',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  };

  const total = () => {
    let sum = 0;
    for (let index = 0; index < cartItems.length; index += 1) {
      const item = cartItems[index];
      sum += item.quantity * item.product.price;
    }
    return sum;
  };

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : '');
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      swal('Payment succeeded, you will be contacted shortly with the details of your delivery. Redirecting to home page');
      setSucceeded(true);

      emptyCart();
    }
  };
  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  if (errDisplay !== '') {
    return <p>{errDisplay}</p>;
  }

  if (succeeded) {
    setTimeout(() => {
      history.push('/');
    }, 5000);
  }

  return (
    <div className="d-flex justify-content-md-center mt-5 pt-5">
      <div>
        <div>
          Thank you for supporting &nbsp;
          <img
            style={{
              marginRight: '2px',
              width: '50px',
              height: '50px',
              borderRadius: 500,
              backgroundColor: 'white',
            }}
            src={logo}
            alt="logo"
          />
          <span style={{ color: '#008000', fontWeight: 'bold' }}>iGrow</span>
          &nbsp;!
        </div>
        <div className="mt-5 pt-5">
          <header className="jumbotron mb-5">
            <h4 className="font-weight-bold text-uppercase">Your Order</h4>
          </header>
          <table>
            <thead>
              <tr>
                <th>PRODUCT</th>
                <th>&nbsp;</th>
                <th>&nbsp;</th>
                <th>&nbsp;</th>
                <th>&nbsp;</th>
                <th>&nbsp;</th>
                <th>&nbsp;</th>
                <th>&nbsp;</th>
                <th>&nbsp;</th>
                <th>&nbsp;</th>
                <th>&nbsp;</th>
                <th>&nbsp;</th>
                <th>&nbsp;</th>
                <th>SUBTOTAL</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <CheckoutCartItem key={`item-${uuid()}`} cartItem={item} />
              ))}
              <tr>
                <td>Shipping</td>
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
                <td>R 60</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td>Total</td>
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
                <td>{`R ${total() + 60}`}</td>
              </tr>
            </tfoot>
          </table>
        </div>
        <h6 className="mt-5">Please enter your credit card details below:</h6>
        <form id="payment-form pt-5 mt-5" onSubmit={handleSubmit}>
          <CardElement
            id="card-element"
            options={cardStyle}
            onChange={handleChange}
          />
          <button
            disabled={processing || disabled || succeeded}
            id="submit"
            type="submit"
          >
            <span id="button-text">
              {processing ? <div className="spinner" id="spinner" /> : 'Pay now'}
            </span>
          </button>
          {/* Show any error that happens when processing the payment */}
          {error && (
            <div className="card-error" role="alert">
              {error}
            </div>
          )}
          {/* Show a success message upon completion */}
          <p style={{ marginLeft: -40 }} className={succeeded ? 'result-message' : 'result-message hidden'}>
            Payment succeeded, you will be contacted shortly
            with the details of your delivery.
            {' '}
            You will be redirected to the home page shortly.
            Thank you once again.
          </p>
        </form>
      </div>
    </div>
  );
}
