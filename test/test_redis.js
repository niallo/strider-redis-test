var redis = require('redis')
  , should = require('should');


describe("Redis", function() {
  it("Should connect to server passed by Strider via environment variables", function(done) {
    var port = parseInt(process.env.REDIS_PORT);
    var host = process.env.REDIS_HOST;
    var password = process.env.REDIS_PASSWORD;
    redis.debug_mode = true;

    console.log("host: %s port: %s password: %s", host, port, password);
    var client = redis.createClient(port, host);

    client.auth(password, function() {
      var key = "foo";
      var value = "this is my foo value";
      client.set(key, value);

      client.get(key, function(err, reply) {
        reply.toString().should.eql(value);
        done();
      });
    });
  });
});
