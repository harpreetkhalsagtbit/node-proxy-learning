var http = require('http');
var request = require('request');
var assert = require('assert');
describe('loading express', function() {
    var server;
    beforeEach(function() {
        server = require('../app');
        http.createServer(server);
    });
    it('Proxy to Server1', function testPath(done) {
        request('http://localhost:3000/api/v1/carton', function(err, res, body) {
            assert.equal("Hello world From TX-Man, Here Is the Carton v1", res.body)
            done()
        })
    });

    it('Proxy to Server2', function testPath(done) {
        request('http://localhost:3000/api/v2/carton', function(err, res, body) {
            assert.equal("Hello world From ImageServer, Here Is the Carton V2", res.body)
            done()
        })
    });

    it('Proxy to Server3', function testPath(done) {
        request('http://localhost:3000/api/v3/carton', function(err, res, body) {
            assert.equal("Hello world From pimhunt, Here Is the Carton v3", res.body)
            done()
        })
    });

});