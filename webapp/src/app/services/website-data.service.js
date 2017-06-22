'use strict';

var injectParams = ['$q', '$http'];

var WebsiteDataFactory = function($q, $http)
{
    var factory = {},
        baseUrl = '/rest/websites';

    var interceptHTTPPromise = function(promise, deferred)
    {
        promise
            .then(function(result)
            {
                deferred.resolve(result.data.data);
            }, function(reason)
            {
                deferred.reject(reason);
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

        interceptHTTPPromise($http.put(baseUrl + website.id.toString(), website), deferred);

        return deferred.promise;
    };

    factory.delete = function(id)
    {
        var deferred = $q.defer();

        interceptHTTPPromise($http.delete(baseUrl + id.toString()), deferred);

        return deferred.promise;
    };

    return factory;
};

WebsiteDataFactory.$inject = injectParams;

module.exports = WebsiteDataFactory;