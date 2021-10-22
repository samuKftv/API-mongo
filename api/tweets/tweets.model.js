const mongoose = require("mongoose");

var TWEETschema = mongoose.Schema ({
    id: Number,
    userId: Number,
    title: String,
    body: String
});

var TWEET = mongoose.model("apiTwitter", TWEETschema);

module.exports = TWEET;