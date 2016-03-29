var express = require("express");
var app = express();

app.get('/carton',function(req,res) {
    res.send("Hello world From TX-Man, Here Is the Carton v1");
});

app.get('/',function(req,res) {
    res.send("Hello world From TX-Man, GENERAL V1");
});

app.listen(3001);