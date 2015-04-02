SoundPrint.service('SpotifyService', ['$http', '$q', function ($http, $q) {
    var accessToken = null;
    var spotifyDeffered = $q.defer();
    var clientId = '29a63923c6a140628abe971082d38e1a';
    var redirectUri = 'http://localhost:23790/';
    // var redirectUri = 'http://soundprint.azurewebsites.net/';
    var authUrl = 'https://accounts.spotify.com/authorize?client_id=' + clientId + '&response_type=token&redirect_uri=' + encodeURIComponent(redirectUri);
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
        //$http({
        //jQuery
          $.ajax({
            url: url,
            data: data,
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }).success(function (data) {
            callback(data);
        }).error(function (data) {
            callback('the call failed');
        });
    }
    //Used in the last function which contains jQuery
    var currentUserProfile = function (callback) {
        var url = 'https://api.spotify.com/v1/me';
        callSpotify(url, null, callback);
    }
    //Used in the last function which contains jQuery
    var savedTracks = function (callback) {
        var url = 'https://api.spotify.com/v1/me/tracks';
        callSpotify(url, {}, callback);
    }
    //Calling to spotify API will pass in 3 parameters


    var spotifyAuth = function () {
        console.log('spotifyAuth');
        document.location = authUrl;

    }
    // not my code **********************************************************************//

    function parseArgs() {
        console.log('Parse Args');
        var hash = location.hash.replace(/#/g, '');
        var all = hash.split('&');
        var args = {};
        console.log('all' + ' ' + '=' + all )
        _.each(all, function (keyvalue) {
            var kv = keyvalue.split('=');
            var key = kv[0];
            var val = kv[1];
            args[key] = val;
        });
        return args;
    }
    function showTracks(tracks) {
        console.log('Show Tracks');
        var list = $("#item-list");

        console.log('show tracks', tracks);
        if (tracks.offset == 0) {
            $("#main").show();
            $("#intro").hide();
            $("#item-list").empty();
            info("");
        }
        _.each(tracks.items, function (item) {
            var artistName = item.track.artists[0].name;
            var itemElement = $("<div>").text(item.track.name + ' - ' + artistName);
            list.append(itemElement);
        });

        if (tracks.next) {
            callSpotify(tracks.next, {}, function (tracks) {
                showTracks(tracks);
            });
        }
    }
    //angular.element(document).ready(

    var finalFunction = function () {
        console.log('Final Function');
        spotifyAuth();
        var args = parseArgs();
        console.log('Final Function');
        if ('access_token' in args) {
            accessToken = args['access_token'];
            $("#go").hide();
            info('Getting your user profile');
            currentUserProfile(function (user) {
                if (user) {
                    $("#who").text(user.id);
                    info('Getting your saved tracks');
                    savedTracks(function (data) {
                        if (data) {
                            showTracks(data.tracks);
                        } else {
                            error("Trouble getting your saved tracks");
                        }
                    });
                } else {
                    error("Trouble getting the user profile");
                }
            });
        } else {
            $("#go").show();
            $("#go").on('click', function () {
                spotifyAuth();
                console.log('Final Function');
            });
        }
    };



    return {
        spotifyGetSongs: spotifyGetSongs,
        spotifyAuth: spotifyAuth,
        callSpotify: callSpotify,
        finalFunction: finalFunction
    }
}])