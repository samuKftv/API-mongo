const fs = require('fs');
 
module.exports.getAll = getAll;
module.exports.getById = getById;
module.exports.create = create;
module.exports.deleteById = deleteById;
module.exports.linkTweet = linkTweet;


function  getAll(req, res) {
    const users = fs.readFileSync("./data/users.json", "utf-8");
    res.send(users);
}

function  getById(req, res) {
    const users = JSON.parse(fs.readFileSync("./data/users.json", "utf-8"));
    const idUser = req.params.id;
    const user = users.find(u => u.id == idUser);
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


function  updateById(req, res) { //No esta implementado con el FS
    // const idUser = req.params.id;
    // const user = users.find(u => u.id == idUser);
    // if(user){
    //     if(req.body.email){
    //         user.email = req.body.email;
    //     }else{
          
    //     }
    //     res.json(user);
    // }else{
    //     res.sendStatus(400).send("Petición erronea");
    // }
    
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
    user.posts.push(tweet.id);
    try {
        fs.writeFileSync("./data/users.json", JSON.stringify(users, null, 4), "utf-8");
        return true;
    } catch (error) {
        return false;
    }
     
}