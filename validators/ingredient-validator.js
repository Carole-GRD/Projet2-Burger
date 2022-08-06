const yup = require('yup');

const ingredientValidator = yup.object({
    ingredient : yup.string().trim()
});

module.exports = ingredientValidator;

