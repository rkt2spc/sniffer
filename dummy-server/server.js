// Dependencies
const http = require('http');
const Koa = require('koa');
const Router = require('koa-router');
const Logger = require('koa-morgan');
const BodyParser = require('koa-bodyparser');
const json = require('koa-json');
const shortid = require('shortid');

// Database
const db = require('./database');

// Router
const router = new Router();
router.post('/records', async ({ request, response }) => {
  const { records } = db.getCollections();
  await records.push({ id: shortid.generate(), ...request.body }).write();
  response.body = request.body;
});
router.get('/records', async ({ response }) => {
  const { records } = db.getCollections();
  response.body = { records };
});

// Application
const app = new Koa();
app.use(new Logger('dev'));
app.use(new BodyParser());
app.use(json());
app.use(router.routes());

// HTTP Server
const PORT = process.env.PORT || 8080;
const server = http.createServer(app.callback());

Promise.resolve()
  .then(() => db.initialize('db.json'))
  .then(() => server.listen(PORT, () => console.log('Server is listening on port', PORT)))
  .catch((err) => console.error(err));
