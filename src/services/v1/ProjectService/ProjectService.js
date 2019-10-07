const { 
    CreateRepository,DeleteRepository,EditRepository,GetByIDRepository,
    AddUsersToProjectRepository,MinMaxProjectScore,
 } = require('../../../repository/v1/ProjectRepository/ProjectRepository');
 const {FindUsersService} = require('../UserService/UserService')
 
/*
  * if you need to make calls to additional tables, data stores (Redis, for example), 
  * or call an external endpoint as part of creating the blogpost, add them to this service
*/
const CreateService = async (data, content) => {
  try {
    console.log('CreateService')
    let {project} = data;
    project.status = 'init';

    let config = {
      toBsonID : true,
    }

    let userResp = await FindUsersService(project.managers,config);
    if(!userResp.success){
      return userResp;
    }

    let userResp2 = await FindUsersService(project.participants,config);
    if(!userResp2.success){
      return userResp2;
    }


    project.managers     = userResp.data;
    project.participants = userResp2.data;

    return await CreateRepository(project, content)
    
  } catch(e) {
    throw new Error(e.message)
  }
}

/**
 * 
 * @param {*} data 
 * @param {*} content 
 */
const EditService = async (data, content) => {
    try {
      let {project} = data;
  
      let config = {
        toBsonID : true,
      }
  
      let userResp = await FindUsersService(project.managers,config);
      if(!userResp.success){
        return userResp;
      }
  
      let userResp2 = await FindUsersService(project.participants,config);
      if(!userResp2.success){
        return userResp2;
      }
  
      project.managers     = userResp.data;
      project.participants = userResp2.data;
      project.id           = data.id;

      return await EditRepository(project, content)
    } catch(e) {
      throw new Error(e.message)
    }
  }

  /**
   * 
   * @param {*} data 
   * @param {*} content 
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
   * @param {*} content 
   */
const GetByIDService = async (data, content) => {
    try {
    let {id} = data;

      return await GetByIDRepository(id, content)
    } catch(e) {
      throw new Error(e.message)
    }
  }
 
  /**
   * @param {*} data 
   * 
   */
const MinMaxProjectScoreService = async(data)=>{
  try {
    let {id} = data;

      return await MinMaxProjectScore(id)
    } catch(e) {
      throw new Error(e.message)
    }
}

module.exports = {
    CreateService,
    EditService,
    DeleteService,
    GetByIDService, MinMaxProjectScoreService
}