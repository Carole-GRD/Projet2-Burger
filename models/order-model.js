const { Schema, model, Types } = require('mongoose');

// on importe les models auquels ont fait référence
const User = require('./user-model');
const Burger = require('./burger-model');

const orderSchema = new Schema({
    userId : {
        type : Types.ObjectId,
        ref : User,
        require : true
    },
    burgers : [{
        burgerId : {
            type : Types.ObjectId,
            ref : Burger,
            require : true},
        ingredientsSuppl : [{
            type : String,
            enum : ['oignons', 'salade', 'tomates', 'moutarde']
        }]
    }],
    statusOrder : {
        type : String,
        enum : ['Created', 'Pending', 'Done'],
        default : 'Created',
        require : true
    }
}, {
    collection : 'Order',
    timestamps : true
});


const Order = model('Order', orderSchema);
module.exports = Order;