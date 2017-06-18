'use strict';

var db = require('../db'),
    ObjectID = require('mongodb').ObjectID;

module.exports = function(model)
{
    var genericModel = {};

    genericModel.findAll = function(done)
    {
        var collection = db.get().collection(model);

        collection.find({}).toArray(done);
    };

    genericModel.findById = function(id, done)
    {
        var collection = db.get().collection(model);

        connection.findOne({"_id": ObjectID(id)}, done);
    };

    genericModel.insert = function(resources, done)
    {
        var collection = db.get().collection(model);

        collection.insert(resources, done);
    };

    genericModel.modify = function(id, resource, done)
    {
        var collection = db.get().collection(model);

        delete resource._id;
        collection.findOneAndUpdate({"_id": ObjectID(id)}, {$set: resource}, done);
    };

    genericModel.remove = function(id, resource, done)
    {
        var collection = db.get().collection(model);

        collection.findOneAndDelete({"_id": ObjectID(id)}, done);
    };

    return genericModel;
};