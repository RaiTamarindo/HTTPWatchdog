'use strict';

var websiteModel = require('../models/websiteModel');

module.exports =
{
    list: function(req, res, next)
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

                next();
            });
    },

    create: function(req, res, next)
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

                next();
            });
    },

    read: function(req, res, next)
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

                next();
            });
    },

    update: function(req, res, next)
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

                next();
            });
    },
    
    delete: function(req, res, next)
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
                            //TODO Append deleted id in data
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

                next();
            });
    }
};