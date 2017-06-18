'use strict';

var mongoClient = require('mongodb').MongoClient;

var state =
{
    db: null
};
var url = 'mongodb://localhost:27017/http-watchdog';
var connect = function(done)
{
    if(state.db)
    {
        return done();
    }
    else
    {
        mongoClient.connect(url, function(err, db)
        {
            if(err)
            {
                done(err);
            }
            else
            {
                state.db = db;
                return done();
            }
        });
    }
};
var close = function(done)
{
    if(state.db)
    {
        state.db
            .close(function(err, result)
            {
                state.db = null;
                done(err);
            });
    }
};

module.exports =
{
    connect: connect,

    close: close,

    get: function()
    {
        return connect(function(err)
        {
            return state.db;
        });
    }
};