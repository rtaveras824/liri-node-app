var twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
var keys = require('./keys.js');
console.log(keys);

var client = new twitter(keys.twitterKeys);

var command = process.argv[2];

switch(command) {
	case 'my-tweets':
		console.log("tweets");
		client.get('statuses/user_timeline', function(error, tweets, response) {
		 	if (!error) {
				console.log(JSON.stringify(tweets[0].text));
			}
		});
		break;
	case 'spotify-this-song':
		var song = process.argv.splice(3).join(' ');
		spotify.search({ type: 'track', query: song}, function (err, data) {
			if (err) {
				console.log('Error occurred: ' + err);
				return;
			}
			// console.log(JSON.stringify(data, null, 2));
			console.log(data.tracks.items[0].artists[0].name);
		})
		console.log("spotify " + song);
		break;
	case 'movie-this':
		var movie = process.argv.splice(3).join('+');
		console.log("movie");
		request('http://www.omdbapi.com/?t=' + movie, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				console.log(body);
			}
		});
		break;
	case 'do-what-it-says':
		console.log("do-what-it-says");
		break;
	default:
		console.log("default");
}