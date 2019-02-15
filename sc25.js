var express = require('express');
var bodyParser = require('body-parser');
var crypto = require('crypto');
var express = require('express');
var bodyParser = require('body-parser');
var sessions = require('express-session');
var crypto = require('crypto');
var session;
var app=express();
var parola;
var kullanici;
var rel;

var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "egemen",
  password: "egemen",
  database: "mydb"
});


/**
con.connect(function(err) {
	console.log('DataBase');
  if (err) throw err;//CREATE TABLE USERS (id INT AUTO_INCREMENT PRIMARY KEY ,name VARCHAR(255), pass VARCHAR(255),last_login TIME) 
 });

 //buradan gelen name ve pass değerlerinin parçalanıp içlerinden pass ve name in kendisini çekmemiz gerekiyor ardından name i aşağıda kullanıcaz
   //ayrıca kodu session ekinden kurtarıp req.body modeline döndürüp pass sorgulamasını da aktif hale getirmen lazım olmadı 16dk lık videoyu tekrar izleyerek baştan yaz
  
tüm yourmları bitirdikten sonra time olayına odaklan db içerisinde zaten insanların time kısmı var 
*/

function hashCode(parola){return crypto.createHash('md5').update(parola).digest("hex");}
function karsilastirma(eldeki,gelen){
	if(eldeki == gelen){return 1;}
	else{return 0;}
}
function parcala(girdi){
	var iltT = girdi.indexOf("'");
	var sonT = girdi.lastIndexOf("'");
	var son = girdi.splice(ilkT,sonT);
	return son;
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(sessions({secret: 'dsafasdfasdfASFas',resave: false, saveUninitialized: true }));

app.get('/login',function(req,resp){
	console.log('getLogin');
	session = req.session;
	if(session.uniqueID){resp.redirect('/redirects');} 
	resp.sendFile('./log.html',{root: __dirname });
});


app.post('/login',function(req,resp){
	console.log('postLogin');
	if(session.uniqueID){resp.redirect('/redirects');}
	session.uniqueID = req.body.username;
	resp.redirect('/redirects');
});


//resp.end(JSON.stringify(req.body));
//req.body.pass girdisi md5'e göre göre yapacaksın ve db^dekiyle karşılaştıracaksın
//if(req.body.username=='egemen'&& req.body.password == 'egemen'){session.uniqueID = req.body.username;}
//session.password = req.body.password;
app.get('/logout',function(req,resp){
	console.log('getLogout');
	req.session.destroy(function(error){
		console.log(error);
		resp.redirect('/login');
	})
});

app.get('/admin',function(req,res){
	console.log('getAdmin');
	session = req.session;
	if(session.uniqueID != 'egemen'){res.send('Unauthorized access!!!!');}
	else {res.send('YOU ARE THE GOD <a href="/logout">KILL SESSION</a>');}

});


app.get('/redirects',function(req,resp){
	session = req.session;
		if(rel == 1){resp.redirect('/admin');}
		else{resp.send(req.session.uniqueID + ' not found <a href="/logout">KILL SESSION</a>');}
});


con.connect(function(err) {
	console.log('DataBase');
	
    var sql = "SELECT name FROM USERS WHERE name = " +  session.uniqueID ;
  
   con.query(sql, function(err,result,fields){if(err)throw err; rel = 1; console.log(result);});
   
});



//app.listen(80,'165.227.234.2');

app.listen(1337,function(){console.log('Running at port 1337');});


