SoundPrint.service('SpotifyService', ['$http', '$q', function ($http, $q) {
    var spotifyDeffered = $q.defer();
    var clientId = '29a63923c6a140628abe971082d38e1a';
    var secretKey = 'e555bcf5cf124fe699ed24898a3b8304';
   // var redirectUri = 'http://localhost:23790/';
    var redirectUri = 'http://soundprint.azurewebsites.net/';
   
    var authUrl = 'https://accounts.spotify.com/authorize?client_id=' + clientId + '&response_type=token&redirect_uri=' + encodeURIComponent(redirectUri);
    var accessToken = 'BQB3TkKbErAYs1ledrRInZKAaeJXVH5etIeZNZTji_FSCyvLL5vFis5Onr-7lNtPUKhgaR51XYhuo5A0KxN1Fe3KfSwCXko-kffXhc1-XQlGE0i5_j58KkorbzEaJNJvSK20xuDdBZ53s3mG';

    var bandArray = [];

    var spotifyGetSongs = function (input) {
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

    var getCurrentUsersPlaylist = function () {
        $http({
            url: 'https://api.spotify.com/v1/tracks?market=ES',
            headers : {
                'Authorization': 'Bearer ' + accessToken
            }
        }).success(function (data) {
            console.log(data);
        }).error(function (data) {
            console.log('the call failed');
        });
    }

    var spotifyAuth = function () {
        var req = {
            method: 'GET',
            url: authUrl
        }
        $http(req).success(function (data, response) {
            console.log(data + response);
        }).error(function (data) {
            console.log(data);
           
        })
        ;
        //request auth from user
        //$http('/login', function (req, res) {
        //    var scopes = 'user-read-private user-read-email user-library-read user-read-email user-read-private user-follow-modify';
        //    res.redirect('https://accounts.spotify.com/authorize' +
        //      '?response_type=code' +
        //      '&client_id=' + clientId +
        //      (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
        //      '&redirect_uri=' + encodeURIComponent(redirectUri));
        //});
        //$http({
        //    url: 'https://api.spotify.com/v1/me',
        //    headers: {
        //        'Authorization': 'Bearer ' + accessToken
        //    },
        //    success: function(response) {

        //    }
        //});
    }


    return {
        spotifyGetSongs: spotifyGetSongs,
        spotifyAuth: spotifyAuth,
        currentSavedList: getCurrentUsersPlaylist
    }
}])