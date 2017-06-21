'use strict';

var template = require('./website-list.template.html'),
    controller = require('./website-list.controller');

var WebsiteListComponent =
{
    template: template,
    controller: controller
};

module.exports = WebsiteListComponent;