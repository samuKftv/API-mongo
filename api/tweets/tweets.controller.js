const fs = require('fs');
 


module.exports.getAll = getAll;
// module.exports.getById = getById;
module.exports.create = create;
module.exports.deleteById = deleteById;
// module.exports.updateById = updateById;




function  getAll(req, res) {
    const tweets = fs.readFileSync("./data/tweets.json", "utf-8");
    res.send(tweets);
}

function  getById(req, res) {
    let tweets = fs.readFileSync("..data/tweets.json", "utf-8");
    tweets = JSON.parse(tweets);
    const idTweet = req.params.id;
    const tweet = tweets.find(u => u.id == idTweet);
    if (tweet) {
      res.json(tweet);
    }  else {
      res.sendStatus(400).send("No se encuentra el tweet!");
    }

    
}


function create(req, res) {
    const tweets = JSON.parse(fs.readFileSync("./data/tweets.json", "utf-8"));
    const tweet = {
          id: tweets.length > 0 ? tweets[tweets.length-1].id + 1 : 1,
          userId: req.body.userId,
            title: req.body.title,
            body: req.body.body
    };
    tweets.push(tweet);
    fs.writeFileSync("./tweets.json", JSON.stringify(tweets, null, 4), "utf-8");
    res.json(tweet);
    
}


// function  updateById(req, res) { //No esta implementado
//     // const idUser = req.params.id;
//     // const user = users.find(u => u.id == idUser);
//     // if(user){
//     //     if(req.body.email){
//     //         user.email = req.body.email;
//     //     }else{
          
//     //     }
//     //     res.json(user);
//     // }else{
//     //     res.sendStatus(400).send("Petición erronea");
//     // }
    
// }


function  deleteById(req, res) {
    const tweets = JSON.parse(fs.readFileSync("./tweets.json", "utf-8"));
    const idTweet = req.params.id;
    const idTweets = tweets.findIndex(u => u.id == idTweet);
    const tweetToDelete = tweets[idTweets];
    if (idTweet != -1){
        tweets.splice(idTweets, 1);
        fs.writeFileSync("./tweets.json", JSON.stringify(tweets, null, 4), "utf-8");
        res.json(tweetToDelete);
    }else {
       
    }
}