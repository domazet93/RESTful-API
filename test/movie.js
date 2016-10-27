var Movie = require("../models/movie"),
    mongoose = require("mongoose"),
    chai = require("chai"),
    should = chai.should(),
    db;

describe("Movie", function() {

    before(function(done) {
        db = mongoose.connect("mongodb://localhost/test");
        done();
    });
    after(function(done) {
        mongoose.connection.close();
        done();
    });
    beforeEach(function(done) {
        var movie = new Movie({
            title: "The Godfather",
            genre:"Crime, Drama",
            description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
            stars:" Marlon Brando, Al Pacino, James Caan",
            duration:"2:55",
            image_url:"https://lh5.ggpht.com/koXV4NUZ7rRjm6LbBSvOLzDRe9drUeTmiJqvtvHVPbWRtOze1Giz1lBJFgRjzm4TOvZP=w300",
            imbd_url:"http://www.imdb.com/title/tt0068646/"
        });
        movie.save(function(error) {
            if (error) console.log("error" + error.message);
            else console.log("no error");
            done();
        });
    });
    it("Find movie by title", function (done) {
        Movie.findOne({ title: "The Godfather" }, function(err, movie) {
            movie.title.should.eql("The Godfather");
            console.log("title: ", movie.title);
            done();
        });
    });
    afterEach(function(done) {
        Movie.remove({}, function() {
            done();
        });
     });

});
