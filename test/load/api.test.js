import { login, get } from './lib/api.actions.js';

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';

export const options = {
	duration: '10s',
	vus: 10,
	thresholds: {
		http_req_duration: ['p(95)<200'],
		checks: ['rate>0.9'],
	},
};

export function setup() {
	const token = login(BASE_URL);
	return token;
}

export default function (token) {
	get(BASE_URL, token);
}
