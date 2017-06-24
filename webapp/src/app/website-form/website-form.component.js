'use strict';

var template = require('./website-form.template.html'),
    controller = require('./website-form.controller');

var WebsiteFormComponent =
{
    template: template,
    controller: controller,
    bindings:
    {
        website: '<',
        onSave: '&',
        onCancel: '&'
    }
};

module.exports = WebsiteFormComponent;