'use strict';

var db = require('../db.js'),
    ObjectID = require('mongodb').ObjectID;

module.exports = function(model)
{
    var genericModel = {};

    genericModel.findAll = function(done)
    {
        db.connect(function(err)
        {
            if(!err)
            {
                var collection = db.get().collection(model);

                collection.find({}).toArray(done);
            }
        });
    };

    genericModel.findById = function(id, done)
    {
        db.connect(function(err)
        {
            if(!err)
            {
                var collection = db.get().collection(model);

                collection.findOne({"_id": ObjectID(id)}, done);
            }
        });
    };

    genericModel.insert = function(resources, done)
    {
        db.connect(function(err)
        {
            if(!err)
            {
                var collection = db.get().collection(model);

                collection.insert(resources, done);
            }
        });
    };

    genericModel.modify = function(id, resource, done)
    {
        db.connect(function(err)
        {
            if(!err)
            {
                var collection = db.get().collection(model);

                delete resource._id;
                collection.findOneAndUpdate({"_id": ObjectID(id)}, {$set: resource}, done);
            }
        });
    };

    genericModel.remove = function(id, resource, done)
    {
        db.connect(function(err)
        {
            if(!err)
            {
                var collection = db.get().collection(model);

                collection.findOneAndDelete({"_id": ObjectID(id)}, done);
            }
        });
    };

    return genericModel;
};