const { Schema, model } = require('mongoose');

const ingredientSchema = new Schema({
    viande : {
        type : String,
        trim : true
    },
    pain : {
        type : String,
        trim : true
    },
    garniture : {
        type : String,
        trim : true
    },
    sauce : {
        type : String,
        trim : true
    },
    poisson : {
        type : String,
        trim : true
    }
}, {
    collection : 'Ingredient',
    timestamps : true
});

const Ingredient = model('Ingredient', ingredientSchema);
module.exports = Ingredient;