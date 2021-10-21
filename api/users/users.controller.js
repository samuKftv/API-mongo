const fs = require('fs');

module.exports.getAll = getAll;
module.exports.getById = getById;
module.exports.create = create;
module.exports.deleteById = deleteById;
module.exports.updateById = updateById;
module.exports.linkTweet = linkTweet;
module.exports.unlinkTweet = unlinkTweet;

const editLinkedTweets = require('../tweets/tweets.controller').editLinkedTweets;

function  getAll(req, res) {
    const users = fs.readFileSync("./data/users.json", "utf-8");
    res.send(users);
}

function getById(req, res) {
    const users = JSON.parse(fs.readFileSync("./data/users.json", "utf-8"));
    const idUser = req.params.id;
    const user = users.find(u => u.username == idUser);
    res.send(user);
    
}


function create(req, res) {
    const users = JSON.parse(fs.readFileSync("./data/users.json", "utf-8"));
    if(checkUsername(req.body.username, users)){
        return res.status(400).send("El usuario ya existe")
    }
    let user = {
          id: users.length > 0 ? users[users.length-1].id + 1 : 1,
          name: req.body.name,
          username: req.body.username,
          email: req.body.email,
          posts: []
    };
    users.push(user);
    fs.writeFileSync("./data/users.json", JSON.stringify(users, null, 4), "utf-8");
    res.json(user);
    
}


function updateById(req, res) { //No esta implementado con el FS
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
}


function  deleteById(req, res) {
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
}

// Auxilars



function checkUsername(username, users) {

    return users.some((user => user.username == username));

}

function  linkTweet(tweet, username) {
    const users = JSON.parse(fs.readFileSync("./data/users.json", "utf-8"));
    
    const user = users.find(user => user.username == username);
    if(typeof user === "undefined"){
        return false;
    }
    user.posts.push(tweet.id);
    try {
        fs.writeFileSync("./data/users.json", JSON.stringify(users, null, 4), "utf-8");
        return true;
    } catch (error) {
        return false;
    }
     
}

function  unlinkTweet(tweet, username) {
    const users = JSON.parse(fs.readFileSync("./data/users.json", "utf-8"));
    const user = users.find(user => user.username == username);
    user.posts = user.posts.filter(post => post != tweet.id);
    try {
        fs.writeFileSync("./data/users.json", JSON.stringify(users, null, 4), "utf-8");
        return true;
    } catch (error) {
        return false;
    }
     
}

function changeUsername(user, users){
    if(checkUsername(user, users) && editLinkedTweets(user.posts, user.username)){
        return true // Devuelve verdadero si todas las operaciones han finalizado con éxito.
    } 
    
    return false; // Error en algun método
}