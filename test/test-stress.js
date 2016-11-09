var loadtest = require("loadtest");
var expect = require("chai").expect;

suite("Stress tests", function(){
    test("Homepage should handle 1000 requests in a second", function(done){
         var options = {
             url: "http://localhost:1337",
             concurrency: 4,
             maxRequests: 100
         };
         loadtest.loadTest(options, function(err,result){
             expect(!err);
             expect(result.totalTimeSeconds < 1);
             done();
         });
    });
    test("Show database should handle 10000 requests in a second", function(done){
         var options = {
             url: "http://localhost:1337/db",
             concurrency: 4,
             maxRequests: 100
         };
         loadtest.loadTest(options, function(err,result){
             expect(!err);
             expect(result.totalTimeSeconds < 1);
             done();
         });
    });
});
