/* importation de Mongoos */
const mongoose = require('mongoose');

/* importation du validateur unique */
const uniqueValidator = require('mongoose-unique-validator');

/* Création du schéma de données */
const userSchema =  mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: {type: String, required: true}
});

/* Application du validateur unique au schéma */
userSchema.plugin(uniqueValidator);

/* Exportation du modèle*/
module.exports = mongoose.model('User', userSchema);