//Especificar como va a comportarse la biblioteca time ago

const { format } = require('timeago.js');


const helpers = {};

helpers.timeago = (timestamp) => {
    return format(timestamp);
};

module.exports = helpers;