// Einbinden des "express"-Moduls
const express = require("express");

// Initialisieren von Express
const app = express();


// Modul mit Router einbinden
const router = require("./routes/router.js");

app.set("view engine", "ejs");
app.set("views", "views");


app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({extended: false}));


// Router registrieren -> Der Router verwaltet jetzt Routen
app.use(router);

app.listen(8080, function() {
    console.log("Server lauscht auf http://localhost:8080");
});