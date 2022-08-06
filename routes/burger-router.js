const burgerController = require('../controllers/burger-controller');
// on importe les middlewares et le validator
// const authentication = require('../middlewares/authJwtValidation');
const idValidation = require('../middlewares/idValidation');
const bodyValidation = require('../middlewares/bodyValidation');
const burgerValidator = require('../validators/burger-validator');



// on importe le module express et on utilise la méthode Router() 
const burgerRouter = require('express').Router();

// configuration des différentes routes
burgerRouter.route('/')
    .get(burgerController.getAll)
    .post(bodyValidation(burgerValidator), burgerController.create);
    // .post(authentication(['Admin']), bodyValidation(burgerValidator), burgerController.create);

burgerRouter.route('/:id')
    .get(idValidation(), burgerController.getById)
    .put(idValidation(), bodyValidation(burgerValidator), burgerController.update)
    .delete(idValidation(), burgerController.delete);
    // .get(idValidation(), burgerController.getById)
    // .put(authentication(['Admin']), idValidation(), bodyValidation(burgerValidator), burgerController.update)
    // .delete(authentication(['Admin']), idValidation(), burgerController.delete);

// on exporte le router "enfant"
module.exports = burgerRouter;