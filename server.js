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

//pour se connecter à la base de donnée Mongo
MongoClient.connect('mongodb://127.0.0.1:27017/blog', (err, database) => {
    if (err)
        return console.warn(err)
    db = database
})

app.get('/requetes/detruire/:permalien', (req, res) => {
    const permalien = req.params.permalien
    db.collection('blog').findOneAndDelete({
        "permalien": permalien
    }, (err, resultat) => {
        if (err)
            return console.warn(err)
        res.send(resultat);
    })
})

app.post("/requetes/afficher_les_posts/:ordre", (req, res) => {
    console.log(req.body);
    const ordre = parseInt(req.params.ordre)
    const cursor = db.collection('blog').find(req.body).sort([['_id', ordre]]).toArray( (err, resultats) => {
        if (err)
            return console.warn(err)
        // affiche le contenu de la BD
        console.log(resultats);
        res.send(resultats.map( (resultat) => {return ajouterLaDate(resultat)}));
    })
})

//pour ajouter les zeros à la date
function pad(n){return n<10 ? '0'+n : n}

function assignerMois(m){
    const lesMois = ["janvier", "février", "mars", "avril", "mai", "juin","juillet", "août", "septembre", "octobre", "novembre", "décembre"];
    return lesMois[m];
}

// obtenir le temps de publication de l'article
function ajouterLaDate(data){
    const temps = data._id.getTimestamp();
    data.date =
        "Le " + temps.getDate() + " " +
        assignerMois((temps.getMonth())) +" "+
        temps.getFullYear()+" à "+
        pad(temps.getHours()) + ":" +
        pad(temps.getMinutes()) + ":" +
        pad(temps.getSeconds());
    return data;
}

app.get("/requetes/afficher_un_post/:permalien", (req, res) => {
    const permalien = req.params.permalien
    var cursor = db.collection('blog').find({"permalien": permalien }).toArray( (err, resultat) => {
        if (err)
            return console.warn(err)
        res.send(ajouterLaDate(resultat[0]));
    })
})

//requete post lorsque le formulaire est submit
app.post('/requetes/ajouter_un_post', (req, res) => {
    //on sauvegarde les données dans la DB mongo
    db.collection('blog').save(req.body, (err, result) => {
        if (err)
            return console.warn(err)
        res.send(result);
    })
})

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/dist"));

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname + "/dist", "index.html"));
})

app.listen(port);
