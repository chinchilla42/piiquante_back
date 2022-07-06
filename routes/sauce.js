/* Import Express*/
const express = require('express');

/* Create router*/
const router = express.Router();

/* Import authentication middleware */
const auth = require('../middleware/auth');

/* Import file management middleware to handle images */
const multer = require('../middleware/multer-config');

/* Import controllers */
const sauceCtrl = require('../controllers/sauce');

/* Save routes */
router.get('/', auth, sauceCtrl.getAllSauces);
router.post('/', auth, multer, sauceCtrl.createSauce);
router.get('/:id', auth, sauceCtrl.findSauce);
router.put('/:id', auth, multer, sauceCtrl.updateSauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.post('/:id/like', auth, sauceCtrl.likeSauce);

/* Export router */
module.exports = router;