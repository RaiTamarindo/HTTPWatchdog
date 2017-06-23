'use strict';

/**
 * TODO: Make this directive a component
 */

var msWidgetController = require('./ms-widget.controller'),
    msWidgetDirective = require('./ms-widget.directive'),
    msWidgetFrontDirective = require('./ms-widget-front.directive'),
    msWidgetBackDirective = require('./ms-widget-back.directive');

module.exports = function(app)
{
    app
        .controller('MsWidgetController', msWidgetController)
        .directive('msWidget', msWidgetDirective)
        .directive('msWidgetFront', msWidgetFrontDirective)
        .directive('msWidgetBack', msWidgetBackDirective);
};
