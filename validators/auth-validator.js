const yup = require('yup');

const pwdRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W|_]).+$/;
// const roleRegex = /^(Admin)|(User)$/i;

const registerValidator = yup.object({
    firstname : yup.string().trim().required().max(150),
    lastname : yup.string().trim().required().max(150),
    email : yup.string().trim().email().required().max(255),
    password : yup.string().required().min(8).max(64).matches(pwdRegex),
    adress : yup.string().trim().max(255),
    // role : yup.string().trim().required().matches(roleRegex)
});

const loginValidator = yup.object({
    email : yup.string().trim().email().required().max(255),
    password : yup.string().required()
});


module.exports = { registerValidator, loginValidator };