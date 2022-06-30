/* Importation d'Express*/
const express = require('express');

/* Création du router*/
const router = express.Router();

/* Importation du middleware d'authentification */
const auth = require('../middleware/auth');

/* Importation du middleware de gestion de fichiers pour les images*/
const multer = require('../middleware/multer-config');

/* Importation des controllers */
const sauceCtrl = require('../controllers/sauce');

/* Enregistrement des routes */
router.get('/', auth, sauceCtrl.getAllSauces);
router.post('/', auth, multer, sauceCtrl.createSauce);
//router.get('/:id', auth, sauceCtrl.findSauce);
// router.put('/:id', auth, multer, sauceCtrl.updateSauce);
// router.delete('/:id', auth, sauceCtrl.deleteSauce);
// router.post('/:id/like', auth, sauceCtrl.likeSauce);

/* Exportation du router */
module.exports = router;