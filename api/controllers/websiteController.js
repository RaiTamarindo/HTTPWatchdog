'use strict';

var websiteModel = require('../models/websiteModel.js');

module.exports =
{
    list: function(req, res)
    {
        
    },

    create: function(req, res)
    {
        var website = req.body;
        websiteModel.insert(website, function(err)
        {
            if(!err)
            {
                res.status(201)
                    .json(
                    {
                        message: 'Website created!'
                    });
            }
            else
            {
                res.status(500)
                    .json(
                    {
                        message: err
                    });
            }
        });
    },

    read: function(req, res)
    {

    },

    update: function(req, res)
    {

    },
    
    delete: function(req, res)
    {
        
    }
};