// module qui permet de gérer (d'aller rechercher) les variables d'environnement
require('dotenv-flow').config();


// Création du serveur Express
const express = require('express');
const app = express();
const mongoose = require('mongoose');


// variables d'environnement
const { NODE_ENV, MESSAGE, PORT, DB_CONNECTION } = process.env;
console.log('Lancé en', NODE_ENV, ':', MESSAGE);

// route temporaire
// app.use('/api', (req, res) => {
//     const data = {
//         msg : 'Projet Burger'
//     };
//     res.json(data);
// });


// on importe la librairie qui gère les erreurs async await 
// ATTENTION : à placer avant d'importer les routes !
require('express-async-errors');


// on importe notre module router
const router = require('./routes');


// middleware qui permet au serveur de lire des objets json en post
app.use(express.json());


// connection à la bdd
app.use( async (req, res, next) => {
    await mongoose.connect(DB_CONNECTION);
    console.log('Connection réussie');
    next();
})


// on indique à notre serveur qu'une fois arrivé sur la route /api, il doit utiliser notre router
app.use('/api', router);

// console.log(process.env);

// on met le serveur sur écoute
app.listen(PORT, () => {
    console.log(`Server up on port : ${PORT} [${NODE_ENV}]`);
});