// userDTO ou .select()  -> dans ce projet : méthode .select() choisie
// const userDTO = require("../dto/user-dto");

const User = require("../models/user-model");

// userDTO ou .select()  -> dans ce projet : méthode .select() choisie
// const userMapperToDTO = user => new userDTO(user.id, user.firstname, user.lastname, user.email, user.adress);

// fonctions appelées pour chaque routes
const userController = {
    // ----------------------------------------------------------------------------
    // à commenter ou à supprimer par la suite
    // j'ajoute temporairement la fonction "create" qui permet de créer quelques "users" pour tester dans insomnia, en attendant de faire le "register" 
    // create : async (req, res) => {
    //     const userToAdd = User(req.body);
    //     await userToAdd.save();
    //     res.status(200).json(userToAdd);
    // },
    // ----------------------------------------------------------------------------

    getAll : async (req, res) => {

        const offset = req.query.offset ? req.query.offset : 0;
        const limit = req.query.limit ? req.query.limit : 10;

        const users = await User.find()
        .select({ firstname : 1, lastname : 1, email : 1, adress : 1, role : 1})
        .skip(offset)
        .limit(limit);
        res.status(200).json(users);

    },

    getById : async (req, res) => {

        const id = req.params.id;
        const user = await User.findById(id)
        .select({ firstname : 1, lastname : 1, email : 1, adress : 1});
        if (!user) {
            return res.sendStatus(404);
        }
        res.status(200).json(user);

    },

    update : async (req, res) => {

        const id = req.params.id;
        const { firstname, lastname, email, adress } = req.body;
        const userToUpdate = await User.findByIdAndUpdate(id, {
            firstname,
            lastname,
            email,
            adress
        }, 
        { returnDocument : 'after' })
        .select({ firstname : 1, lastname : 1, email : 1, adress : 1});
        if (!userToUpdate) {
            return res.sendStatus(404);
        }
        res.status(200).json(userToUpdate);

    },

    delete : async (req, res) => {

        const id = req.params.id;
        const userToDelete = await User.findByIdAndDelete(id);
        if (!userToDelete) {
            return res.sendStatus(404);
        }
        res.sendStatus(204);
    }
};

// on exporte le controller
module.exports = userController;
