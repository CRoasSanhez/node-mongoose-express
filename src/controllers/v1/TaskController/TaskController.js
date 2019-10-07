const { 
    CreateService,
    DeleteService,
    EditService,
    GetTaskByIDService,
    AddDeliveryService,GetOperationService,
   } = require('../../../services/v1/TaskService/TaskService');
  const {normalizeRequest} = require('../../../util/util')
   
   
  /*
   * 
  */
  const Create = async (req, res, next) => {
    let data            = normalizeRequest(req);
    let content = {};
    try {
      let resp = await CreateService(data, content)
      return res.status(201).json(resp)
    } catch(e) {
      console.log(e.message)
      return res.status(400).json(e)
    }
  }
  
  /*
   * 
  */
  const Update = async (req, res, next) => {
    let data            = normalizeRequest(req);
    let content = {};
  
    try {
      let resp = await EditService(data, content)
      return res.status(200).json(resp)
    } catch(e) {
      console.log(e.message)
      return res.status(400).json(e)
    }
  }
  
  /*
   * 
  */
  const GetByID = async (req, res, next) => {
    let data            = normalizeRequest(req);
    let content = {};
  
  
    try {
      let resp = await GetTaskByIDService(data, content)
      return res.status(200).json(resp)
    } catch(e) {
      console.log(e.message)
      return res.status(400).json(e)
    }
  }
  
  /*
   * 
  */
  const Delete = async (req, res, next) => {
    let data            = normalizeRequest(req);
    let content = {};
  
    try {
      let resp = await DeleteService(data, content)
      return res.status(200).json(resp)
    } catch(e) {
      console.log(e.message)
      return res.status(400).json(e)
    }
  }

  const AddDelivery = async(req,res,next)=>{
    let data            = normalizeRequest(req);
    let content = {};
  
    try {
      let resp = await AddDeliveryService(data, content)
      return res.status(200).json(resp)
    } catch(e) {
      console.log(e.message)
      return res.status(400).json(e)
    }
  }

  const GetOperation = async(req,res,next)=>{
    let data            = normalizeRequest(req);
    let content = {};
  
    try {
      let resp = await GetOperationService(data)
      return res.status(200).json(resp)
    } catch(e) {
      console.log(e.message)
      return res.status(400).json(e)
    }
  }
   
  module.exports = {
    Create,
    GetByID,
    Update,
    Delete,
    AddDelivery,GetOperation
  }
  