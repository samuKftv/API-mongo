const fs = require('fs');
const linkTweet = require('../users/users.controller').linkTweet;
const unlinkTweet = require('../users/users.controller').unlinkTweet;

module.exports.getAll = getAll;
module.exports.getById = getById;
module.exports.create = create;
module.exports.deleteById = deleteById;
module.exports.editLinkedTweets = editLinkedTweets;
// module.exports.updateById = updateById;




function  getAll(req, res) {
    const tweets = fs.readFileSync("./data/tweets.json", "utf-8");
    res.send(tweets);
}

function getById(req, res) {
    let tweets = fs.readFileSync("./data/tweets.json", "utf-8");
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
    if(!linkTweet(tweet, req.body.userId)){
      return res.status(400).send("No se ha podido crear el tweet");
    }
    tweets.push(tweet);
    fs.writeFileSync("./data/tweets.json", JSON.stringify(tweets, null, 4), "utf-8");
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
    const tweets = JSON.parse(fs.readFileSync("./data/tweets.json", "utf-8"));
    const idTweet = req.params.id;
    const idTweets = tweets.findIndex(u => u.id == idTweet);
    const tweetToDelete = tweets[idTweets];
    if (idTweets == -1){
      return res.status(400).send("No se ha podido borrar el tweet");
    }

    if(!unlinkTweet(tweetToDelete, tweetToDelete.userId)){
      return res.status(400).send("No se ha podido borrar el tweet");
    }

    tweets.splice(idTweets, 1);
    fs.writeFileSync("./data/tweets.json", JSON.stringify(tweets, null, 4), "utf-8");
    res.json(tweetToDelete);
}

function editLinkedTweets(arrayIdTweets, username) {
  if(arrayIdTweets.length === 0){
    return false;
  }
  const tweets = fs.readFileSync("./data/tweets.json", "utf-8");
  const tweetsToEdit = tweets.filter(tweet => {
    return arrayIdTweets.some(tweet.id);
  })
  tweetsToEdit.forEach(tweet => {
    tweet.userId = username;
  });
  return true;
}