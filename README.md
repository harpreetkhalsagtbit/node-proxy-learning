# node-proxy-learning

Express Middleware for Routing various API requests to Different Servers using node `http-proxy-middleware` package.


#How to use?
1. **clone** this repo and
2. `cd node-proxy-learning` and `npm install`
2. **Run** diffrent servers - `node server1`,  `node server2`,  `node server3`,
3. **Run** proxy-middleware - `node app.js`
4. Open Browser(or use curl/ajax etc) and hit URLs
	http://localhost:3000/api/v1/carton
	http://localhost:3000/api/v2/carton
	http://localhost:3000/api/v3/carton 
5. Check Reponse for each Request from different Servers

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

```
