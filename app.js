const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const fs = require('fs');
const axios = require('axios').default;
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./bd334');
var x;

// db.serialize(function() {
//     db.run("DROP TABLE Projet");
//     db.run("CREATE TABLE Projet( id int, Titre varchar(255), Description varchar(255), Support varchar(255) )");

//     var stmt = db.prepare("INSERT INTO Projet VALUES (?, ?, ?, ?)");
//     for (var i = 0; i < 10; i++) {
//         stmt.run(i, "Projet"+i, "desc"+i, "support " + i);
//     }
//     stmt.finalize();

//     db.each("SELECT * FROM Projet", function(err, row) {
//         console.log(row);
//         x = row.info;
//     });
// });
// db.close();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({
  extended: true,
  limit: '50mb'
}));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/getUtilisateurs', (req, res) => {
    let tableau1 = [];
    db.serialize(() => {
        db.each("SELECT * FROM Projet", function(err, row) {
            console.log(row);
            tableau1.push(row);
        }, 
        ()=> {
            res.send(JSON.stringify(tableau1));
        });
    });
    db.close();
});

app.get('/inscrireCollaborateur', (req, res) => {
    let jsonData = JSON.parse(fs.readFileSync('Utilisateurs.json'));
    res.send(JSON.stringify(jsonData));
});

app.get('/inscrirePartnenaire', (req, res) => {
    let jsonData = JSON.parse(fs.readFileSync('Utilisateurs.json'));
    res.send(JSON.stringify(jsonData));
});

app.get('/inscrireEtudiant', (req, res) => {
    let jsonData = JSON.parse(fs.readFileSync('Utilisateurs.json'));
    res.send(JSON.stringify(jsonData));
});

app.get('/inscrireProfesseur', (req, res) => {
    let jsonData = JSON.parse(fs.readFileSync('Utilisateurs.json'));
    res.send(JSON.stringify(jsonData));
});

app.get('/ajouterProjet', (req, res) => {
    let jsonData = JSON.parse(fs.readFileSync('Utilisateurs.json'));
    res.send(JSON.stringify(jsonData));
});

app.get('/supprimerProjet', (req, res) => {
    let jsonData = JSON.parse(fs.readFileSync('Utilisateurs.json'));
    res.send(JSON.stringify(jsonData));
});

app.get('/obtenirProjets', (req, res) => {
    let jsonData = JSON.parse(fs.readFileSync('Utilisateurs.json'));
    res.send(JSON.stringify(jsonData));
});

app.get('/obtenirProjet/:id', (req, res) => {
    let jsonData = JSON.parse(fs.readFileSync('Utilisateurs.json'));
    res.send(JSON.stringify(jsonData));
});




/* UTILISATEURS */
app.post('/connexion', (req, res) => {
    // console.log(req.body, req.body.username);
    let jsonData = JSON.parse(fs.readFileSync('Utilisateurs.json'));
    var foundUser = jsonData.filter( item => {
        return req.body.username == item.username && req.body.password == item.password;
    } );
    // let result = (foundUser.length == 0) ? null : JSON.stringify(foundUser);
    // console.log(result);
    res.send(JSON.stringify(foundUser));
});

app.post('/inscription', (req, res) => {
    let tableauUtils = [];
    let jsonData = JSON.parse(fs.readFileSync('Utilisateurs.json'));
    jsonData.map(e => tableauUtils.push(e));
    tableauUtils.push(req.body);
    fs.writeFileSync('Utilisateurs.json', JSON.stringify(tableauUtils));
    res.send(JSON.stringify({"ss": "sasaaaa"}));
});

const PORT = process.env.PORT || 8080;
httpServer.listen(PORT, () => {
  console.log(`Duaneko server listening on port ${PORT}`);
  console.log('Appuyez sur Ctrl+C pour quitter.');
});

module.exports = app;
