'use strict';

angular.module('CheapChat')
  .controller('LoginCtrl', function ($scope, $rootScope, $cookies, $location, API) {
    
    if ($rootScope.loggedIn) {
        $location.path('/');
    }

    $scope.login = function () {
        API.user.login({email: $scope.user.email, password: $scope.user.password}, loginUser);
    };

    $scope.signup = function () {
        if (!$scope.user || !$scope.user.email || !$scope.user.password) {
            return;
        }
        API.user.create({email: $scope.user.email, password: $scope.user.password}, loginUser);
    };

    function loginUser (data) {
        var user = {
            id: data.id,
            email: data.email,
            password: data.password,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt
        };
        $cookies.loggedUser = JSON.stringify(user);
        $rootScope.loggedIn = true;
        $location.path('/');
    }
    
  });
