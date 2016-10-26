//Mongoose provides a straight-forward,
//schema-based solution to model your application data.
//Everything in Mongoose starts with a Schema.
var mongoose = require("mongoose");

//Creating Movies Schema
//Mongodb has an _id index by default as a first key
var movieSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    genre: {
        type: String,
        require: true
    },
    description: {
        type: String
    },
    stars: {
        type: String,
        require: true
    },
    duration: {
        type: String
    },
    image_url: {
        type: String
    },
    imbd_url: {
        type: String
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});

//To use our schema definition, we need to convert our
//movieSchema into a Model we can work with.
//This object can be used from outside
var Movie = module.exports = mongoose.model("Movie", movieSchema);

//getMovies method for Movie  model
//Anywhere a callback is passed to a query in Mongoose,
//the callback follows the pattern callback(error, results)
module.exports.getMovies = function (callback, limit) {
    Movie.find(callback).limit(limit);
};
module.exports.getMovieByID = function (id, callback) {
    Movie.findById(id, callback);
};
module.exports.addMovie = function (movie, callback) {
    Movie.create(movie, callback);
};
module.exports.updateMovie = function (id, movie, options, callback) {
    var query = {
        _id: id
    };
    var update = {
        title: movie.title,
        genre: movie.genre,
        description: movie.description,
        stars: movie.author,
        duration: movie.publisher,
        image_url: movie.image_url,
        imbd_url: movie.buy_url
    };
    Movie.findOneAndUpdate(query, update, options, callback);

}
module.exports.deleteMovie = function (id, callback) {
    var query = {
        _id: id
    };
    Movie.remove(query, callback);
};
