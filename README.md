# LIRI Node App
## How to Use

This is a Node app that runs in the command line. You can search for movie details with the OMDB API, search for song details with the Spotify API, or look for upcoming concerts for a particular band with the Bands in Town API.

Use the list of commands below, replacing the placeholders with your query.

## Commands
`spotify-this-song <song name>`
    * This command retrieves information about a given song
    * If no song is provided, the song "The Sign" by Ace of Base is used

`movie-this <movie name>`
    * This command retrieves information about a given movie
    * If no movie is given, the movie "Mr Nobody" is used

`concert-this <band name>`
    * This command retrieves upcoming concerts for a given band
    * If no band is given, the band Foo Fighters is used

`do-what-it-says`
    * This command reads the file "random.txt" and performs the command in that file
