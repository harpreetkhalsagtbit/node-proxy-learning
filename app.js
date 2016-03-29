var express = require('express');
var app = express();
var proxyMiddleware = require('http-proxy-middleware');


// =======================
// configuration =========
// =======================
var port = process.env.PORT || 3000; // used to create, sign, and verify tokens

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
// Authenticate User Before Proxing Request
apiRoutes.use(function timeLog(req, res, next) {
	console.log('Time: ', Date.now());

	// Only If Authorized User
	next();
	// else block Request here
	// res.status(403)        // HTTP status 403: Access Denied
	//    .send('Access Forbidden');
});


var middleStringApi = "/api"
// apply the routes to our application with the prefix /api
app.use(middleStringApi, apiRoutes);


var options = {
	target: 'http://localhost', // target host 
	changeOrigin: true, // needed for virtual hosted sites 
	ws: true, // proxy websockets 
	pathRewrite: {
		'/api/v1/carton': 'carton', // rewrite paths 
		'/api/v2/carton': 'carton', // rewrite paths 
		'/api/v3/carton': 'carton' // rewrite paths 
	},
	proxyTable: {
		// when request.url == 'localhost:3000/api/v1', 
		// override target(options.target) 'http://localhost' to 'http://localhost:3001' or 'http://localhost:3001/carton'    
		'localhost:3000/api/v1': 'http://localhost:3001',
		'localhost:3000/api/v2': 'http://localhost:3002',
		'localhost:3000/api/v3': 'http://localhost:3003',
		// when request.headers.host == 'dev.localhost:3000', 
		// override target 'http://www.example.org' to 'http://localhost:8000' 
		'dev.localhost:3000': 'http://localhost:8000'
	}
};

// create the proxy 
var proxy = proxyMiddleware(middleStringApi, options);

app.use(proxy);


apiRoutes.get(/* /api/v1/carton */ "/v1/carton", function timeLog(req, res, next) {
	console.log("Here - /api/v1/carton")
	next();
});

apiRoutes.get(/* /api/v2/carton */ "/v2/carton", function timeLog(req, res, next) {
	console.log("Here - /api/v2/carton")
	next();
});

apiRoutes.get(/* /api/v3/carton */ "/v3/carton", function timeLog(req, res, next) {
	console.log("Here - /api/v3/carton")
	next();
});

// =======================
// start the server ======
// =======================
app.listen(port);
console.log('Magic happens at http://localhost:' + port);
