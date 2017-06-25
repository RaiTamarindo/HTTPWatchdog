'use strict';

var websiteEvent = require('../events/websiteEvent');

module.exports =
{
    create: function(req, res, next)
    {
        if(res.locals.createdWebsites)
        {
            websiteEvent.emit('website-created', res.locals.createdWebsites);
        }
        next();
    },

    update: function(req, res, next)
    {
        if(res.locals.updatedWebsite)
        {
            websiteEvent.emit('website-updated', res.locals.updatedWebsite);
        }
        next();
    },

    delete: function(req, res, next)
    {

        if(res.locals.deletedWebsiteId)
        {
            websiteEvent.emit('website-deleted', res.locals.deletedWebsiteId);
        }
        next();
    }
};