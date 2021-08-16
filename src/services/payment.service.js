import axios from "axios";
import authHeader from "./auth-header";
import { httpProtocol, host, port } from '../env.variables';

const API_URL = `${httpProtocol}://${host}:${port}/payment_intents`;

const createPaymentIntent = (items) => {
  return axios.post(API_URL,
    { payment_intent: items },
    { headers: authHeader() },
  );
};

export default createPaymentIntent;
