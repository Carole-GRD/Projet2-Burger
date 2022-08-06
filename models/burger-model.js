const { Schema, model, Types } = require('mongoose');
const Ingredient = require('./ingredient-model');

const burgerSchema = new Schema({
    burgerName : {
        type : String,
        require : true,
        unique : true,
        trim : true
    },
    ingredient : [{ 
            type : Types.ObjectId,    
            ref : Ingredient,
            require : true
    }],
    allergen : [{
        type : String,
        enum : ['lactose', 'gluten', 'none'],
        require : true
    }],
    price : {
        type : Number,
        require : true
    },
    availability : {
        type : String,
        enum : ['en stock', 'épuisé'],
        default : 'en stock'
        // en stock : boolean    true (ou false)
    }
}, {
    collection : 'Burger',
    timestamps : true
});

const Burger = model('Burger', burgerSchema);
module.exports = Burger;