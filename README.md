# node-proxy-learning

Express Middleware for Routing various API requests to Different Servers using node [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware) package.

[![Build Status](https://travis-ci.org/harpreetkhalsagtbit/node-proxy-learning.svg?branch=master)](https://travis-ci.org/harpreetkhalsagtbit/node-proxy-learning)

[![Coverage Status](https://coveralls.io/repos/github/harpreetkhalsagtbit/node-proxy-learning/badge.svg?branch=master)](https://coveralls.io/github/harpreetkhalsagtbit/node-proxy-learning?branch=master)

#How to use?
1. **clone** repo and `npm install`
2. `cd node-proxy-learning` and `npm install`
2. **Run** different servers - `node server1`,  `node server2`,  `node server3`,
3. **Run** proxy-middleware - `node app.js`
4. Open Browser(or use curl/ajax etc) and hit URLs

	[http://localhost:3000/api/v1/carton](http://localhost:3000/api/v1/carton)

	[http://localhost:3000/api/v2/carton](http://localhost:3000/api/v2/carton)

	[http://localhost:3000/api/v3/carton](http://localhost:3000/api/v3/carton)

5. Check Reponse for each Request from different Servers

#Tests
`npm test`

#Authenticate and Then Proxy Request

```javascript
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

.
.
.
.
.

var options = {
	target: 'http://localhost', // target host 
	changeOrigin: true, // needed for virtual hosted sites 
	ws: true, // proxy websockets 
	pathRewrite: {
	},
	proxyTable: {
	}
};

// create the proxy 
var proxy = proxyMiddleware(middleStringApi, options);

app.use(proxy);


```
