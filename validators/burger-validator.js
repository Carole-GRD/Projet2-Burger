const yup = require('yup');

const idRegex = /^[a-f\d]{24}$/i;

const burgerValidator = yup.object({
    burgerName : yup.string().trim().required().max(30),
    ingredientId : yup.array().of(yup.string().required().matches(idRegex)),
    // ingredientId : yup.array()
    //     .of(yup.object({name : yup.string().matches(idRegex)})),
    allergen : yup.array().of(yup.string().required()),
    price : yup.number().required().positive(),
    availability : yup.string().trim().required()
});

module.exports = burgerValidator;
