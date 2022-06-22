const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.header.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = jwt.decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw 'UserId non valable !';
        }
        else {
            next();
        }
    }
    catch (error) {
        res.status(401).json({ error: error | 'requête non authentifiée !'});
    }
};