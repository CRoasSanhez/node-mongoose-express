const {ObjectID} = require('mongodb');

const { 
    CreateRepository,DeleteRepository,EditRepository,GetByIDRepository,FindTasksArray,
    AddDeliveries,GetScoreAVGRepository,
 } = require('../../../repository/v1/TaskRepository/TaskRepository');

const {GetByIDService} = require('../ProjectService/ProjectService');
const {FindUsersService} = require('../UserService/UserService')
 
/*
  * if you need to make calls to additional tables, data stores (Redis, for example), 
  * or call an external endpoint as part of creating the blogpost, add them to this service
*/
const CreateService = async (data, content) => {
  try {
    let {task} = data;
    task.status = 'init';

    let projResp = await GetByIDService({id:data.projectID});
    if(!projResp.success){
        return projResp;
    }

    let content = {toBsonID:true};

    let userResp = await FindUsersService([task.manager],content);
    if(!userResp.success){
        return userResp;
    }

    task.project = projResp.data;
    task.manager = userResp.data;

    return await CreateRepository(task, content)
    
  } catch(e) {
    throw new Error(e.message);
  }
}

/**
 * 
 * @param {*} data 
 */
const EditService = async (data, content) => {
    try {
      let {task} = data;
  
      let projResp = await GetByIDService({id:task.project[0]});
      if(!projResp.success){
          return projResp;
      }
  
      let content = {toBsonID:true};
      let userResp = await FindUsersService(task.manager,content);
      if(!userResp.success){
          return userResp;
      }

      task.project  = projResp.data;
      task.manager  = userResp.data;
      task.id       = data.id;

      return await EditRepository(task, content);
    } catch(e) {
      throw new Error(e.message)
    }
}

/**
 * 
 * @param {*} data 
 */
const DeleteService = async (data, content) => {
    try {
    let {id} = data;
      return await DeleteRepository(id, content)
    } catch(e) {
      throw new Error(e.message)
    }
}

/**
 * 
 * @param {*} data 
 */
const GetTaskByIDService = async (data, content) => {
    try {
    let {id} = data;

      return await GetByIDRepository(id, content)
    } catch(e) {
      throw new Error(e.message)
    }
}

/**
 * 
 * @param {*} data 
 */
const AddDeliveryService=async(data,content)=>{
    try {
        let {delivery} = data;
        
        return await AddDeliveries(data.id, delivery)
    } catch(e) {
        throw new Error(e.message)
    }
}

const GetScoreAVG = async (id)=>{
    try {
        
        return await GetScoreAVGRepository(id)
    } catch(e) {
        throw new Error(e.message)
    }
}

/**
 * 
 * @param {*} data 
 */
const GetOperationService = async (data)=>{
    let operation = data.type;
    return await GetScoreAVG(data.id);
}

// const FindTasksService= async(arr=[],content)=>{

//     try{
//       if(content.toBsonID){
//         arr = arr.map((item)=>{
//           return ObjectID(item)
//         })
//       }
      
//       return await FindUsersArray(arr,content);
  
//     }catch(e){
//       throw new Error(e.message)
//     }
// }
 
module.exports = {
    CreateService,
    EditService,
    DeleteService,
    GetTaskByIDService,
    AddDeliveryService, GetOperationService,
}