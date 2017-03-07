const express = require("express");
const path = require("path");
const port = process.env.PORT || 8080;
const app = express();
const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID;

// parse application/json
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// parse application/x-www-form-urlencoded
let urlencodedParser = bodyParser.urlencoded({ extended: false })

//pour se connecter à la base de donnée Mongo
MongoClient.connect('mongodb://127.0.0.1:27017/carnet_adresse', (err, database) => {
    if (err)
        return console.log(err)
    db = database
    app.listen(8081, () => {
        console.log('connexion à la BD et on écoute sur le port 8081')
    })
})

//requete post lorsque le formulaire est submit
app.post('/ajouter', (req, res) => {
    //on sauvegarde les données dans la DB mongo
    db.collection('blog').save(req.body, (err, result) => {
        if (err)
            return console.log(err)
        console.log('sauvegarder dans la BD')
    })
})


app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/dist"));
app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname + "/dist", "index.html"));
})
app.listen(port);
