require("dotenv").config();
const keys = require("keys.js");
// console.log(keys);
var axios = require("axios");
var command = process.argv[2];

// ///////////////////////////////////////////////////////////////////////////////////////
// BANDS IN TOWN
var bandsapikey = keys.bandsintown.apikey;

if (command === "concert-this") {
    var artistname = process.argv[3];
    var bandsITURL = "https://rest.bandsintown.com/artists/" + artistname + "/events?app_id=" + bandsapikey;

    var venueArray = [];
    var locArray = [];
    var dateArray = [];

    axios.get(bandsITURL)
        .then(function(response) {
            for (var i = 0; i < (response.data).length; i++) {
                // name of venue, venue location, date of event as MM/DD/YYYY
                // console.log(response.data);
                venueArray.push(response.data[i].venue.name);
                locArray.push(response.data[i].venue.city + ", " + response.data[i].venue.region);
                dateArray.push(response.data[i].datetime);
            }
            console.log(venueArray);
            console.log(locArray);
            console.log(dateArray);
        })
        .catch(function(error) {
            console.log(error);
        });
}

// ///////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////////////////
// OMDB
var OMDBapikey = keys.OMDB.apikey;

if (command === "movie-this") {
    var movieQuery = process.argv[3];
    var OMDBurl = "http://www.omdbapi.com/?apikey="+ OMDBapikey + "&type=movie&t=" + movieQuery;
    
    axios.get(OMDBurl)
    .then(function(response) {
        console.log(response.data);
    })
    .catch(function(error) {
        console.log(error);
    });
}

// ///////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////////////////
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