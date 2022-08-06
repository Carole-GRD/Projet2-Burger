const ingredientController = require('../controllers/ingredient-controller');

const idValidation = require('../middlewares/idValidation');
const bodyValidation = require('../middlewares/bodyValidation');
const ingredientValidator = require('../validators/ingredient-validator');

const ingredientRouter = require('express').Router();

ingredientRouter.route('/')
    .get(ingredientController.getAll)
    .post(bodyValidation(ingredientValidator) , ingredientController.create);

ingredientRouter.route('/:id')
    .get(idValidation(), ingredientController.getById)
    .put(idValidation(), ingredientController.update)
    .delete(idValidation(), ingredientController.delete);


module.exports = ingredientRouter;