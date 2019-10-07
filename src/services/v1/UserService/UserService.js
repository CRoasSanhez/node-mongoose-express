const {Types}=require('mongoose');
const {ObjectID} = require('mongodb');

const {HashString} = require('../../../util/encryption');
const { 
    CreateUserRepository, EditUserRepository, GetUserByIDRepository, DeleteUserRepository, FindUsersArray,
 } = require('../../../repository/v1/UserRepository/UserRepository');
 
/*
  * if you need to make calls to additional tables, data stores (Redis, for example), 
  * or call an external endpoint as part of creating the blogpost, add them to this service
*/
const CreateUserService = async (data, content) => {
  try {
    let {user} = data;
    user.password = HashString(user.password);
    user.status = 'init';
    return await CreateUserRepository(user, content)
  } catch(e) {
    throw new Error(e.message)
  }
}

const EditUserService = async (data, content) => {
    try {
    let {user} = data;
    user.id = data.id;
      return await EditUserRepository(user, content)
    } catch(e) {
      throw new Error(e.message)
    }
  }

const DeleteUserService = async (data, content) => {
    try {
    let {id} = data;
      return await DeleteUserRepository(id, content)
    } catch(e) {
      throw new Error(e.message)
    }
  }

const GetUserByIDService = async (data, content) => {
    try {
    let {id} = data;

      return await GetUserByIDRepository(id, content)
    } catch(e) {
      throw new Error(e.message)
    }
  }

const FindUsersService= async(arr=[],content)=>{

  try{
    if(content.toBsonID){
      arr = arr.map((item)=>{
        return ObjectID(item)
      })
    }
    
    return await FindUsersArray(arr,content);

  }catch(e){
    throw new Error(e.message)
  }
}
 
module.exports = {
    CreateUserService,
    EditUserService,
    DeleteUserService,
    GetUserByIDService,
    FindUsersService,
}