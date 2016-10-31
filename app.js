/*
Install Node.js, and create working directory to hold your
application. Use the npm init command to create a package.json
file for your application:
    $ npm init

Install Express.js in your working directory and save it in the dependencies list.
For example:
    $ npm install express --save

Same that for a body-parser and mongoose
    $ npm install body-parser --save
    $ npm install mongoose --save
*/
// Configuring Passport

//Load Express.js Node framework
var express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");

//app is an instance of express
var app = express();

//We need to store result as a object in req.body -->
//To use bodyParser() add this:
app.use(express.static("web"));
app.use(bodyParser.json());

//Objects
var Genres =  require("./models/genre");
var Movies =  require("./models/movie");

//None of out movies will be created/removed until the connection your model uses is open
//Every model has an associated connection
mongoose.connect("mongodb://localhost/cinema");
var db = mongoose.connection;

//The following examples illustrate defining routes
//Respond to GET request on the root route (/), the application’s home page:
// app.get("/", function (req, res) {
//     //res.send("Please use /api location.");
// });
//Respond to GET request on the root route (/genres)
app.get("/api/genres", function (req, res) {
    Genres.getGenres(function (err, genres) {
        if (err) {
            throw err;
        }
        res.json(genres);
    });
});
//...and so on
app.get("/api/genres/:_id", function (req, res) {
    Genres.getGenresByID(req.params._id, function (err, genre) {
        if (err) {
            throw err;
        }
        res.json(genre);
    });
});
app.post("/api/genres", function (req, res) {
    var genre = req.body;
    Genres.addGenre(genre, function (err, genre) {
        if (err) {
            throw err;
        }
        res.json(genre);
    });
});
app.put("/api/genres/:_id", function (req, res) {
    var id = req.params._id;
    var genre = req.body;

    Genres.updateGenre(id, genre, {}, function (err, genre) {
        if (err) {
            throw err;
        }
        res.json(genre);
    });
});
app.delete("/api/genres/:_id", function (req, res) {
    var id = req.params._id;
    Genres.deleteGenre(id, function (err, genre) {
        if (err) {
            throw err;
        }
        res.json(genre);
    });
});

//Requests for Movies collection
app.get("/api/movies", function (req, res) {
    Movies.getMovies(function (err, movies) {
        if( err) {
            throw err;
        }
        res.json(movies);
    });
});
app.get("/api/movies/:_id", function (req, res) {
    Movies.getMovieByID(req.params._id, function (err, movie) {
        if (err) {
            throw err;
        }
        res.json(movie);
    });
});
app.post("/api/movies", function (req, res) {
    var movie = req.body;
    Movies.addMovie(movie, function (err, movie) {
        if (err) {
            throw err;
        }
        res.json(movie);
    });
});
app.put("/api/movies/:_id", function (req, res) {
    var id = req.params._id;
    var movie = req.body;
    Movies.updateMovie(id, movie, {}, function (err, movie) {
        if (err) {
            throw err;
        }
        res.json(movie);
    });
});
app.delete("/api/movies/:_id", function (req, res) {
    var id = req.params._id;
    Movies.deleteMovie(id, function (err, movie) {
        if (err) {
            throw err;
        }
        res.json(movie);
    });
});

app.listen(1337);
console.log("Running on port 1337...");
