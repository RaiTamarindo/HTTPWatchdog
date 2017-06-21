'use strict';

var genericModel = require('./genericModel.js'),
    util = require('util'),
    model = 'websites';

function prepareToInsert(website)
{
    website.successfulResponses = 0;
    website.fastResponses = 0;
    website.totalRequests = 0;
}

module.exports =
{
    findAll: function(done)
    {
        genericModel(model).findAll(done);
    },

    findById: function(id, done)
    {
        genericModel(model).findById(id, done)
    },

    insert: function(resources, done)
    {
        if(util.isArray(resources))
        {
            for(var i = 0;i < resources.length;i++)
            {
                prepareToInsert(resources[i]);
            }
        }
        else if(util.isObject(resources))
        {
            prepareToInsert(resources);
        }
        genericModel(model).insert(resources, done)
    },

    modify: function(id, resource, done)
    {
        genericModel(model).modify(id, resource, done)
    },

    remove: function(id, resource, done)
    {
        genericModel(model).remove(id, resource, done)
    }
};