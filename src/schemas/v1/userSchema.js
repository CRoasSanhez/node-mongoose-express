var {Schema} = require('mongoose');
var {CountrySchema} = require('./countrySchema')

const UserSchema = new Schema({
    name            : String,
    lastName        : String,
    curp            : String,
    rfc             : String,
    role            : String,
    adresses        : [String],
    nationalities   : [String],
    genre           : String,
    userName        : String,
    password        : String,
    email           : String,
    status          : String,
    // sessions        : [SessionSchema],
    token           : String,
    createdAt       : { type: Date, default: Date.now, alias: 'created_at' },
    deletedAt       : Date,

},
{
    collection: 'Users'
});

const SessionSchema = new Schema({
    createdAt   : { type: Date, default: Date.now },
    expiresAt   : Date,
    type        : String,

})

module.exports = {
    UserSchema
}