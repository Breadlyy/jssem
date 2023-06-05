const User = require('./User');
const bcrypt = require('bcryptjs')
const {secretKey} = require("./config") 
const config = require('./config')
const jwt = require('jsonwebtoken')
const uuid = require('uuid')
const Joi = require('joi');


  //registration pattern
  const registrationSchema = Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(/^[+]?(?:\d{1,3}[-\s]?|\(\d{1,3}\))?\d{3}[-\s]?\d{3}[-\s]?\d{3}$/).required(),
    pass: Joi.string().pattern(/^(?=.*[a-zA-Z]{5,})(?=.*\d{2,}).*$/).required()
  });
  //login pattern
  const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    pass: Joi.string().pattern(/^(?=.*[a-zA-Z]{5,})(?=.*\d{2,}).*$/).required()
  });

class Controller
{
    async registration(req, res)
    {
        try{
            debugger
            const{firstname, lastname, email, phone, pass} = req.body
            const { error } = registrationSchema.validate(req.body);
            if (error) {
              return res.status(400).json({ message: error.details[0].message });
            }
            //hashing password
            const hashPassword = bcrypt.hashSync(pass, 7);
            const user = new User({firstname, lastname, email, phone,  password: hashPassword })
            //saving user
            await user.save()
            //creating token
            const token = jwt.sign({ userId: user._id, email: user.email }, secretKey, {expiresIn: "24h"});
            const login_user = {firstname: user.firstname, lastname: user.lastname, email: user.email, phone: user.phone, token: token}
            return res.json({login_user})
        }
        catch(e)
        {
            console.log(e)
            res.status(400).json({message: 'Registration error'})
        }
    }
    async login(req, res)
    {
       try{
            const{email, pass} = req.body
            const { error } = loginSchema.validate(req.body);
            if (error) {
              return res.status(400).json({ message: error.details[0].message });
            }
            //search the user
            const user = await User.findOne({email});
            if(!user)
            {
                return res.status(400).json({message: `User ${email} wasn't found`})
            }
            //comparing raw and hashed password
            const validPassword = bcrypt.compareSync(pass, user.password)
            if(!validPassword)
            {
                return res.status(400).json({message: `invalid password`})
            }
            const token = jwt.sign({ userId: user._id, email: user.email }, secretKey, {expiresIn: "24h"});
            const login_user = {firstname: user.firstname, lastname: user.lastname, email: user.email, phone: user.phone, token: token}
            return res.json({login_user})
       }
       catch(e)
       {
        console.log(e)
        res.status(400).json({message: 'Log in error'})
       } 
    }
    async getUsers(req, res)
    {
        try{
         const users = await User.find()
         res.json(users)
        }
        catch(e)
        {
            console.log(e)
        }
    }
    async checkToken(req, res)
    {
        const {token} = req.body
        try
        {
            if(!token)
            {
                return res.status(403).json({message: "User is not authorized"})
            }
            const decodedData = jwt.verify(token, secretKey)
            req.user = decodedData
           return res.json(token)
         
        }
         catch(e)
        {
            console.log(e)
            return res.status(403).json({message: "User is not authorized"})
        }
    }
 
    async uploadAvatar(req, res) {
        try {
            const file = req.avatar
            const user = await User.findById(req.userId)
            const avatarName = uuid.v4() + ".jpg"
            //file.mv(config.staticPath + "\\" + avatarName)
            const destinationPath = config.staticPath + "\\" + avatarName
            moveFile(file, destinationPath)
            .then(() => {
              // Файл успешно перемещен
              res.status(200).send('File moved successfully');
            })
            .catch(error => {
              // Ошибка при перемещении файла
              console.error(error);
              res.status(500).send('Error moving file');
            });
            user.avatar = avatarName
            await user.save()
            return res.json({message: "Avatar was uploaded"})
        } catch (e) {
            console.log(e)
            return res.status(400).json({message: 'Upload avatar error'})
        }
    }
    
}

module.exports = new Controller();