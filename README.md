# node-proxy-learning
Node Proxy Node Client Express Experiment

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
