const Order = require("../models/order-model");


const orderController = {

    getAll : async (req, res) => {
        // console.log(req.query);

        const offset = req.query.offset ? req.query.offset : 0;
        const limit = req.query.limit ? req.query.limit : 10;

        let statusFilter;
        const status = req.query.status;
        if (status) {
            if (Array.isArray(status)){
                statusFilter = {statusOrder : {$in : status}};
            }
            else {
                statusFilter = {statusOrder : status};
            }
        }
        else {
            statusFilter = {};
        }


        const orders = await Order.find(statusFilter)
        .populate({
            path : 'userId',
            select : { firstname : 1, lastname : 1, email : 1, adress : 1 }
        })
        .populate({
            path : 'burgers.burgerId',
            select : { burgerName : 1, price : 1 }
        })
        .limit(limit)
        .skip(offset);

        const count = await Order.countDocuments();
        const data = { 'Orders' : orders, 'Count' : count };
        res.status(200).json(data);

    },

    getById : async (req, res) => {

        const id = req.params.id;
        const order = await Order.findById(id)
        .populate({
            path : 'userId',
            select : { firstname : 1, lastname : 1, email : 1, adress : 1 }
        })
        .populate({
            path : 'burgers.burgerId',
            select : { burgerName : 1, price : 1 }
        });
        if (!order) {
            return res.sendStatus(404);
        }
        res.status(200).json(order);

    },

    getByUser : async (req, res) => {

        const offset = req.query.offset ? req.query.offset : 0;
        const limit = req.query.limit ? req.query.limit : 10;

        let statusFilter;
        const status = req.query.status;
        if (status) {
            if (Array.isArray(status)){
                statusFilter = {statusOrder : {$in : status}};
            }
            else {
                statusFilter = {statusOrder : status};
            }
        }
        else {
            statusFilter = {};
        }

        const idUser = req.params.id;
        let userFilter = { userId : idUser };
        const orders = await Order.find({$and : [userFilter, statusFilter]})
        .populate({
            path : 'userId',
            select : { firstname : 1, lastname : 1, email : 1, adress : 1 }
        })
        .populate({
            path : 'burgers.burgerId',
            select : { burgerName : 1, price : 1 }
        })
        .limit(limit)
        .skip(offset);

        if (!orders) {
            return res.sendStatus(404);
        };

        const count = await Order.countDocuments(userFilter);
        const data = { 'Orders' : orders, 'Count' : count };
        res.status(200).json(data);

    },

    // getByBurger : () => {},

    create : async (req, res) => {

        const orderToAdd = Order(req.body);
        await orderToAdd.save();
        res.status(200).json(orderToAdd);

    },

    update : async (req, res) => {

        const id = req.params.id;
        const { burgers, statusOrder } = req.body;
        const orderToUpdate = await Order.findByIdAndUpdate(id, {
            burgers,
            statusOrder
        }, { returnDocument : 'after' })
        .populate({
            path : 'userId',
            select : { firstname : 1, lastname : 1, email : 1, adress : 1 }
        })
        .populate({
            path : 'burgers.burgerId',
            select : { burgerName : 1, price : 1 }
        });
        if (!orderToUpdate) {
            return res.sendStatus(404);
        }
        res.status(200).json(orderToUpdate);

    },

    delete : async (req, res) => {

        const id = req.params.id;
        const orderToDelete = await Order.findByIdAndDelete(id);
        if (!orderToDelete) {
            return res.sendStatus(404);
        }
        res.sendStatus(204);

    }
}

module.exports = orderController;
