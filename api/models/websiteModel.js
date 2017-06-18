'use strict';

var genericModel = require('genericModel'),
    model = 'websites';

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
        genericModel(model).inser(resources, done)
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