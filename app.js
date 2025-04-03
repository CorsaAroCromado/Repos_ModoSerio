const express = require('express');
const app = express();

app.get("/", function(req, res){
    res.sendFile(__dirname + "/html/index.html");
});

app.get("/outra", function(req, res){
    res.send("olá, bem vindo a outra página");
});

app.listen(8081, function(){console.log('servidor rodando');});