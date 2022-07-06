/* importatMongoose */
const mongoose = require('mongoose');

/* Import unique validator */
const uniqueValidator = require('mongoose-unique-validator');

/* Creation of data schema */
const userSchema =  mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: {type: String, required: true}
});

/* Apply unique validator to schema */
userSchema.plugin(uniqueValidator);

/* Export schema as model */
module.exports = mongoose.model('User', userSchema);