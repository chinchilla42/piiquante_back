/* Import the sauce model*/
const Sauce = require('../models/Sauce');

/* import fs package to access file system mangement */
const fs = require('fs');
const { reset } = require('nodemon');

/* POST: create a sauce */
exports.createSauce = (req, res, next) => 
{
    const sauceObject = JSON.parse(req.body.sauce);
    //console.log(sauceObject);
    const sauce = new Sauce(
    {
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
    .then(() => res.status(201).json({ message: 'Sauce enregistrée' }))
    .catch(error => res.status(400).json({ message: error }))};

/* GET: get all sauces*/
exports.getAllSauces = (req, res, next) => 
{ 
    Sauce.find()
    .then((sauces) => {res.status(200).json(sauces);})
    .catch((error) => {console.log(error);res.status(400).json({error: error});});      
};

/* GET: get one sauce*/
exports.findSauce = (req, res, next) => 
{
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => { res.status(200).json(sauce); })
        .catch((error) => { res.status(404).json({ error });});
};

/* PUT: update a sauce */
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

 /* DELETE: delete a sauce */
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

/* POST: like a sauce*/
exports.likeSauce = (req, res, next) => 
{
    const like = req.body.like;
    const userId = req.body.userId;
    const sauceId = req.params.id;
    /* user likes a sauce */
    if (like === 1) 
    {
        Sauce.findOne({ _id: sauceId })
        .then ((sauce) =>
        {
            if (sauce.usersLiked.includes(userId) || sauce.usersDisliked.includes(userId))
            {
                res.status(401).json({ message : "Non autorisé" });
            }
            else 
            {
                Sauce.updateOne 
                (
                    { _id: sauceId },
                    {
                        $inc: { likes: + 1 },
                        $push: { usersLiked: userId },
                    })
                .then((sauce) => res.status(200).json({ message: "L'utilisateur aime cette sauce" }))
                .catch((error) => res.status(500).json({ error }));
            }
        })
    }   
    /* user dislikes a sauce */
    else if (like === -1) 
    {
        Sauce.findOne({ _id: sauceId })
        .then ((sauce) =>
        {
            if (sauce.usersLiked.includes(userId) || sauce.usersDisliked.includes(userId))
            {
                res.status(401).json({ message : "Non autorisé" });
            }
            else 
            {
                Sauce.updateOne 
                (
                    { _id: sauceId },
                    {
                        $inc: { dislikes: + 1 },
                        $push: { usersDisiked: userId },
                    })
                .then((sauce) => res.status(200).json({ message: "L'utilisateur aime cette sauce" }))
                .catch((error) => res.status(500).json({ error }));
            }
        })
    }
    /* user changes their mind */
    else
    {
        Sauce.findOne
        (
            { _id: sauceId },
        )
        .then((sauce) => {
            /* user "unlikes" a sauce */
            if (sauce.usersLiked.includes(userId)) 
            {
                Sauce.updateOne
                    (
                        { _id: sauceId },
                        {
                            $inc: { likes: - 1 },
                            $pull: { usersLiked: userId },
                        }
                    )
                    .then((sauce) => res.status(200).json({ message: "L'utilidateur n'aime plus cette sauce" }))
                    .catch((error) => res.status(500).json({ error }));
            }
            /* user "indislikes" a sauce */
            else if (sauce.usersDisliked.includes(userId)) 
            {
                Sauce.updateOne
                    (
                        { _id: sauceId },
                        {
                            $inc: { dislikes: - 1 },
                            $pull: { usersDisliked: userId },
                        }
                    )
                    .then((sauce) => res.status(200).json({ message: "L'utilidateur aime cette sauce" }))
                    .catch((error) => res.status(500).json({ error }));
            }
        })
        .catch ((error) => res.status(401).json({ error }));
    }
};
