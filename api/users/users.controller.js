const fs = require('fs');
const USERSModel = require('./users.model');
const TWEETSModel = require('../tweets/tweets.model');

module.exports.getAll = getAll;
module.exports.getById = getById;
module.exports.create = create;
module.exports.deleteById = deleteById;
module.exports.updateById = updateById;
// module.exports.linkTweet = linkTweet;
// module.exports.unlinkTweet = unlinkTweet;

const editLinkedTweets = require('../tweets/tweets.controller').editLinkedTweets;

function  getAll(req, res) {
    USERSModel.find()
        .then(response => {
            res.json(response);
        })
}

function getById(req, res) {
    // USERSModel.findOne({username: req.params.username}).then(response => {
    //     res.send(response);
    // }).catch(err => {
    //     res.status(400).send(err);
    // });
    USERSModel.findOne({username: req.params.username}).populate("tweets", "userId").then(response => {
        res.send(response);
    }).catch(err => {
        res.status(400).send(err);
    });

}

function create(req, res) {
    USERSModel.create(req.body).then(response => {
        res.json(response);
    }).catch(err=>{
        res.status(400).status("Oye o estas creando un usuario ya existente o los parametros no son válidos")
    });
}


function updateById(req, res) {
    USERSModel.findOneAndUpdate({username: req.params.username},  req.body)
        .then(response => {
            console.log(response)
            TWEETSModel.updateMany({userId: response.username},{userId: req.body.username})
            .then( response => {
                res.json(response);
            }).catch(err =>{
                res.status(400).send(err);
            });
        }).catch(err => {
            res.status(400).send(err);
        });

    /*
    const users = JSON.parse(fs.readFileSync("./data/users.json", "utf-8"));
    const idUser = req.params.id;
    const user = users.find(u => u.username == idUser);
    if(!user){
        return res.status(400).send("El usuario no existe")
    }
    if(typeof req.body.username !== "undefined"){
        if(!changeUsername(user, users)){ //Si no he podido cambiar el usuario y sus posts devuelvo error
            return res.status(400).send("No ha sido posible actualizar el usuario")
        }
    }
    // req.body.username ? metodoloco : user.username;
    req.body.name ? req.body.name : user.name;
    req.body.email ? req.body.email: user.email;

    res.json(user);
    */
}


function  deleteById(req, res) {
    USERSModel.findOneAndDelete({username: req.params.username})
        .then(response => {
            res.json(response);
        }).catch(err => {
            res.status(400).send(err);
        })
    /*
    const users = JSON.parse(fs.readFileSync("./data/users.json", "utf-8"));
    const idUser = req.params.id;
    const idUsers = users.findIndex(u => u.id == idUser);
    const userToDelete = users[idUsers];
    if (idUser != -1){
        users.splice(idUsers, 1);
        fs.writeFileSync("./data/users.json", JSON.stringify(users, null, 4), "utf-8");
        res.json(userToDelete);
    }else {
       
    }
    */
}

// Auxilars


// function checkUsername(username, users) {

//     return users.some((user => user.username == username));

// }

// function  linkTweet(tweet, username) {
//     const users = JSON.parse(fs.readFileSync("./data/users.json", "utf-8"));
    
//     const user = users.find(user => user.username == username);
//     if(typeof user === "undefined"){
//         return false;
//     }
//     user.posts.push(tweet.id);
//     try {
//         fs.writeFileSync("./data/users.json", JSON.stringify(users, null, 4), "utf-8");
//         return true;
//     } catch (error) {
//         return false;
//     }
     
// }

// function  unlinkTweet(tweet, username) {
//     const users = JSON.parse(fs.readFileSync("./data/users.json", "utf-8"));
//     const user = users.find(user => user.username == username);
//     user.posts = user.posts.filter(post => post != tweet.id);
//     try {
//         fs.writeFileSync("./data/users.json", JSON.stringify(users, null, 4), "utf-8");
//         return true;
//     } catch (error) {
//         return false;
//     }
     
// }

// function changeUsername(user, users){
//     if(checkUsername(user, users) && editLinkedTweets(user.posts, user.username)){
//         return true // Devuelve verdadero si todas las operaciones han finalizado con éxito.
//     } 
    
//     return false; // Error en algun método
// }