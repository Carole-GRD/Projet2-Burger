
const bodyValidation = (yupValidator) => {

    return async (req, res, next) => {

        try {
            const validData = await yupValidator.noUnknown().validate(req.body, {abortEarly : false});

            req.body = validData;

            next();
        } 
        
        catch (error) {
            console.log(error);
            // -> utile pour la recherche d'erreur dans les fichiers "validators"
            return res.sendStatus(400);
        }

    }

};

module.exports = bodyValidation;