'use strict';

var injectParams = ['$mdToast','websiteDataService'];

var WebsiteListController = function($mdToast, websiteDataService)
{
    var vm  = this;

    vm.websites = [];

    vm.$onInit = function()
    {
        websiteDataService.list()
            .then(function(websites)
            {
                vm.websites = websites;
            });
    };

    vm.getSuccessfulResponsesSLI = function(website)
    {
        return Math.round(website.successfulResponses * 1000 / website.totalRequests) / 10;
    };

    vm.getFastResponsesSLI = function(website)
    {
        return Math.round(website.fastResponses * 100 / website.totalRequests) / 10;
    };

    vm.addWebsite = function(website)
    {
        websiteDataService.create(website)
            .then(function(websites)
            {
                var website = websites[0];
                vm.websites.unshift(website);
                $mdToast.show($mdToast.simple().textContent('Website url added!'));
            });
    };
};

WebsiteListController.$inject = injectParams;

module.exports = WebsiteListController;