const Router = require('express')
const router = new Router()
const controller = require('./controller')
const authMiddleware = require('./authMiddleware')

// backend's routes 
router.post('/registration', controller.registration)
router.post('/login', controller.login)
router.get('/users', controller.getUsers)
router.post('/check', controller.checkToken)
router.post('/avatar', controller.uploadAvatar)
module.exports = router