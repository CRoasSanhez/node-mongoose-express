const mongoose = require('mongoose')
const { ProjectSchema} = require('../../../schemas/v1/projectSchema');
const {TaskSchema} = require('../../../schemas/v1/taskSchema')

/**
 * 
 * @param {*} objIn 
 * @param {*} content 
 */
const CreateRepository = async(objIn, content) => {
   
   let ProjectModel = mongoose.model('Project',ProjectSchema);
   let objOut = await ProjectModel.create(objIn);
   if(!objOut)
   return {success:false,error:new Error("No project created")}

   return {success:true,data:objOut}
  }

  /**
   * 
   * @param {*} project 
   * @param {*} content 
   */
const EditRepository = async(project, content) => {
    
    let ProjectModel = mongoose.model('Project',ProjectSchema);

    let objOut = await ProjectModel.updateOne({_id:project.id},project);
    if(!objOut)
      return {success:false,error:new Error("No project updated")}

   return {success:true,data:objOut}
}

/**
 * 
 * @param {*} id 
 * @param {*} content 
 */
const GetByIDRepository = async(id, content) => {
    
    let ProjectModel = mongoose.model('Project',ProjectSchema);

    let objOut = await ProjectModel.findById(id);

    if(!objOut)
    return {success:false,error:new Error("No project found")}

    return {success:true,data:objOut}
    
 }

 /**
  * 
  * @param {*} id 
  * @param {*} content 
  */
 const DeleteRepository = async(id, content) => {
    
    let ProjectModel = mongoose.model('Project',ProjectSchema);

    let objOut = await ProjectModel.findByIdAndUpdate(id,{"$set":{status:"canceled"}});

    if(!objOut)
    return {success:false,error:new Error("No project found")}

    return {success:true,data:objOut}
 }

 /**
  * 
  * @param {*} users 
  * @param {String} type managers || participants
  */
 const AddUsersToProjectRepository=async(users, type)=>{
    let ProjectModel = mongoose.model('Project', ProjectSchema);

    ProjectModel[type].push(users);

   return {success:true,data:objOut}
 }

 /**
  * 
  * @param {id} taskID 
  */
 const MinMaxProjectScore = async (taskID)=>{
   let TaskModel = mongoose.model('Task',TaskSchema);

   let unwindProject = TaskModel.aggregate([
      {
         "$unwind":"$project"
      },
      {
         "$unwind":"$deliveries"
      },
   ]);

   unwindProject.group({
         "_id": "$project._id",
         "countDeliveries": {"$sum": 1},
         "taskName": { $first: '$name' },
         "taskType": { $first: '$type' },
         "taskDescription":{ $first: '$description' },
         "maxTaskScore": { $max: '$deliveries.score' },
         "minTaskScore": { $min: '$deliveries.score' },
         "project": { $first: '$project' },
   })


   return new Promise(async(resolve,reject)=>{
      unwindProject.exec((err,result)=>{
         if(err) resolve({success:false, error: err.message});

         resolve({success:true,data:result});
      })
   })
 }
   
module.exports = {
    CreateRepository,
    EditRepository,
    GetByIDRepository,
    DeleteRepository,
    AddUsersToProjectRepository, MinMaxProjectScore,
  }