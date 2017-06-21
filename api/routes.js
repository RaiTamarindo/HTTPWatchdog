'use strict';

module.exports = function(app)
{
    var baseUrl = '/rest';
    var websiteController = require('./controllers/websiteController.js'),
        websiteValidator = require('./models/websiteValidator.js');

    app.route(baseUrl + '/websites')
        .get(websiteController.list)
        .post(websiteValidator)
        .post(websiteController.create);

    app.route(baseUrl + '/websites/:id')
        .get(websiteController.read)
        .put(websiteValidator)
        .put(websiteController.update)
        .delete(websiteController.delete);
};