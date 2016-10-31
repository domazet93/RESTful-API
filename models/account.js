var mongoose = require("mongoose");

var accountSchema = mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    token: {
        type: String
    }
});


var Account = module.exports = mongoose.model("Account", accountSchema);

