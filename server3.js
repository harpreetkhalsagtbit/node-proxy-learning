var express = require("express");
var app = express();

app.get('/carton',function(req,res) {
    res.send("Hello world From pimhunt, Here Is the Carton v3");
});

app.listen(3003);

module.exports = app