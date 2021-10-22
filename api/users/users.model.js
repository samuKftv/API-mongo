const mongoose = require("mongoose");

var USERschema = mongoose.Schema ({
    name: String,
    username:{
        type: String,
        unique: true,
        require: true,
        minLength:4,
        maxLenght:13
    },
    email: String,
    tweetfavorito:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tweet'
    },
    tweets: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'tweet'
        }
    ]
});

var USER = mongoose.model("user", USERschema);

function validUser() {
    
}
module.exports = USER;