const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var TWEETschema = mongoose.Schema ({
    id: 
        {
            type: Number,
            unique: true,
            require: true,
            minLength:1
        },
    userId: String,
    title: String,
    body: String
});

var TWEET = mongoose.model("tweet", TWEETschema);

module.exports = TWEET;