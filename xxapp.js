var express = require('express');
var app = express();
var httpProxy = require('http-proxy');
var apiProxy = httpProxy.createProxyServer();
var _ = require('lodash');

var url = require('url');

// =======================
// configuration =========
// =======================
var port = process.env.PORT || 3000; // used to create, sign, and verify tokens

var middleStringApi = "/api"
var options = {
	target: 'http://localhost', // target host 
	changeOrigin: true, // needed for virtual hosted sites 
	ws: true, // proxy websockets 
	pathRewrite: {
		'/v1/carton': 'carton', // rewrite paths 
		'/v2/carton': 'carton', // rewrite paths 
		'/v3/carton': 'carton' // rewrite paths 
	},
	proxyTable: {
		// when request.url == 'localhost:3000/api/v1', 
		// override target 'http://localhost' to 'http://localhost:3001' or 'http://localhost:3001/carton'    
		'localhost:3000/api/v1': 'http://localhost:3001',
		'localhost:3000/api/v2': 'http://localhost:3002',
		'localhost:3000/api/v3': 'http://localhost:3003',
		// when request.headers.host == 'dev.localhost:3000', 
		// override target 'http://www.example.org' to 'http://localhost:8000' 
		'dev.localhost:3000': 'http://localhost:8000'
	}
};

// =======================
// routes ================
// =======================
// basic route
app.get('/', function(req, res) {
	res.send('Hello! The API is at http://localhost:3000' + '/api');
});


// API ROUTES -------------------
// get an instance of the router for api routes
var apiRoutes = express.Router();

// middleware that is specific to this router
apiRoutes.use(function timeLog(req, res, next) {
	console.log('Time: ', Date.now());
	next();
});

// route to return all users (GET http://localhost:8080/api/imageserver/users)
apiRoutes.get(/.*/, function(req, res, next) {
	console.log("req.originalUrl", req.originalUrl)
	var _options = createProxyOptions(req, options)
    var path = req.url;
	req.url = "/" + _options.pathRewrite[path];
    apiProxy.web(req, res, _options);

	var urlObj = url.parse(req.url);
// _options.target = _options.target
    console.log(req.headers.host + middleStringApi + path, "  Redirected to => ", _options.target + "/" + _options.pathRewrite[path])
    console.log(_options)
});

function createProxyOptions(req, config) {
    var proxyTable = config.proxyTable;
    var result = _.clone(config);

    if (proxyTable) {
        var newTarget = getTargetFromProxyTable(req, proxyTable);
        if (newTarget) {
            // logger.debug('[HPM] proxyTable new target: %s -> "%s"', config.target, newTarget);
            result = _.assign(result, {target: newTarget});    // override option.target
        }
    }

    return result;
}

function getTargetFromProxyTable(req, proxyTable) {
    var result;
    var host = req.headers.host;
    var path = req.url;
    var hostAndPath = host + middleStringApi + path;
    _.forIn(proxyTable, function(value, key) {
        if (containsPath(key)) {

            if (hostAndPath.indexOf(key) > -1) {    // match 'localhost:3000/api'
                result = proxyTable[key];
                // logger.debug('[HPM] proxyTable match: %s -> "%s"', hostAndPath, result);
                return false;
            }
        } else {

            if (key === host) {                     // match 'localhost:3000'
                result = proxyTable[key];
                // logger.debug('[HPM] proxyTable match: %s -> "%s"', host, result);
                return false;
            }

        }

    });

    return result;
}

function containsPath(v) {
    return v.indexOf('/') > -1;
}
// apply the routes to our application with the prefix /api
app.use(middleStringApi, apiRoutes);


// =======================
// start the server ======
// =======================
app.listen(port);
console.log('Magic happens at http://localhost:' + port);
