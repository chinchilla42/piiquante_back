/* Importation de multer*/
const multer = require('multer');

/* Description des types de fichiers */
const MIME_TYPES = 
{
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

/* enregistrement des fichiers */
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

/* Exportation du middleware multer*/
module.exports = multer({ storage }).single('image');