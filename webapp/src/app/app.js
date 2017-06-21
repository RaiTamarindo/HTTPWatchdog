'use strict';

var angular = require('angular'),
    ngAria = require('angular-aria'),
    ngAnimate = require('angular-animate'),
    ngMaterial = require('angular-material'),
    homeComponent = require('./home/home.component');

angular
    .module('httpWatchdogApp', [ngAria, ngAnimate, ngMaterial])
    .component('home', homeComponent);