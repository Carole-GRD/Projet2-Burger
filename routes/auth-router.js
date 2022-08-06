const authController = require('../controllers/auth-controller');

// on importe le middleware et les validators
const bodyValidation = require('../middlewares/bodyValidation');
const { loginValidator, registerValidator } = require('../validators/auth-validator');



// on importe le module express et on utilise la méthode Router()
const authRouter = require('express').Router();

// configuration des routes
authRouter.route('/login')
    .post(bodyValidation(loginValidator), authController.login);

authRouter.route('/register')
    .post(bodyValidation(registerValidator), authController.register);

// on exporte le router "enfant"
module.exports = authRouter;