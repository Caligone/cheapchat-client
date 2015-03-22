'use strict';

angular.module('CheapChat')
  .controller('RoomCtrl', function ($scope, $location, $rootScope, Socket, $cookies, API) {
    $scope.messages = [];
    $scope.myMessage;

    if (!$rootScope.loggedIn) {
        $location.path('/');
    }

    Socket.emit('/message/room');

    Socket.on('message', function (data) {
        $scope.messages.unshift(data);
        if ($scope.messages.length > 10) {
            $scope.messages.splice(10, $scope.messages.length - 10);
        }
    });

    $scope.send = function () {
        if (!$scope.myMessage) {
            return;
        }
        API.message.create({content: $scope.myMessage, id_user: $rootScope.loggedUser.id}, function (data) {
            $scope.myMessage = '';
        });
    };
  });
