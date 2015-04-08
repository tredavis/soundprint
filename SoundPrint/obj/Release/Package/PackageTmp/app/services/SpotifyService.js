SoundPrint.service('SpotifyService', ['$http', '$q', function ($http, $q) {
    var accessToken = null;
    var spotifyDeffered = $q.defer();
    var clientId = '29a63923c6a140628abe971082d38e1a';
    // var redirectUri = 'http://localhost:23790/#/';
     var redirectUri = 'http://soundprint.azurewebsites.net/#/';
    var authUrl = 'https://accounts.spotify.com/authorize?client_id=' + clientId + '&response_type=token' + '&scope=user-library-read' + '&redirect_uri=' + encodeURIComponent(redirectUri);
    var spotifyGetSongs = function (input) {
        var bandArray = [];
        //this is a simple search that will return the artist by revelance
        $http({ url: "https://api.spotify.com/v1/search?q=" + input + "&type=track,artist&market=US" }).success(function (data) {
            //   console.log(data);
            for (var i = 0; i < 10; i++) {
                bandName = data.artists.items[0].name;
                console.log(bandName);
                bandSongs = data.tracks.items[i];
                bandObject = new Object();
                bandObject = {
                    name: bandName,
                    track: bandSongs.name,
                    pop: bandSongs.popularity
                }
                bandArray.push(bandObject);
            }
            spotifyDeffered.resolve(bandArray);

        }).error(function (data) {

        });

        return spotifyDeffered.promise;
    }
    var callSpotify = function (url, data, callback) {
        $http({
            url: url,
            data: data,
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }).success(function (data) {
            callback(data);
            savedTracks();
        }).error(function (data) {
            callback('the call failed');
        });
    }
    ////Used in the last function which contains jQuery
    var currentUserProfile = function (callback) {
        var url = 'https://api.spotify.com/v1/me';
        callSpotify(url, null, callback);
    }
    //Used in the last function which contains jQuery
    var savedTracks = function (callback) {
        var url = 'https://api.spotify.com/v1/me/tracks';
        callSpotify(url, {}, callback);
    }
    ////Calling to spotify API will pass in 3 parameters


    function spotifyAuth() {
        console.log('spotifyAuth');
        document.location = authUrl;
    };



    return {
        spotifyGetSongs: spotifyGetSongs,
        spotifyAuth: spotifyAuth,
        callSpotify: callSpotify,
        currentUserProfile: currentUserProfile
    }
}])