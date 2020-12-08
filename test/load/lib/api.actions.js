import http from 'k6/http';
import { check } from 'k6';

export function login(url) {
	const request = {
		username: 'test.user',
		password: 'password',
		grant_type: 'password',
		client_id: 'k6-tutorial',
		client_secret: 'secret',
	};
	const response = http.post(`${url}/oauth/token`, request);
	const body = JSON.parse(response.body);
	const token = body && body.access_token;

	check(token, { 'logged in successfully': (t) => !!t });

	return token;
}

export function get(url, token) {
	const headers = {
		Authorization: `Bearer ${token}`,
	};

	const response = http.get(`${url}/api`, { headers });

	check(response, {
		'is status 200': (r) => r.status === 200,
	});
}
