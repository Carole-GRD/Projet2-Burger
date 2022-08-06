// on importe les router "enfants"
const burgerRouter = require('./burger-router');
const orderRouter = require('./order-router');
const authRouter = require('./auth-router');
const userRouter = require('./user-router');
const ingredientRouter = require('./ingredient-router');

// on importe le module express et on utilise la méthode Router()
const router = require('express').Router();

// configuration des différentes routes
// on indique au serveur quel router utiliser une fois arrivé sur le segment 
router.use('/user', userRouter);
router.use('/burger', burgerRouter);
router.use('/order', orderRouter);
router.use('/auth', authRouter);
router.use('/ingredient', ingredientRouter);

// on exporte le router "parent"
module.exports = router;
