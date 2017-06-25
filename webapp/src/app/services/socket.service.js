'use strict';

var io = require('socket.io-client/dist/socket.io');

var injectParams = ['socketFactory'];

var SocketService = function(socketFactory)
{
    return socketFactory(
    {
        ioSocket: io()
    });
};

SocketService.$inject = injectParams;

module.exports = SocketService;