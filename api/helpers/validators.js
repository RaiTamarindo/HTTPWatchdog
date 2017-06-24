'use strict';

module.exports =
{
    isUrl: function(value)
    {
        if(value)
        {
            return value.search(/(http|https):\/\/[\w-]+(\.[\w-]+)*([\w.,@?^=%&amp;:/~+#-]*[\w@?^=%&amp;/~+#-])?/g) == 0;
        }

        return false;
    },
    isNumber: function(value)
    {
        return !isNaN(value);
    }
}