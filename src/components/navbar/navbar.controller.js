'use strict';

angular.module('CheapChat')
  .controller('NavbarCtrl', function ($rootScope, $scope, $location, $cookies) {

    if ($cookies.loggedUser) {
        $rootScope.loggedUser = JSON.parse($cookies.loggedUser);
        $rootScope.loggedIn = true;
    }
    else {
        $rootScope.loggedIn = false;
    }

    $scope.logout = function () {
        $cookies.loggedUser = false;
        $rootScope.loggedIn = false;
        $location.path('/');
    };
  });
