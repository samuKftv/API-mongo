const express = require("express");
const server = express();

//Rutas de los recursos.
const usersRouter = require("./api/users");
const tweetsRouter = require("./api/tweets");

server.use(express.json());
server.use('/users', usersRouter);
server.use('/tweets', tweetsRouter);


server.listen(5000, function(err) {
    console.log("Escuchando en el puerto 5000");
})