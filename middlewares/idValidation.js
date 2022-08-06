const mongoose = require('mongoose');

const idValidation = () => {

    return (req, res, next) => {

        const id = req.params.id;

        if (!mongoose.isValidObjectId(id)) {
            return res.sendStatus(400);
        };     
        
        next();

    }

};

module.exports = idValidation;