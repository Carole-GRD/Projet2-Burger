const User = require('../models/user-model');

const argon2 = require('argon2');

const jwtUtils = require('../utils/jwt-utils');

const authController = {

    login : async (req, res) => {

        const { email, password } = req.body;

        const credentialFilter = {email : email};

        const user = await User.findOne(credentialFilter);

        if (!user) {
            return res.status(401).json({error : 'Bad credential'});
        }

        const isPasswordValid = await argon2.verify(user.password, password);

        if (!isPasswordValid) {
            return res.status(401).json({error : 'Bad credential'});
        }

        const token = await jwtUtils.generate(user);
        return res.status(200).json({token});

    },

    register : async (req, res) => {

        const { firstname, lastname, email, password, adress } = req.body;

        const hashedPassword = await argon2.hash(password);

        const userToInsert = User({
            firstname,
            lastname,
            email,
            password : hashedPassword,
            adress
        });

        await userToInsert.save();
        const token = await jwtUtils.generate(userToInsert);
        res.status(200).json({token});

    }

};


module.exports = authController;