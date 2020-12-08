/**
 * Constructor.
 */

export class InMemoryCache {
	clients = [
		{
			clientId: 'k6-tutorial',
			clientSecret: 'secret',
			grants: ['password'],
		},
	];
	users = [
		{
			id: '123',
			username: 'test.user',
			password: 'password',
		},
	];
	tokens = [];

	/**
	 * Dump the cache.
	 */

	dump() {
		console.log('clients', this.clients);
		console.log('tokens', this.tokens);
		console.log('users', this.users);
	}

	/*
	 * Get access token.
	 */

	getAccessToken(bearerToken) {
		const token = this.tokens.find((t) => t.accessToken === bearerToken);
		if (!token) return false;

		const client = this.clients.find((c) => c.clientId === token.clientId);
		if (!client) return false;

		const user = this.users.find((u) => u.id === token.userId);
		if (!user) return false;

		return { ...token, client: { id: client.id }, user };
	}

	/**
	 * Get refresh token.
	 */

	getRefreshToken(bearerToken) {
		const token = this.tokens.find((t) => t.refreshToken === bearerToken);
		if (!token) return false;

		const client = this.clients.find((c) => c.clientId === token.clientId);
		if (!client) return false;

		const user = this.users.find((u) => u.id === token.userId);
		if (!user) return false;

		return { ...token, client: { id: client.id }, user };
	}

	/**
	 * Get client.
	 */

	getClient(clientId, clientSecret) {
		const client = this.clients.find(
			(c) => c.clientId === clientId && c.clientSecret === clientSecret
		);

		return client ? client : false;
	}

	/**
	 * Save token.
	 */

	saveToken(token, client, user) {
		this.tokens.push({
			accessToken: token.accessToken,
			accessTokenExpiresAt: token.accessTokenExpiresAt,
			clientId: client.clientId,
			refreshToken: token.refreshToken,
			refreshTokenExpiresAt: token.refreshTokenExpiresAt,
			userId: user.id,
		});
		return { ...token, client: { id: client.clientId }, user };
	}

	/*
	 * Get user.
	 */

	getUser(username, password) {
		const users = this.users.find(
			(u) => u.username === username && u.password === password
		);

		return users ? users : false;
	}
}

export default new InMemoryCache();
