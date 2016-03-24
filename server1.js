var express = require("express");
var app = express();

app.get('/txman',function(req,res) {
    res.send("Hello world From TX-Man");
});

app.get('/mycustom_url',function(req,res) {
    res.send("Hello world From TX-Man");
});

app.get('/carton',function(req,res) {
	console.log(req.ip, req.ips, req.headers['X-Real-IP'] || req.connection.remoteAddress)
    res.send("Hello world From TX-Man, Here Is the Carton v1");
});

app.get('/',function(req,res) {
    res.send("Hello world From TX-Man, GENERAL V1");
});

app.listen(3001);