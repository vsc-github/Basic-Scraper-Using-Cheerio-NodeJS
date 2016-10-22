var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

var url = 'http://www.imdb.com/title/tt1229340/';

request(url, function(error,response,html){
	if(!error)
	{
		var $ = cheerio.load(html);

		var title, year, rating;
		var json = {title:"",release:"",rating:""}

		$('.title_wrapper').filter(function(){

			var data = $(this);
			title = data.children().first().text();
			json.title = title;
		});
		$('#titleYear a').filter(function(){

			var data = $(this);
			release = data.text();
			json.release = release;
		});
		$('.ratingValue').filter(function(){

			var data = $(this);
			rating = data.children().children().text();
			json.rating = rating;
		});

		fs.writeFile('output.json', JSON.stringify(json,null,4),function(err){
			console.log('File successfully written! - Check your project directory for the output.json file!');
		});
	}
});

console.log('Starting...');