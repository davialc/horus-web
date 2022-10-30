import axios from 'axios';
import { getCookie } from 'cookies-next';

const tokenAdmin = getCookie('@horus-finance/admin-token');
const tokenContability = getCookie('@horus-finance/contability-token');

export const apiAdmin = axios.create({
	baseURL: 'https://still-meadow-57659.herokuapp.com/api',
});

export const apiContability = axios.create({
	baseURL: 'https://still-meadow-57659.herokuapp.com/api',
});

if (tokenAdmin) {
	apiAdmin.defaults.headers['Authorization'] = tokenAdmin;
}

if (tokenContability) {
	apiContability.defaults.headers['Authorization'] = tokenContability;
}
