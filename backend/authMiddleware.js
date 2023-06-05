const { model } = require("mongoose");
const jwt = require('jsonwebtoken')
const secretKey = require('./config')
const User = require('./User');

module.exports = function(req, res, next)
{
    if(req.method === 'OPTIONS')
    {
        next()
    }
    try
    {
        const token = req.header.authorization.split(' ')[1]
        if(!token)
        {
            return res.status(403).json({message: "User is not authorized"})
        }
        const decodedData = jwt.verify(token, secretKey)
        req.user = decodedData
        next()
        // User.findById(decodedToken.userId, (error, user) =>
        // {
        //     if (error) {
        //         return res.status(500).json({ error: 'Ошибка поиска пользователя' });
        //       }
        //       if (!user) {
        //         return res.status(401).json({ error: 'Пользователь не найден' });
        //       }
        //       return res.status(200).json({ message: 'Токен действителен' });
        // });
    }
     catch(e)
    {
        console.log(e)
        return res.status(403).json({message: "User is not authorized"})
    }
};