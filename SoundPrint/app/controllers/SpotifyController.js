SoundPrint.controller('SpotifyController', ['$scope', 'SpotifyService', function ($scope, SpotifyService) {
    $scope.homeGreeting = "This should say hello, if so the Home Controller is working.";
    $scope.spotifyApi = "Let's connect to the spotify API";

    $scope.spotifyButton = function () {
        return SpotifyService.spotifyGetSongs($scope.input).then(function(data) {
            $scope.band = data;

        });
    };
    $scope.spotifyAuth = function () {
        return SpotifyService.finalFunction();
    };
    $scope.spotifyCurrentList = function () {
        return SpotifyService.currentSavedList();
    };


}]);

    