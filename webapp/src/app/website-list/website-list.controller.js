'use strict';

var injectParams = ['$mdToast','websiteDataService'];

var WebsiteListController = function($mdToast, websiteDataService)
{
    var vm  = this;

    var addWebsite = function(website)
    {
        if(website.successfulResponses !== undefined && website.totalRequests)
        {
            website.successfulResponsesSLI = Math.round(website.successfulResponses * 1000 / website.totalRequests) / 10;
        }
        if(website.fastResponses !== undefined && website.totalRequests)
        {
            website.fastResponsesSLI = Math.round(website.fastResponses * 1000 / website.totalRequests) / 10
        }
        vm.websites.unshift(website);
    };

    vm.websites = [];

    vm.$onInit = function()
    {
        websiteDataService.list()
            .then(function(websites)
            {
                websites.forEach(addWebsite);
            });
    };

    vm.addWebsite = function(website)
    {
        vm.websites.unshift(website);
    };

    vm.getSuccessfulResponsesSLI = function(website)
    {
        if(website.successfulResponsesSLI !== undefined)
        {
            return website.successfulResponsesSLI.toString() + '%';
        }

        return '--';
    };

    vm.getFastResponsesSLI = function(website)
    {
        if(website.fastResponsesSLI !== undefined)
        {
            return website.fastResponsesSLI.toString() + '%';
        }

        return '--';
    };

    vm.isSuccessfulSLIOK = function(website)
    {
        if(website.successfulResponsesSLI !== undefined)
        {
            return website.successfulResponsesSLI >= website.successfulResponsesSLO;
        }

        return false;
    };

    vm.isFastSLIOK = function(website)
    {
        if(website.fastResponsesSLI !== undefined)
        {
            return website.fastResponsesSLI >= website.fastResponsesSLO;
        }

        return false;
    };

    vm.addWebsite = function(website)
    {
        websiteDataService.create(website)
            .then(function(websites)
            {
                var website = websites[0];
                addWebsite(website);
                $mdToast.show($mdToast.simple().textContent('Website url added!'));
            });
    };

    vm.editWebsite = function(website)
    {
        //TODO
    };

    vm.removeWebsite = function(website)
    {
        //TODO
    };
};

WebsiteListController.$inject = injectParams;

module.exports = WebsiteListController;