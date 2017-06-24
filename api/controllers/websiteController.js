'use strict';

var websiteModel = require('../models/websiteModel.js');

module.exports =
{
    list: function(req, res)
    {
        websiteModel
            .findAll(function(err, websites)
            {
                if(!err)
                {
                    res.status(200)
                        .json(
                        {
                            data: websites
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

    create: function(req, res)
    {
        var website = req.body;
        websiteModel
            .insert(website, function(err, result)
            {
                if(!err)
                {
                    res.status(201)
                        .json(
                        {
                            message: 'Website created!',
                            data: result.ops
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
        var id = req.params.id;
        websiteModel
            .findById(id, function(err, website)
            {
                if(!err)
                {
                    if(website)
                    {
                        res.status(200)
                            .json(
                            {
                                data: website
                            });
                    }
                    else
                    {
                        res.status(404)
                            .json(
                            {
                                message: 'Website not found'
                            });
                    }
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

    update: function(req, res)
    {
        var id = req.params.id;
        var website = req.body;
        websiteModel
            .modify(id, website, function(err, result)
            {
                if(!err)
                {
                    res.status(200)
                        .json(
                        {
                            message: 'Website updated!',
                            data: result.ops
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
    
    delete: function(req, res)
    {
        var id = req.params.id;
        websiteModel
            .remove(id, function(err)
            {
                if(!err)
                {
                    res.status(200)
                        .json(
                        {
                            message: 'Website removed!'
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
    }
};