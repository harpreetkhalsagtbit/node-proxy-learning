var http = require('http');
var request = require('request');
var assert = require('assert');
describe('loading express', function() {
    beforeEach(function() {
        var server = require('../app');

        var server1 = require('../server1');
        var server2 = require('../server2');
        var server3 = require('../server3');
        http.createServer(server1);
        http.createServer(server2);
        http.createServer(server3);
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