/* Importation d'Express */
const express = require('express');

/* Création du router */
const router = express.Router();

/* Importation des controllers */
const userCtrl = require ('../controllers/user');

/* Enregistrement des routes */
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

/* Exportation du router */
module.exports = router;