require("dotenv").config();
const keys = require("keys.js");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");

// "concert-this", "movie-this", "spotify-this-song", "do-what-it-says"
var command = process.argv[2];
var query;
if (process.argv[3]) {
    query = process.argv.slice(3).join(" ");
}

// ///////////////////////////////////////////////////////////////////////////////////////
// BANDS IN TOWN
var bandsapikey = keys.bandsintown.apikey;

var bandsCmd = function() {
    if (typeof query === "undefined") {
        query = "Foo Fighters";
    }

    var bandsITURL = "https://rest.bandsintown.com/artists/" + query + "/events?app_id=" + bandsapikey;

    var venueArray = [];
    var locArray = [];
    var dateArray = [];

    axios.get(bandsITURL)
        .then(function(response) {
            for (var i = 0; i < (response.data).length; i++) {
                if (response.data[i].venue.region) {
                    var tempLoc = response.data[i].venue.city + ", " + response.data[i].venue.region;
                } else {
                    var tempLoc = response.data[i].venue.city + ", " + response.data[i].venue.country;
                }
                venueArray.push(response.data[i].venue.name);
                
                locArray.push(tempLoc);
                dateArray.push(moment(response.data[i].datetime).format("MM/DD/YYYY"));
            }
            for (var i = 0; i < venueArray.length; i++) {
                console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
                console.log("Venue: " + venueArray[i]);
                console.log("Location: " + locArray[i]);
                console.log("Date: " + dateArray[i]);
                console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
            }
        })
        .catch(function(error) {
            console.log(error);
        });
}

// ///////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////////////////
// OMDB
var OMDBapikey = keys.OMDB.apikey;

var omdbCmd = function() {
    if (typeof query === "undefined") {
        query = "Mr. Nobody";
    }
    
    var OMDBurl = "http://www.omdbapi.com/?apikey="+ OMDBapikey + "&type=movie&t=" + query;
    
    axios.get(OMDBurl)
    .then(function(response) {
        console.log("Title: " + response.data.Title);
        console.log("Release Year: " + response.data.Year);
        console.log("IMDB Rating: " + response.data.Ratings[0].Value);
        console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
        console.log("Country of Production: " + response.data.Country);
        console.log("Language: " + response.data.Language);
        console.log("Plot: " + response.data.Plot);
        console.log("Actors: " + response.data.Actors);
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

var spotifyCmd = function() {
    if (typeof query === "undefined") {
        query = "The Sign Ace of Base";
    }

    // type can be "artist", "album", "track"
    spotify.search({type: "track", limit: 1, query: query}, function(err, data) {
        if (err) {
            return console.log("Error occurred: " + err);
        }
        console.log("~~~~~~~~~~~~~~~");
        console.log("~~~~~~~~~~~~~~~");
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

// ///////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////////////////
// DO WHAT IT SAYS

var randomCmd = function() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
        }
        command = (data.split(","))[0];
        query = (data.split(","))[1];

        if (command === "concert-this") {
            bandsCmd();
        }
    
        if (command === "movie-this") {
            omdbCmd();
        }
    
        if (command === "spotify-this-song") {
            spotifyCmd();
        }
    });
}

// ///////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////////////////
if (command === "concert-this") {
    bandsCmd();
}

if (command === "movie-this") {
    omdbCmd();
}

if (command === "spotify-this-song") {
    spotifyCmd();
}

if (command === "do-what-it-says") {
    randomCmd();
}