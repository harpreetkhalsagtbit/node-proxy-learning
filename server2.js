var express = require("express");
var app = express();

app.get('/imageserver',function(req,res) {
    res.send("Hello world From Image Server");
});

app.get('/carton',function(req,res) {
    res.send("Hello world From ImageServer, Here Is the Carton V2");
});

app.listen(3002);