const yup = require('yup');

const ingredientValidator = yup.object({
    viande : yup.string().trim(),
    pain : yup.string().trim(),
    garniture : yup.array().of(yup.string().trim()),
    sauce : yup.string().trim(),
    poisson : yup.string().trim()
});

module.exports = ingredientValidator;

