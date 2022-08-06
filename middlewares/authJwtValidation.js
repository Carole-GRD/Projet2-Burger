const User = require('../models/user-model');
const jwtUtils = require('../utils/jwt-utils');



const authentication = (roles) => {

    return async (req, res, next) => {

        const authHeader = req.headers['authorization'];
        // console.log(req.bearer);
        // console.log(authHeader);
        
        const token = authHeader ? authHeader.split(' ')[1] : false ;
        // console.log(token);
        // syntaxe plus courte :
        // const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.sendStatus(401);    // Unauthorized
        }

        let decodedToken;
        try {
            decodedToken = await jwtUtils.decode(token);
        }
        catch (error) {
            return res.sendStatus(403);     // Forbidden
        }

        if (roles) {

            const userDB = await User.findById(decodedToken.id);

            const userDBRole = userDB.role;

            if (!roles.includes(userDBRole)) {
                return res.sendStatus(403);
            }

        }

        req.user = decodedToken;      
        // on crée une nouvelle propriété "req.user" avec les infos de la personne
        // propriété comme : req.params, req.body, req.header, req.query
        // cette nouvelle propriété sera utilisée en front-end
        next();
    }

};

module.exports = authentication;