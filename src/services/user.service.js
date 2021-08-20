import axios from 'axios';
import { httpProtocol, host, port } from '../env.variables';

const API_URL = `${httpProtocol}://${host}:${port}/api/`;

const getPublicContent = () => axios.get(`${API_URL}plants`);

export default {
  getPublicContent,
};
