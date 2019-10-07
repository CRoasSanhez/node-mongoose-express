const { 
  CreateUserService,
  EditUserService,
  GetUserByIDService,
  DeleteUserService,
 } = require('../../../services/v1/UserService/UserService');
const {normalizeRequest} = require('../../../util/util')
 
 
/*
 * call other imported services, or same service but different functions here if you need to
*/
const Create = async (req, res, next) => {
  let data            = normalizeRequest(req);
  let content = {};
  try {
    let resp = await CreateUserService(data, content)
    return res.status(201).json({data:resp, success:true})
  } catch(e) {
    console.log(e.message)
    return res.status(400).json(e)
  }
}

/*
 * call other imported services, or same service but different functions here if you need to
*/
const Update = async (req, res, next) => {
  let data            = normalizeRequest(req);
  let content = {};

  try {
    let resp = await EditUserService(data, content)
    return res.status(200).json({data:resp, success:true})
  } catch(e) {
    console.log(e.message)
    return res.status(400).json(e)
  }
}

/*
 * call other imported services, or same service but different functions here if you need to
*/
const GetByID = async (req, res, next) => {
  let data            = normalizeRequest(req);
  let content = {};


  try {
    let resp = await GetUserByIDService(data, content)
    return res.status(200).json({data:resp, success:true})
  } catch(e) {
    console.log(e.message)
    return res.status(400).json(e)
  }
}

/*
 * call other imported services, or same service but different functions here if you need to
*/
const Delete = async (req, res, next) => {
  let data            = normalizeRequest(req);
  let content = {};

  try {
    let resp = await DeleteUserService(data, content)
    return res.status(200).json({data:resp, success:true})
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
}
