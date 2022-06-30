/* Importation du modèle de sauce */
const Sauce = require('../models/Sauce');

/* importation du package fs pour accéder à la gestion du système de fichiers*/
const fs = require('fs');

/* POST pour créer une sauce */
exports.createSauce = (req, res, next) => 
{
    const sauceObject = JSON.parse(req.body.sauce);
    console.log(sauceObject);
    //delete sauceObject._id;
    const sauce = new Sauce(
    {
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
    .then(() => res.status(201).json({ message: 'Sauce enregistrée' }))
    .catch(error => res.status(400).json({ message: error }))};

/* méthode GET pour récupérer toutes les sauces*/
exports.getAllSauces = (req, res, next) => 
{ 
    Sauce.find()
    .then((sauces) => {res.status(200).json(sauces);})
    .catch((error) => {console.log(error);res.status(400).json({error: error});});      
};

/* GET pour récupérer une seule sauce*/
exports.findSauce = (req, res, next) => 
{
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => { res.status(200).json(sauce); })
        .catch((error) => { res.status(404).json({ error });});
};

/* PUT pour modifier une sauce */
 exports.updateSauce= (req, res, next) => 
 {
    const sauceObject = req.file ? 
    {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    } : { ...req.body};
    delete sauceObject._userId;
    Sauce.findOne({ _id: req.params.id })
    .then( sauce => 
    {
        if (sauce.userId != req.auth.userId)
        {
            res.status(401).json({message: 'Non autorisé'});
        }
        else
        {
            Sauce.updateOne({ _id: req.params.id}, { ...sauceObject, _id: req.params.id })
            .then (() => res.status(200).json({ message: 'Sauce modifiée'}))
            .catch(error => res.status(401).json({ error }));
        }
    })
    .catch ((error) => {res.status(400).json({ error})});
 };

 /* DELETE pour supprimer une sauce */
exports.deleteSauce= (req, res, next) => 
{
    Sauce.findOne({ _id: req.params.id })
    .then(sauce => 
    {
        if (sauce.userId != req.auth.userId)
        {
            res.status(401).json({message: 'Non autorisé'});
        }
        else
        {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () =>
            {
                Sauce.deleteOne({ _id: req.params.id })
                .then (() => res.status(200).json({ message: 'Sauce supprimée'}))
                .catch( error => {res.status(401).json({ error})});
            });
        }
    })      
    .catch((error) => {res.status(500).json({error: error});});
};

/* POST pour "liker" une sauce*/
exports.likeSauce= (req, res, next) => 
{

};
