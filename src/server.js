import Koa from 'koa';
import Router from 'koa-router';
import OAuthServer from 'koa2-oauth-server';
import bodyparser from 'koa-bodyparser';
import error from 'koa-json-error';
import model from './model.js';

// Create a new koa app.
const app = new Koa();

// Setup OAuth Server
app.oauth = new OAuthServer({
	model,
	grants: ['password'],
	debug: true,
});

// Enable json error responses
app.use(error());

// Enable body parsing.
app.use(bodyparser({ extended: true }));

// Create a router for oauth.
const oauthRouter = new Router({ prefix: '/oauth' });
oauthRouter.post('/token', app.oauth.token());

// Create a router for our api
const filmsRouter = new Router({ prefix: '/api' });
filmsRouter.use(app.oauth.authenticate());
filmsRouter.get('/', async (ctx) => {
	// Long request
	// await new Promise((resolve) => {
	// 	setTimeout(resolve, 1000);
	// });

	// Random failures
	// const statuses = [200, 400, 418, 500];
	// ctx.status = statuses[getRandomInt(statuses.length)];

	ctx.body = { message: 'ok' };
});

// Start koa server.
app.use(oauthRouter.middleware()).use(filmsRouter.middleware()).listen(3000);

function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}
