require("dotenv").config();
const keys = require("keys.js");
// console.log(keys);
var command = process.argv[2];

// BANDS IN TOWN
var bandsapikey = keys.bandsintown.apikey;
// var bandsIT = <query url goes here>;

// OMDB
var OMDBapikey = keys.OMDB.apikey;
var OMDBurl = "http://www.omdbapi.com/?apikey="+ OMDBapikey + "&";


// SPOTIFY
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

if (command === "spotify-this-song") {
    var song = process.argv[3];
    // type can be "artist", "album", "track"
    spotify.search({type: "track", limit: 1, query: song}, function(err, data) {
        if (err) {
            return console.log("Error occurred: " + err);
        }
        console.log("~~~~~~~~~~~~~~~");
        console.log("~~~~~~~~~~~~~~~");
        // console.log(data.tracks.items[0]);
        var spotifyShortCut = data.tracks.items[0];
        console.log("Artists: " + "\n" + spotifyShortCut.artists[0].name);
        console.log("Song Name: " + "\n" + spotifyShortCut.name);
        console.log("Album: " + "\n" + spotifyShortCut.album.name);
        if (spotifyShortCut.preview_url) {
            console.log("Song link: " + "\n" + spotifyShortCut.preview_url);
        } else {
            console.log("Song link is null");
        }
        console.log("~~~~~~~~~~~~~~~");
        console.log("~~~~~~~~~~~~~~~");
    });
}