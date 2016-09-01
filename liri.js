var twitter = require('twitter'),
	spotify = require('spotify'),
	request = require('request'),
	inquirer = require('inquirer'),
	fs = require('fs'),
	keys = require('./keys.js');

var client = new twitter(keys.twitterKeys);

var command = process.argv[2];
inquirer.prompt([
		{
			type: 'list',
			name: 'command',
			message: 'Enter a command:',
			choices: [
				'my-tweets', 
				'spotify-this-song', 
				'movie-this', 
				'do-what-it-says'
				]
		}
	]).then(function(answer) {
		switch(answer.command) {
			case 'my-tweets':
				client.get('statuses/user_timeline', function(error, tweets, response) {
				 	if (!error) {
				 		for (var i = 0; i < 20; i++) {
				 			console.log(JSON.stringify(tweets[i].text));
				 		}
					}
				});
				break;
			case 'spotify-this-song':
				inquirer.prompt([
						{
							type: 'input',
							name: 'song',
							message: 'Enter a track.'
						}
					]).then(function(answer) {
						var song = answer.song;
						// var song = process.argv.splice(3).join(' ');
						if (song.length === 0)
							song = 'The Sign';
						spotify.search({ type: 'track', query: song}, function (err, data) {
							if (err) {
								console.log('Error occurred: ' + err);
								return;
							}
							// console.log(JSON.stringify(data, null, 2));
							console.log(data.tracks.items[0].artists[0].name);
						})
						console.log("spotify " + song);
					});
				
				break;
			case 'movie-this':
				inquirer.prompt([
						{
							type: 'input',
							name: 'movie',
							message: 'Enter a movie title.'
						}
					]).then(function(answer) {
						var movie = answer.movie.replace(/ /g, '+');
						// var movie = process.argv.splice(3).join('+');
						request('http://www.omdbapi.com/?t=' + movie, function (error, response, body) {
							if (!error && response.statusCode == 200) {
								console.log(body);
							}
						});
						
					});
				break;
			case 'do-what-it-says':
				console.log("do-what-it-says");
				fs.readFile('random.txt', 'utf8', (err, data) => {
					if (err) throw err;
					var index = data.indexOf('"') + 1;
					var length = data.lastIndexOf('"') - data.indexOf('"')- 1;
					var song = data.substr(index, length);
					spotify.search({ type: 'track', query: song}, function (err, data) {
						if (err) {
							console.log('Error occurred: ' + err);
							return;
						}
						// console.log(JSON.stringify(data, null, 2));
						console.log(data.tracks.items[0].artists[0].name);
					})
					console.log("spotify " + song);
				});
				break;
			default:
				console.log("default");
		}

		fs.appendFile('log.txt', answer.command + '\n',(err) => {
			if (err) throw err;
			console.log("The data was appended.");
		});
	});
