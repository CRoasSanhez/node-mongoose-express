var {Schema, Mongoose} = require('mongoose');
var {UserSchema} = require('./userSchema');
var {ProjectSchema} = require('./projectSchema')

const DeliveySchema = new Schema({
    userID      : { type: 'ObjectId', ref: 'Users' },
    userName    : String,
    email       : String,
    description : String,
    score       : Number,
    type        : String,
    createdAt   : { type: Date, default: Date.now, alias: 'created_at' },    
    expiresAt   : { type:Date, alias: 'expires_at'},

})

const TaskSchema = new Schema({
    name            : String,
    type            : String,
    description     : String,
    relatedTasks    : [String],
    manager         : [UserSchema],
    project         : [ProjectSchema],
    deliveries      : [DeliveySchema],
    status          : String,
    createdAt       : { type: Date, default: Date.now, alias: 'created_at' },
    updatedAt       : { type:Date, alias: 'updated_at'},
    completeddAt    : { type:Date, alias: 'completed_at'},

},
{
    collection: 'Tasks'
});


module.exports = {
    TaskSchema,
    DeliveySchema,
}
