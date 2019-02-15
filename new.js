var express = require('express');
var gplay = require('google-play-scraper');
var searchitunes = require('searchitunes');
var http = require('http'), url = require('url');
var api = express();

	var t = new Array();
	t[0] = "os";
	t[1] = "app_id";
	t[2] = "country";



api.get('/', async function (req, res) {

   var gplay = require('google-play-scraper');
   var query = url.parse(req.url, true).query;
   var sth = JSON.stringify(query, t);
   var som = JSON.parse(sth);
   var temp = {};

   if (som.os == 'OS') {
        temp = await gplay.app({ appId: som.app_id, countryCode: som.country }).catch(function(error){res.write('StatusCode: 500 \n App not found.');});
   }
   if (som.os == 'iOS') {
        temp =   await searchitunes({ id: som.app_id, countryCode: som.country }).catch(function(error){res.write('StatusCode: 500 \n App not found.');});
   }

   res.status(200);
   res.send(temp);
   res.end();

})
api.listen(3333, function () { console.log('Running at port 3333'); });
