var {Schema} = require('mongoose');
var {UserSchema} = require('./userSchema')

// model['Child']=UserSchema;
const ProjectSchema = new Schema({
    name            : String,
    type            : String,
    tags            : [String],
    managers        : [UserSchema],
    participants    : [UserSchema],
    status          : String,
    createdAt       : { type: Date, default: Date.now, alias: 'created_at' },
    updatedAt       : { type:Date, alias: 'updated_at'},
    completeddAt    : { type:Date, alias: 'completed_at'},
},
{
    collection: 'Projects'
});


module.exports = {
    ProjectSchema
}
