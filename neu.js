var http = require('http'), url = require('url');
var gplay = require('google-play-scraper');
const searchitunes = require('searchitunes');
	var t = new Array();
	t[0]="os";
	t[1]="app_id";
	t[2]="country[]";
	
http.createServer(function (req, res) {
	var query = url.parse(req.url,true).query;
	var sth = JSON.stringify(query,t);
	var som = JSON.parse(sth);
	if(som.os=='Android'){console.log('androooooooo');
		gplay.app({appId : som.app_id }).then(res.write,res.write);
	}
	else if(som.os=='Apple'){console.log('appleeeee');
		searchitunes({id:som.app_id}).then(console.log);
	}
	//console.log(som);
	//res.write(som);
	res.end(sth);
}).listen(3333);











//gplay.list({category: gplay.category.GAME_ACTION, collection: gplay.collection.TOP_FREE, num:2}).then(console.log,console.log);


	//console.log(sth.t[0]);
console.log("Server running at http://localhost:3333/");

