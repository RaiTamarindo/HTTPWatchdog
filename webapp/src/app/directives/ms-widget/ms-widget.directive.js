'use strict';

var msWidgetDirective = function()
{
    return {
        restrict  : 'E',
        scope     : {
            flippable: '=?'
        },
        controller: 'MsWidgetController',
        transclude: true,
        compile   : function (tElement)
        {
            tElement.addClass('ms-widget');

            return function postLink(scope, iElement, iAttrs, MsWidgetCtrl, transcludeFn)
            {
                // Custom transclusion
                transcludeFn(function (clone)
                {
                    iElement.empty();
                    iElement.append(clone);
                });

                //////////
            };
        }
    };
};

module.exports = msWidgetDirective;