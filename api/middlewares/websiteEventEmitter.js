'use strict';

module.exports =
{
    create: function(req, res, next)
    {
        // TODO: Verify res content to find last created resources and trigger website-created event
        next();
    },

    update: function(req, res, next)
    {
        // TODO: Verify res content to find last updated resources and trigger website-updated event
        next();
    },

    delete: function(req, res, next)
    {
        // TODO: Verify res content to find last deleted website and trigger website-deleted event
        next();
    }
}