//required npm packages for node app
var twitter = require('twitter'),
	spotify = require('spotify'),
	request = require('request'),
	inquirer = require('inquirer'),
	fs = require('fs'),
	keys = require('./keys.js'),
	client = new twitter(keys.twitterKeys);

//Use inquirer to ask user for certain command
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
		liriApp(answer.command);
	});

//Handles logic of app
function liriApp(command, item) {
	switch(command) {
		case 'my-tweets':
			console.log(
			"            (####)\n" + 
			"          (#######)\n" + 
			"        (#########)\n" + 
			"       (#########)\n" + 
			"      (#########)\n" + 
			"     (#########)\n" + 
			"    (#########)       READ\n" + 
			"   (#########)       THE\n" + 
			"  (#########)       TWEETS\n" + 
			"   (o)(o)(##)\n" + 
			" ,_C     (##)\n" + 
			"/___,   (##)\n" + 
			"  \\     (#)\n" + 
			"   |    |\n" + 
			"   OOOOOO\n" + 
			"  /      \\\n"
				);
			//display 20 most recent tweets
			tweetProgram();
			break;
		case 'spotify-this-song':
			console.log(
				"      .sS$$$$$$$$$$$$$$Ss.\n" +
				"     .$$$$$$$$$$$$$$$$$$$$$$s.\n" +
				"     $$$$$$$$$$$$$$$$$$$$$$$$S.\n" +
				"     $$$$$$$$$$$$$$$$$$$$$$$$$$s.\n" +
				"     S$$$$'        `$$$$$$$$$$$$$\n" +
				"     `$$'            `$$$$$$$$$$$.\n" +
				"      :               `$$$$$$$$$$$\n" +
				"     :                 `$$$$$$$$$$\n" +
				"  .====.  ,=====.       $$$$$$$$$$\n" +
				".'      ~'       '.    s$$$$$$$$$$      PICK\n" +
				":       :         :=_  $$$$$$$$$$$      A\n" +
				"`.  ()  :   ()    ' ~=$$$$$$$$$$$'      SONG\n" + 
				"  ~====~`.      .'    $$$$$$$$$$$       NEIGHBOR\n" + 
				"   .'     ~====~     sS$$$$$$$$$'\n" + 
				"   :      .         $$$$$' $$$$\n" + 
				" .sS$$$$$$$$Ss.     `$$'   $$$'\n" + 
				"$$$$$$$$$$$$$$$s         s$$$$\n" + 
				"$SSSSSSSSSSSSSSS$        $$$$$\n" + 
				"     :                   $$$$'\n" + 
				"      `.                 $$$'\n" + 
				"        `.               :\n" + 
				"         :               :\n" + 
				"         :              .'`.\n" + 
				"        .'.           .'   :\n" + 
				"       : .$s.       .'    .'\n" + 
				"       :.S$$$S.   .'    .'\n" + 
				"       : $$$$$$`.'    .'\n" + 
				"          $$$$   `. .'\n" + 
				"                   `");
			//ask for a song to search
			if (typeof item === 'undefined') {
				inquirer.prompt([
					{
						type: 'input',
						name: 'song',
						message: 'Enter a track.'
					}
				]).then(function(answer) {
					var song = answer.song;
					//if no song is given, default to The Sign
					if (song.length === 0)
						song = 'The Sign';
					//display song information from spotify
					spotifyProgram(song);
				});
			} else {
				spotifyProgram(item);
			}
			break;
		case 'movie-this':
			console.log(
						"     ,---.\n" + 
						"   ,.'-.   \\\n" + 
						"  ( ( ,''''''-.\n" + 
						"  `,X          `.\n" + 
						"  /` `           `._      THESE\n" + 
						" (            ,   ,_\\      ASCII\n" + 
						" |          ,---.,'o `.      CHARACTERS\n" + 
						" |         / o   \\     )      WERE\n" + 
						"  \\ ,.    (      .____,      A\n" + 
						"   \\| \\    \\____,'     \\      WASTE\n" + 
						" '`'\\  \\        _,____,'     OF\n" + 
						" \\  ,--      ,-'     \\      TIME\n" + 
						"   ( C     ,'         \\\n" + 
						"    `--'  .'           |\n" + 
						"      |   |         .O |\n" + 
						"    __|    \\        ,-'_\n" + 
						"   / `L     `._  _,'  ' `.\n" + 
						"  /    `--.._  `',.   _\\  `\n" + 
						"  `-.       /\\  | `. ( ,\\  \\\n" + 
						" _/  `-._  /  \\ |--'  (     \\\n" + 
						"'  `-.   `'    \\/\\`.   `.    )\n" + 
						"      \\  -hrr-    \\ `.  |    |"
						);
			//ask for a movie to search
			if(typeof item === 'undefined') {
				inquirer.prompt([
					{
						type: 'input',
						name: 'movie',
						message: 'Enter a movie title.'
					}
				]).then(function(answer) {
					if(answer.movie.length === 0) {
						movie = 'Mr.+Nobody';
					} else {
						var movie = answer.movie.replace(/ /g, '+');
					}
					//Display movie information from omdb database
					omdbProgram(movie);
				});
			} else {
				var movie = item.replace(/ /g, '+');
				omdbProgram(movie);
			}
			break;
		case 'do-what-it-says':
			console.log(
					'  |\\\/\\\/\\\/\\\/\\\/|\n' + 
					'  |          |\n' + 
					'  |          |\n' + 
					'  |          |\n' + 
					'  |    __  __|      NICE\n' + 
					'  |   /  \\/  \\    CHOICE\n' + 
					'  |  (o   )o  )     MAN\n' + 
					' /c   \\__/ --.\n' + 
					' \_   ,     -"\n' + 
					'  |  "\_______)\n' + 
					'  |      _)\n' + 
					'  |     |\n' + 
					' /`-----"\\\n' + 
					'/         \\');
			fs.readFile('random.txt', 'utf8', (err, data) => {
				if (err) throw err;
				var command = data.slice(0, data.indexOf(','));
				var item = data.slice(data.indexOf('"') + 1, data.lastIndexOf('"'));
				console.log(command);
				console.log(item);
				liriApp(command, item);
			});
			break;
		default:
			console.log("default");
	}

	fs.appendFile('log.txt', command + '\n',(err) => {
		if (err) throw err;
	});
}

function tweetProgram() {
	client.get('statuses/user_timeline', function(error, tweets, response) {
	 	if (!error) {
	 		for (var i = 0; i < 20; i++) {
	 			console.log("Date Created: " + JSON.stringify(tweets[i].created_at));
	 			console.log("Tweet: " + JSON.stringify(tweets[i].text));
	 			console.log("---------------------------------------------");
	 		}
		}
	});
}

function spotifyProgram(song) {
	spotify.search({ type: 'track', query: song}, function (err, data) {
		if (err) {
			console.log('Error occurred: ' + err);
			return;
		}
		var info = data.tracks.items[0];
		console.log('Artists name: ' + info.artists[0].name);
		console.log('Song name: ' + info.name);
		console.log('Preview URL: ' + info.preview_url);
		console.log('Album name: ' + info.album.name);
	});
}

function omdbProgram(movie) {
	request('http://www.omdbapi.com/?t=' + movie + '&tomatoes=true&r=json', function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var info = JSON.parse(body);
			console.log('Title: ' + info.Title);
			console.log('Year: ' + info.Year);
			console.log('IMDB Rating: ' + info.imdbRating);
			console.log('Country: ' + info.Country);
			console.log('Plot: ' + info.Plot);
			console.log('Actors: ' + info.Actors);
			console.log('Rotten Tomatoes Rating: ' + info.tomatoRating);
			console.log('Rotten Tomatoes URL: ' + info.tomatoURL);
		}
	});
}