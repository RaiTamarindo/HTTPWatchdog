'use strict';

require('../scss/app.style.scss');

var angular = require('angular'),
    ngAria = require('angular-aria'),
    ngAnimate = require('angular-animate'),
    ngMaterial = require('angular-material'),
    homeComponent = require('./home/home.component'),
    websiteListComponent = require('./website-list/website-list.component'),
    websiteDataService = require('./services/website-data.service');

angular
    .module('httpWatchdogApp', [ngAria, ngAnimate, ngMaterial])
    .factory('websiteDataService', websiteDataService)
    .component('home', homeComponent)
    .component('websiteList', websiteListComponent);