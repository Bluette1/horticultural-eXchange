import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// loadStripe is initialized with your real test publishable API key.
const promise = loadStripe('pk_test_51JJIxvA6v0p4b8rIruyoONfX8QwWPQi1xHDCXIkPAlLt2QquEolHgfOJsnGaNZ92BqjeBo0KW72Uz7mh3Fyj2gy400HIiQx9Z3');
export default function App() {
  return (
    <div>
      <Elements stripe={promise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}
