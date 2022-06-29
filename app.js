/* importation d'Express */
const express = require('express');

/* importation de Mongoose pour gérer la base de données */
const mongoose = require('mongoose');

/* Accès au chemin du système de fichiers */
const path = require('path');

//const cors = require("cors");


const app = express();

/* Importation des routes */
const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');

/* Création de l'application express et appel des dépendances */
app.use(express.json());

//app.use(cors());

/* Gestion des CORS */
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

/* Connexion à Mongoose pour gèrer la base de données Mongo DB */
mongoose.connect('mongodb+srv://Master:King@cluster0.5eh1kmj.mongodb.net/?retryWrites=true&w=majority',
  { 
    useNewUrlParser: true,
    useUnifiedTopology: true
   })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

/* middleware pour le dossier images */
app.use('/images', express.static(path.join(__dirname, 'images')));

/* Enregistrement des routes */
app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);


/* Exportation de l'application express */
module.exports = app;