var zetta = require('zetta');
var red = require('./embed');
var Photocell = require('zetta-photocell-mock-driver');
var LED = require('zetta-led-mock-driver');

var settings = {
    httpAdminRoot: '/red',
    httpNodeRoot: '/api',
    userDir: './.node-red/',
    functionGlobalContext: { }    // enables global context
};

zetta()
  .use(red(settings))
  .use(Photocell)
  .use(LED)
  .listen(3000);
