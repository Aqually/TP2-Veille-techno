const express = require("express");
const path = require("path");
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID;
const port = process.env.PORT || 8080;
const app = express();
let db;

// parse application/json
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//pour se connecter à la base de donnée Mongo
MongoClient.connect('mongodb://127.0.0.1:27017/blog', (err, database) => {
    if (err)
        return console.warn(err)
    db = database
})

//pour détruire un article avec le permalien
app.get('/requetes/detruire/:permalien', (req, res) => {
    //récupère le permalien
    const permalien = req.params.permalien
    //on cherche dans blog un entré qui contient le permalien
    db.collection('blog').findOneAndDelete({
        "permalien": permalien
    }, (err, resultat) => {
        if (err)
            return console.warn(err)
        res.send(resultat);
    })
})

//pour affecter les données
function affecterDonnees(data){
    return {
        "titre": data.titre,
        "auteur": data.auteur,
        "categories":data.categories,
        "permalien":data.permalien,
        "appercu":data.appercu,
        "contenu":data.contenu
    }
}

//pour modifier un article
app.post("/requetes/modifier", (req, res) => {
    //récupere le _id
    const id = req.body._id;
    //formatter les données
    const data = affecterDonnees(req.body)
    //chercher l'entré avec le _id et mettre à jour
    db.collection('blog').update({
        "_id": ObjectID(id)
    }, data , (err, resultat) => {
        if (err)
            return console.warn(err)
        res.send(resultat);
    });
})

//afficher tous les articles selon l'ordre (ancien ou récent en premier)
app.post("/requetes/afficher_les_posts/:ordre", (req, res) => {
    //récupère l'ordre
    const ordre = parseInt(req.params.ordre)
    //rechercher les données et classé en ordre
    const cursor = db.collection('blog').find(req.body).sort([['_id', ordre]]).toArray( (err, resultats) => {
        if (err)
            return console.warn(err)
        //retourne les données vers React
        res.send(resultats.map( (resultat) => {return ajouterLaDate(resultat)}));
    })
})

//les mois
const lesMois = ["janvier", "février", "mars", "avril", "mai", "juin","juillet", "août", "septembre", "octobre", "novembre", "décembre"];

//pour ajouter les zeros à la date/heure
function pad(n){return n<10 ? '0'+n : n}

//assigner le mois à l'article
function assignerMois(m){
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

//pour afficher un article selon le permalien entré dans la barre d'addresse
app.get("/requetes/afficher_un_post/:permalien", (req, res) => {
    //récupère le permalien
    const permalien = req.params.permalien
    //rechercher l'article qui contient ce permalien
    var cursor = db.collection('blog').find({"permalien": permalien }).toArray( (err, resultat) => {
        if (err)
            return console.warn(err)
        //on retourne les données
        res.send(ajouterLaDate(resultat[0]));
    })
})

//requete post lorsque le formulaire est submit
app.post('/requetes/ajouter_un_post', (req, res) => {
    //traiter les données
    const data = affecterDonnees(req.body)
    //on sauvegarde les données dans la DB mongo
    db.collection('blog').save(data, (err, result) => {
        if (err)
            return console.warn(err)
        res.send(result);
    })
})

//avoir accès au fichier public qui contient les images
app.use(express.static(__dirname + "/public"));
//avoir accès au fichier dist (distribution) qui contient les fichiers react
app.use(express.static(__dirname + "/dist"));

//lorsqu'un utilisateur arrive sur le site (et que le URL ne correspond à aucun avant de ce fichier)
//redirige vers l'application react
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname + "/dist", "index.html"));
})

//faire marcher l'application sur le port indiqué
app.listen(port);
console.log("serveur ouvert")
