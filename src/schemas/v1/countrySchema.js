var {Schema} = require('mongoose');

const CountrySchema = new Schema({
    name            : String,
    code            : String,
    nationality     : String,
    status          : String,
    createdAt       : { type: Date, default: Date.now, alias: 'created_at' },

},
{
    collection: 'Countries'
});

module.exports = {
    CountrySchema
}