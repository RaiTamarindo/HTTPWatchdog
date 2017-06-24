'use strict';

var injectParams = ['$q', '$http'];

var WebsiteDataFactory = function($q, $http)
{
    var factory = {},
        baseUrl = '/rest/websites/';

    var interceptHTTPPromise = function(promise, deferred)
    {
        promise
            .then(function(result)
            {
                if(result.data.data)
                {
                    deferred.resolve(result.data.data);
                }
                else if(result.data.message)
                {
                    deferred.resolve(result.data.message);
                }
                else
                {
                    deferred.resolve();
                }
            }, function(reason)
            {
                if(reason.status !== undefined)
                {
                    var msg = '';
                    switch(reason.status)
                    {
                        case 404:
                            msg = 'Not found.';
                            break;
                        case 500:
                            msg = 'Server error.';
                            break;
                    }
                    if(reason.data)
                    {
                        if(reason.data.message)
                        {
                            msg = msg + ' ' + reason.data.message;
                        }
                    }
                    deferred.reject(msg);
                }
                else
                {
                    deferred.reject('Please, verify your connection.');
                }
            });
    };

    factory.list = function()
    {
        var deferred = $q.defer();

        interceptHTTPPromise($http.get(baseUrl), deferred);

        return deferred.promise;
    };

    factory.read = function(id)
    {
        var deferred = $q.defer();

        interceptHTTPPromise($http.get(baseUrl + '/' + id.toString()), deferred);

        return deferred.promise;
    };

    factory.create = function(website)
    {
        var deferred = $q.defer();

        interceptHTTPPromise($http.post(baseUrl, website), deferred);

        return deferred.promise;
    };

    factory.update = function(website)
    {
        var deferred = $q.defer();

        interceptHTTPPromise($http.put(baseUrl + website._id.toString(), website), deferred);

        return deferred.promise;
    };

    factory.delete = function(website)
    {
        var deferred = $q.defer();

        interceptHTTPPromise($http.delete(baseUrl + website._id.toString()), deferred);

        return deferred.promise;
    };

    return factory;
};

WebsiteDataFactory.$inject = injectParams;

module.exports = WebsiteDataFactory;