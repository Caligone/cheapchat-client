'use strict';

angular.module('CheapChat').
service('API', function ($resource) {
    var url = io.sails.url;

    this.user = $resource(url + '/user/:id', { id: '@_id' },
    {
        'getOne': { method: 'GET' },
        'login':  { method: 'POST',
                    url: url + '/user/login' },
        'create': { method: 'POST' },
        'update': { method: 'PUT' },
        'delete': { method: 'DELETE' },
        'getGravatarURL': { method: 'GET',
                    url: url + '/user/:id/gravatar' }
    });

    this.message = $resource(url + '/message/:id', { id: '@_id' },
    {
        'getOne': { method: 'GET' },
        'create': { method: 'POST' },
        'update': { method: 'PUT' }
    });
}).factory('Socket', function (socketFactory) {
    var socket = io.connect(io.sails.url);
    return socketFactory({ioSocket: socket});
});;