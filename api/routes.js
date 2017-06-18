'use strict';

module.exports = function(app)
{
    var baseUrl = '/rest';
    var websiteController = require('controllers/websiteController');

    app.route(baseUrl + '/websites')
        .get(websiteController.listAll)
        .post(websiteController.create);

    app.route(baseUrl + '/websites/:id')
        .get(websiteController.read)
        .put(websiteController.update)
        .delete(websiteController.delete);
};