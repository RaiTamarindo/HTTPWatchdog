'use strict';

var websiteEvent = require('./api/events/websiteEvent');

module.exports = function(io)
{
    var factory = {};

    var sendWebsiteCreate = function(createdWebsites)
    {
        console.log('Socket: Sending created websites.');
        io.emit('website-create', createdWebsites);
    };
    
    var sendWebsiteUpdate = function(updatedWebsite)
    {
        console.log('Socket: Sending updated website.');
        io.emit('website-update', updatedWebsite);
    };

    var sendWebsiteDelete = function(removedWebsite)
    {
        console.log('Socket: Sending delete website.');
        io.emit('website-delete', removedWebsite);
    };

    factory.registerListeners = function()
    {
        // TODO Place client listeners here and add to io listeners
    };

    factory.sendWebsiteCreate = sendWebsiteCreate;
    factory.sendWebsiteUpdate = sendWebsiteUpdate;
    factory.sendWebsiteDelete = sendWebsiteDelete;

    websiteEvent.on('website-created', sendWebsiteCreate);
    websiteEvent.on('website-updated', sendWebsiteUpdate);
    websiteEvent.on('website-deleted', sendWebsiteDelete);

    return factory;
};