const yup = require('yup');



const ingredientValidator = yup.object({
    name : yup.string().trim()
});

module.exports = ingredientValidator;

