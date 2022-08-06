const yup = require('yup');

const idRegex = /^[a-f\d]{24}$/i;
const statusRegex = /^(created)|(pending)|(done)$/i;

const createOrderValidator = yup.object({
    userId : yup.string().required().matches(idRegex),
    burgers : yup.array()
        .of(yup.object({
            burgerId : yup.string().required().matches(idRegex),
            ingredientsSuppl : yup.array().of(yup.string())
        })),
    statusOrder : yup.string().required().matches(statusRegex)
});

const updateOrderValidator = yup.object({
    burgers : yup.array()
        .of(yup.object({
            burgerId : yup.string().required().matches(idRegex),
            ingredientsSuppl : yup.array().of(yup.string())
        })),
    statusOrder : yup.string().required().matches(statusRegex)
});

module.exports = { createOrderValidator, updateOrderValidator };
