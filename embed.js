var adapt = require('argo-connect');
var express = require('express');
var RED = require('node-red');

module.exports = function(settings) {
  return function(server) {
    var cloud = server.httpServer.cloud;
    var httpServer = server.httpServer.server;

    var app = express();

    RED.init(httpServer, settings);

    app.use(settings.httpAdminRoot,RED.httpAdmin);
    app.use(settings.httpNodeRoot,RED.httpNode);

    cloud.get(settings.httpAdminRoot, function(handle) {
      handle('request', function(env, next) {
        env.response.statusCode = 301;
        env.response.setHeader('Location', env.helpers.url.path('/red/'));
        next(env);
      });
    });

    cloud.route(settings.httpAdminRoot + '/{splat: .*}', ['GET', 'POST', 'PUT', 'DELETE'], adapt(app));
    cloud.route(settings.httpNodeRoot + '/api/{splat: .*}', ['GET', 'POST', 'PUT', 'DELETE'], adapt(app));

    RED.start();
  };
};
