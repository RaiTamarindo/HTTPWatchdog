'use strict';

var msWidgetFrontDirective = function()
{
    return {
        restrict  : 'E',
        require   : '^msWidget',
        transclude: true,
        compile   : function (tElement)
        {
            tElement.addClass('ms-widget-front');

            return function postLink(scope, iElement, iAttrs, MsWidgetCtrl, transcludeFn)
            {
                // Custom transclusion
                transcludeFn(function (clone)
                {
                    iElement.empty();
                    iElement.append(clone);
                });

                // Methods
                scope.flipWidget = MsWidgetCtrl.flip;
            };
        }
    };
};

module.exports = msWidgetFrontDirective;