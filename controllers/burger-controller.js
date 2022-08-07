const Burger = require("../models/burger-model");


const burgerController = {

    getAll : async (req, res) => {

        const offset = req.query.offset ? req.query.offset : 0;
        const limit = req.query.limit ? req.query.limit : 10;

        // le filtre "allergenFilter" sert à supprimer les burgers qui contiennent un allergène de la liste des burgers  
        // -> grâce aux opérateurs "$nin"  et  "$ne"
        let allergenFilter;
        const allergenQuery = req.query.allergen;
        if (allergenQuery) {
            if (Array.isArray(allergenQuery)) {
                allergenFilter = {allergen : {$nin : allergenQuery}};
            }
            else {
                allergenFilter = {allergen : {$ne : allergenQuery}};
            }
        }
        else {
            allergenFilter = {};
        }

        const burgers = await Burger.find(allergenFilter)
        .select({ 
            burgerName : 1, 
            ingredient : 1, 
            allergen : 1, 
            price : 1, 
            availability : 1
        })
        .limit(limit)
        .skip(offset);
        res.status(200).json(burgers);

    },

    getById : async (req, res) => {

        const id = req.params.id;
        const burger = await Burger.findById(id);
        if (!burger) {
            return res.sendStatus(404);
        }
        res.status(200).json(burger);

    },

    create : async (req, res) => {
        
        const burgerToAdd = Burger(req.body);
        await burgerToAdd.save();
        res.status(200).json(burgerToAdd);

    },

    update : async (req, res) => {
        
        const id = req.params.id;
        const { burgerName, ingredients, allergen, price, availability } = req.body;
        const burgerToUpdate = await Burger.findByIdAndUpdate(id, {
            burgerName,
            ingredients,
            allergen,
            price,
            availability
        }, { returnDocument : 'after' });
        if (!burgerToUpdate) {
            return res.sendStatus(404);
        };
        res.status(200).json(burgerToUpdate);

    },

    delete : async (req, res) => {
        
        const id = req.params.id;
        const burgerToDelete = await Burger.findByIdAndDelete(id);
        if (!burgerToDelete) {
            return res.sendStatus(404);
        }
        res.sendStatus(204);
    }

};

module.exports = burgerController;