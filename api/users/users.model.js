const mongoose = require("mongoose");

var USERschema = mongoose.Schema ({
    name: String,
    username: String,
    email: String,
    posts: Array
});

var USER = mongoose.model("user", USERschema);

function validUser() {
    
}

module.exports = USER;