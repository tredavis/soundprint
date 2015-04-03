SoundPrint.controller('SpotifyController', ['$scope', 'SpotifyService', function ($scope, SpotifyService) {
    $scope.homeGreeting = "This should say hello, if so the Home Controller is working.";
    $scope.spotifyApi = "Login with Spotify and view your saved tracks!";

    $scope.spotifyButton = function () {
        return SpotifyService.spotifyGetSongs($scope.input).then(function(data) {
            $scope.band = data;

        });
    };
    $scope.spotifyAuth = function () {
        return SpotifyService.spotifyAuth();
    };
    $scope.currentUserProfile = function () {
        return SpotifyService.currentUserProfile();
    };


}]);

    