const express = require("express");
const path = require("path");
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID;
const port = process.env.PORT || 8080;
const app = express();


// parse application/json
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// parse application/x-www-form-urlencoded
let urlencodedParser = bodyParser.urlencoded({extended: false})

//pour se connecter à la base de donnée Mongo
MongoClient.connect('mongodb://127.0.0.1:27017/blog', (err, database) => {
    if (err)
        return console.log(err)
    db = database
})

app.get("/requetes/afficher_les_posts", (req, res) => {
    var cursor = db.collection('blog').find().toArray(function(err, resultat) {
        if (err)
            return console.log(err)
        // affiche le contenu de la BD
        res.send(resultat);
    })
})

app.get("/requetes/afficher_un_post/:id", (req, res) => {
    const id = req.params.id
    console.log(id);
    var cursor = db.collection('blog').find({"id": id }).toArray(function(err, resultat) {
        if (err)
            return console.log(err)
        // affiche le contenu de la BD
        console.log(resultat);
        res.send(resultat);
    })
})

//requete post lorsque le formulaire est submit
app.get('/ajouter', (req, res) => {
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
