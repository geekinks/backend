const express = require('express')
const router = express.Router()
const welcomeController = require('../controllers/welcomeController')
const faizuController = require('../controllers/faizuController')
const kalifaController = require('../controllers/kalifaController')


// welcome routes
router.get('/', welcomeController.welcome)
router.get('/faizu', faizuController.greetFaizu)
router.get('/kalifa', kalifaController.greetKalifa)

module.exports = router