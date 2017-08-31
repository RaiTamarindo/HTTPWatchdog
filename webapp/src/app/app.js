'use strict';

require('../scss/app.style.scss');

var angular = require('angular'),
    ngAria = require('angular-aria'),
    ngAnimate = require('angular-animate'),
    ngMaterial = require('angular-material'),
    ngSocketIO = require('angular-socket-io'),
    msWidgetDirectives = require('./directives/ms-widget/ms-widget.directives'),
    homeComponent = require('./home/home.component'),
    websiteListComponent = require('./website-list/website-list.component'),
    websiteFormComponent = require('./website-form/website-form.component'),
    websiteDataService = require('./services/website-data.service'),
    socketService = require('./services/socket.service'),
    app = angular.module('httpWatchdogApp', [ngAria, ngAnimate, ngMaterial, 'btford.socket-io']);

msWidgetDirectives(app);

app
    .factory('socketService', socketService)
    .factory('websiteDataService', websiteDataService)
    .component('home', homeComponent)
    .component('websiteList', websiteListComponent)
    .component('websiteForm', websiteFormComponent);