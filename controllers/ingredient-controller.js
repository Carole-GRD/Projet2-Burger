const Ingredient = require('../models/ingredient-model');


const ingredientController = {

    getAll : async (req, res) => {
        const ingredients = await Ingredient.find();
        res.status(200).json(ingredients);
    },

    getById : async (req, res) => {
        const id = req.params.id;
        const ingredient = await Ingredient.findById(id);
        if (!ingredient) {
            res.sendStatus(404);
        }
        res.status(200).json(ingredient);
    },

    create : async (req, res) => {
        const ingredientToAdd = Ingredient(req.body);
        await ingredientToAdd.save();
        res.status(200).json(ingredientToAdd);
    },

    update : async (req, res) => {

        const id = req.params.id;
        const { ingredient } = req.body;
        const ingredientToUpdate = await Ingredient.findByIdAndUpdate(id, {
            ingredient
        }, { returnDocument : 'after'});
        if (!ingredientToUpdate) {
            res.sendStatus(404);
        }
        res.status(200).json(ingredientToUpdate);
    },

    delete : async (req, res) => {
        const id = req.params.id;
        const ingredientToDelete = await Ingredient.findByIdAndDelete(id);
        if (!ingredientToDelete) {
            return res.sendStatus(404);
        }
        res.sendStatus(204);
    }

};

module.exports = ingredientController;
// à importer dans les routes 