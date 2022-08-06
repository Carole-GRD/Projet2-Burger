// on importe le module express
// const express = require('express');
// méthode Router() 
const userRouter = require('express').Router();

// on importe le "userController" et ses fonctions
const userController = require('../controllers/user-controller');

// on importe les middlewares
const authentication = require('../middlewares/authJwtValidation');
const idValidation = require('../middlewares/idValidation');
const bodyValidation = require('../middlewares/bodyValidation');
// on importe le "user-validator" qui, avec le bodyValidation, valide les données créées ou modifiées
const userValidator = require('../validators/user-validator');

// configuration des différentes routes
userRouter.route('/')
    .get(userController.getAll);
    // .get(authentication(), userController.getAll);
    // .get(authentication(['Admin']), userController.getAll);

    // ------------------------------------------------------------------------
    // "post" est une route temporaire pour créer quelques "users" en attendant de faire le "register"
    //  à commenter ou à supprimer par la suite
    // .post(bodyValidation(userValidator), userController.create)     
    // ------------------------------------------------------------------------


userRouter.route('/:id')
    .get(idValidation(), userController.getById)
    .put(idValidation(), bodyValidation(userValidator), userController.update)
    .delete(idValidation(), userController.delete);
    // .get(authentication(['Admin']), idValidation(), userController.getById)
    // .put(authentication(['Admin']), idValidation(), bodyValidation(userValidator), userController.update)
    // .delete(authentication(['Admin']), idValidation(), userController.delete);

// on exporte le router "enfant"
module.exports = userRouter;