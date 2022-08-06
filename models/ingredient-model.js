const { Schema, model } = require('mongoose');

const ingredientSchema = new Schema({
    ingredient : {
        type : String,
        trim : true
    }
}, {
    collection : 'Ingredient',
    timestamps : true
});

const Ingredient = model('Ingredient', ingredientSchema);
module.exports = Ingredient;