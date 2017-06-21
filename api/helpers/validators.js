'use strict';

module.exports =
{
    isUrl: function(value)
    {
        if(value)
        {
            return value.search(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g) == 0;
        }

        return false;
    },
    isNumber: function(value)
    {
        return !isNaN(value);
    }
}