'use strict';

var injectParams = ['$scope', '$element'];

var MsWidgetController = function ($scope, $element)
{
    var vm = this;

    // Data
    vm.flipped = false;

    // Methods
    vm.flip = flip;

    //////////

    /**
     * Flip the widget
     */
    function flip()
    {
        if ( !isFlippable() )
        {
            return;
        }

        // Toggle flipped status
        vm.flipped = !vm.flipped;

        // Toggle the 'flipped' class
        $element.toggleClass('flipped', vm.flipped);
    }

    /**
     * Check if widget is flippable
     *
     * @returns {boolean}
     */
    function isFlippable()
    {
        return (angular.isDefined($scope.flippable) && $scope.flippable === true);
    }
};

MsWidgetController.$inject = injectParams;

module.exports = MsWidgetController;