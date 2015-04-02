(function finalFunction () {
    function error(msg) {
        info(msg);
    }
    function info(msg) {
        $("#info").text(msg);
    } var currentUserProfile = function (callback) {
        var url = 'https://api.spotify.com/v1/me';
        callSpotify(url, null, callback);
    }
    //Used in the last function which contains jQuery
    var savedTracks = function (callback) {
        var url = 'https://api.spotify.com/v1/me/tracks';
        callSpotify(url, {}, callback);
    }
    function callSpotify(url, data, callback) {
        $.ajax({
            url: url,
            data: data,
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }).success(function (data) {
            console.log(data);
        }).error(function (data) {
            callback('the call failed');
        });
    };
    function parseArgs() {
        console.log('Parse Args');
        var hash = location.hash.replace(/#/g, '');
        var all = hash.split('&');
        var args = {};
        console.log('all' + ' ' + '=' + all)
        _.each(all, function (keyvalue) {
            var kv = keyvalue.split('=');
            var key = kv[0];
            var val = kv[1];
            args[key] = val;
        });
        return args;
    };
    console.log('Final Function');
    var args = parseArgs();
    console.log(args);
    if ('/access_token' in args) {
        accessToken = args['/access_token']; console.log(accessToken);
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
})();