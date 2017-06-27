'use strict';

var websiteFormComponent = require('../website-form/website-form.component');

var injectParams = ['$mdDialog', '$mdToast', '$document','websiteDataService'];

var WebsiteListController = function($mdDialog, $mdToast, $document, websiteDataService)
{
    const RESPONSE_TIME_BUFFER_SIZE = 25;
    var vm  = this;

    vm.websites = [];
    
    var computeSLI = function(website)
    {
        if(website.successfulResponses !== undefined && website.totalRequests)
        {
            website.successfulResponsesSLI = Math.round(website.successfulResponses * 1000 / website.totalRequests) / 10;
        }

        if(website.fastResponses !== undefined && website.totalRequests)
        {
            website.fastResponsesSLI = Math.round(website.fastResponses * 1000 / website.totalRequests) / 10
        }
    }

    var updateWebsite = function(website)
    {
        computeSLI(website);
    };

    var addWebsite = function(website)
    {
        updateWebsite(website);
        vm.websites.unshift(website);
    };

    var onCreate = function(websites)
    {
        for(var i = 0;i < websites.length;i++)
        {
            var websiteExists = false;
            for(var j = 0;j < vm.websites.length;j++)
            {
                if(websites[i]._id == vm.websites[j]._id)
                {
                    websiteExists = true;
                    break;
                }
            }
            if(!websiteExists)
            {
                addWebsite(websites[i]);
            }
        }
    };

    var onUpdate = function(website)
    {
        for(var i = 0;i < vm.websites.length;i++)
        {
            if(website._id == vm.websites[i]._id)
            {
                vm.websites[i].url = website.url;
                vm.websites[i].successfulResponses = website.successfulResponses;
                vm.websites[i].successfulResponsesSLO = website.successfulResponsesSLO;
                vm.websites[i].fastResponses = website.fastResponses;
                vm.websites[i].fastResponsesSLO = website.fastResponsesSLO;
                vm.websites[i].totalRequests = website.totalRequests;
                vm.websites[i].lastResponseDate = website.lastResponseDate;
                vm.websites[i].lastResponseTime = website.lastResponseTime;
                vm.websites[i].lastStatusCode = website.lastStatusCode;
                updateWebsite(vm.websites[i]);
                break;
            }
        }
    };

    var onDelete = function(website)
    {
        for(var i = 0;i < vm.websites.length;i++)
        {
            if(website._id == vm.websites[i]._id)
            {
                vm.websites.splice(i, 1);
                break;
            }
        }
    };

    vm.$onInit = function()
    {
        websiteDataService.list()
            .then(function(websites)
            {
                websites.forEach(addWebsite);

                websiteDataService.addCreateListener(onCreate);
                websiteDataService.addUpdateListener(onUpdate);
                websiteDataService.addDeleteListener(onDelete);
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
                    $scope.website = angular.copy(website);

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