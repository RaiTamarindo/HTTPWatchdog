'use strict';

module.exports = function(app)
{
    var baseUrl = '/rest';
    var websiteController = require('./controllers/websiteController'),
        websiteValidator = require('./middlewares/websiteValidator'),
        websiteEventEmitter = require('./middlewares/websiteEventEmitter');

    app.route(baseUrl + '/websites')
        .get(websiteController.list)
        .post(websiteValidator)
        .post(websiteController.create)
        .post(websiteEventEmitter.create);

    app.route(baseUrl + '/websites/:id')
        .get(websiteController.read)
        .put(websiteValidator)
        .put(websiteController.update)
        .put(websiteEventEmitter.update)
        .delete(websiteController.delete)
        .delete(websiteEventEmitter.delete);
};