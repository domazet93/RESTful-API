var mongoose = require("mongoose");

//Genre Schema
var genreSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    create_date: {
        type: Date,
        default: Date.now
    }
})

var Genre = module.exports = mongoose.model("Genre", genreSchema);
//This object can be used from outside


//Get genre
module.exports.getGenres = function (callback, limit) {
    Genre.find(callback).limit(limit);
};
module.exports.getGenresByID = function (id, callback) {
    Genre.findById(id, callback);
};
//Add genre
module.exports.addGenre = function (genre, callback) {
    Genre.create(genre, callback);
};
//Update genre
module.exports.updateGenre = function (id, genre, options, callback) {
    var query = {_id: id};
    var update = {
        name: genre.name
    };
    Genre.findOneAndUpdate(query, update, options, callback);
};
//Delete genre
module.exports.deleteGenre = function (id, callback) {
    var query = {
        _id: id
    };
    Genre.remove(query, callback);
};
