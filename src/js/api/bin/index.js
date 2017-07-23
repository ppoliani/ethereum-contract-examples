#!/usr/bin/env node
if(process.env.NODE_ENV === 'development') {
  require('dotenv').config({silent: true});
}

const Koa = require('koa');
const uhttp = require('http');
const Router = require('koa-router');
const ctk = require('koa-connect');
const morgan = require('morgan');
const applyMiddlewares = require('../core/middlewares');
const setupRoutes = require('../core/routes');

const app = new Koa();
const router = setupRoutes(Router());

applyMiddlewares(app);

 app
  .use(router.routes())
  .use(router.allowedMethods())
  .use(ctk(morgan('dev')))

uhttp
  .createServer(app.callback())
  .listen(process.env.SERVER_PORT, () => {
    logger.info(`Koa server listening on port ${process.env.SERVER_PORT}`);
  });
