var SoundPrint = angular.module('SoundPrint', ['ngRoute']);

SoundPrint.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
    $routeProvider.when('/', {
        templateUrl: 'app/views/home.html',
        controller: 'SpotifyController'
    });
}]);