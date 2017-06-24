'use strict';

var websiteFormComponent = require('../website-form/website-form.component');

var injectParams = ['$mdDialog', '$mdToast', '$document','websiteDataService'];

var WebsiteListController = function($mdDialog, $mdToast, $document, websiteDataService)
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

    vm.editWebsite = function(website, $event)
    {
        $mdDialog
            .show(
            {
                controller: ['$scope', '$mdDialog', 'website', function($scope, $mdDialog, website)
                {
                    $scope.website = website;

                    $scope.saved = function(website)
                    {
                        $mdDialog.hide();
                    };

                    $scope.cancelled = function()
                    {
                        $mdDialog.hide();
                    };
                }],
                template: '<website-form website="website" on-save="saved" on-cancel="cancelled"></website-form>',
                parent: $document.body,
                targetEvent: $event,
                clickOutsideToClose: true,
                locals:
                {
                    website: website
                }
            });
    };

    vm.addWebsite = addWebsite;

    vm.removeWebsite = function(website, $event)
    {
        var confirm = $mdDialog.confirm()
            .title('Would you like to delete this website URL?')
            .textContent('All measurement data will be lost.')
            .ariaLabel('Remove website')
            .targetEvent($event)
            .clickOutsideToClose(true)
            .parent($document.body)
            .ok('Yes')
            .cancel('No');
            
        $mdDialog.show(confirm)
            .then(function()
            {
                websiteDataService.delete(website)
                    .then(function()
                    {
                        for(var i = 0;i < vm.websites.length;i++)
                        {
                            if(website._id == vm.websites[i]._id)
                            {
                                vm.websites.splice(i, 1);
                                break;
                            }
                        }
                        $mdToast.show($mdToast.simple().textContent('Website url removed!'));
                    });
            }, function()
            {
                $mdDialog.hide();
            });
    };

    vm.resetMeasurements = function(website)
    {
        website.successfulResponses = 0;
        website.fastResponses = 0;
        website.totalRequests = 0;
        delete website.successfulResponsesSLI;
        delete website.fastResponsesSLI;
        delete website.lastResponseDate;
        delete website.lastResponseTime;
        delete website.lastStatusCode;

        websiteDataService.update(website)
            .then(function()
            {
                $mdToast.show($mdToast.simple().textContent('Website url reseted!'));
            });
    };
};

WebsiteListController.$inject = injectParams;

module.exports = WebsiteListController;