var Genre = require("../models/genre.js"),
    mongoose = require("mongoose"),
    chai = require("chai"),
    should = chai.should(),
    db;

describe("Genre", function() {

    before(function(done) {
        db = mongoose.connect("mongodb://localhost/test");
        done();
    });

    after(function(done) {
        mongoose.connection.close();
        done();
    });

    beforeEach(function(done) {
        var genre = new Genre({
            name: "Action"
        });
        genre.save(function(error) {
            if (error) console.log("error" + error.message);
            else console.log("no error");
            done();
        });
    });

    it("Should return genre by name", function(done) {
        Genre.findOne({ name: "Action" }, function(err, genre) {
            genre.name.should.eql("Action");
            console.log("Name:", genre.name);
            done();
        });
    });

    afterEach(function(done) {
        Genre.remove({}, function() {
            done();
        });
    });

});
