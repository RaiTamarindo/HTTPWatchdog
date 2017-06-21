'use strict';

var injectParams = ['websiteDataService'];

var WebsiteListController = function(websiteDataService)
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
};

WebsiteListController.$inject = injectParams;

module.exports = WebsiteListController;