const fs = require('fs');
const TWEETSModel = require('./tweets.model');
const USERSModel = require('../users/users.model')
// const linkTweet = require('../users/users.controller').linkTweet;
// const unlinkTweet = require('../users/users.controller').unlinkTweet;

module.exports.getAll = getAll;
module.exports.getById = getById;
module.exports.create = create;
module.exports.updateById = updateById;
module.exports.deleteById = deleteById;
// module.exports.editLinkedTweets = editLinkedTweets;
// 




function  getAll(req, res) {
  TWEETSModel.find()
  .then(response => {
      res.json(response);
  })
}

function getById(req, res) {
  TWEETSModel.findOne({id: req.params.id}).then(response => {
    res.send(response);
}).catch(err => {
    res.status(400).send(err);
});
    
}


function create(req, res) {
  let user;
  USERSModel.findOne({username: req.body.userId}).then(response => {
    user = response;
    if(!response){
      return res.status(400).send("El owner de este tweet no existia");
    }
    TWEETSModel.create(req.body).then(response => {
      user.tweets.push(response._id);
      user.save().then(u =>{
        res.json(response)
      }).catch(err => {
        return res.status(400).send(err);
      });;
    }).catch(err => {
      return res.status(400).send(err);
   });
}).catch(err => {
  return res.status(400).send(err);
});
}


function  updateById(req, res) { //No esta implementado
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
  TWEETSModel.findOneAndUpdate({id: req.params.id},  req.body, {new: true}).then(response =>{
    res.json(response);
  }).catch(err =>{
    res.status(400).send(err);
  })
    
 }


function  deleteById(req, res) {
    // const tweets = JSON.parse(fs.readFileSync("./data/tweets.json", "utf-8"));
    // const idTweet = req.params.id;
    // const idTweets = tweets.findIndex(u => u.id == idTweet);
    // const tweetToDelete = tweets[idTweets];
    // if (idTweets == -1){
    //   return res.status(400).send("No se ha podido borrar el tweet");
    // }

    // if(!unlinkTweet(tweetToDelete, tweetToDelete.userId)){
    //   return res.status(400).send("No se ha podido borrar el tweet");
    // }

    // tweets.splice(idTweets, 1);
    // fs.writeFileSync("./data/tweets.json", JSON.stringify(tweets, null, 4), "utf-8");
    // res.json(tweetToDelete);
    TWEETSModel.findOneAndDelete({id: req.params.id})
    .then(response => {
        res.json(response);
    }).catch(err => {
        res.status(400).send(err);
    })


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