'use strict';

var injectParams = ['$mdToast','websiteDataService'];

var WebsiteFormController = function($mdToast, websiteDataService)
{
    var vm  = this;

    vm.website = {};

    vm.save = function()
    {
        if(vm.website._id)
        {
            websiteDataService.update(vm.website)
                .then(function()
                {
                    vm.onSave()(vm.website);
                    $mdToast.show($mdToast.simple().textContent('Website url updated!'));
                }, function(reason)
                {
                    $mdToast.show($mdToast.simple().textContent('Error to update website. ' + reason));
                });
        }
        else
        {
            websiteDataService.create(vm.website)
                .then(function(websites)
                {
                    vm.onSave()(websites[0]);
                    $mdToast.show($mdToast.simple().textContent('Website url added!'));
                }, function(reason)
                {
                    $mdToast.show($mdToast.simple().textContent('Error to add website. ' + reason));
                });
        }
    };
};

WebsiteFormController.$inject = injectParams;

module.exports = WebsiteFormController;