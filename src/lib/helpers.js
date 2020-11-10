const bcrypt = require('bcryptjs');
const passport = require('passport');
const helpers = {};

helpers.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);//para generar un hash, entre mas grande sea la cifra mas segura es el cifrado pero tarda mas 
    const hash = await bcrypt.hash(password, salt); //se pasa el atributo a cifrar y el metodo, en este caso salt
    return hash;
};

helpers.matchPassword = async (password, savedPassword) => {
    try {
        return await bcrypt.compare(password, savedPassword);
    } catch (e) {
        console.log(e);
    }
};

module.exports = helpers;