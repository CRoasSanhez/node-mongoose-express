const {UserSchema} = require('../../../schemas/v1/userSchema');
const mongoose = require('mongoose')

const CreateUserRepository = async(user, content) => {
   
   let UserModel = mongoose.model('User', UserSchema);
   let userOut = await UserModel.create(user);
   if(!userOut)
   return {success:false,error:new Error("No user created")}

   return {success:true,data:userOut}
  }

const EditUserRepository = async(user, content) => {
    
    let UserModel = mongoose.model('User', UserSchema);
    let userOut = await UserModel.updateOne({_id:user.id},user);
    
    if(!userOut)
   return {success:false,error:new Error("No user updated")}

   return {success:true,data:userOut}
}

const GetUserByIDRepository = async(id, content) => {
    
    let UserModel = mongoose.model('User', UserSchema);

    let userOut = await UserModel.findById(id);

    if(!userOut)
    return {success:false,error:new Error("No user found")}

    return {success:true,data:userOut}
    
 }

 const DeleteUserRepository = async(id, content) => {
    
    let UserModel = mongoose.model('User', UserSchema);

    let userOut = await UserModel.findByIdAndUpdate(id,{"$set":{status:"deleted"}});

    if(!userOut)
    return {success:false,error:new Error("No user found")}

    return {success:true,data:userOut}
 }

const FindUsersArray = async(arr=[],content)=>{
   let UserModel = mongoose.model('User', UserSchema);
   let prop = content.prop || "_id";

   let qry = {
      [prop] : {
         '$in': arr
      }
   }
    let userOut = await UserModel.find(qry);
    if(!userOut)
    return {success:false,error:new Error("No user found")}

    return {success:true,data:userOut}
   
}
   
module.exports = {
    CreateUserRepository,
    EditUserRepository,
    GetUserByIDRepository,
    DeleteUserRepository,
    FindUsersArray,
  }