const mongoose = require('mongoose')
const { TaskSchema} = require('../../../schemas/v1/taskSchema');
const {ObjectID} = require('mongodb');

 /**
  * 
  * @param {*} id 
  * @param {*} content 
  */
const CreateRepository = async(objIn, content) => {
   let TaskModel = mongoose.model('Task',TaskSchema);
   let objOut = await TaskModel.create(objIn);
   if(!objOut)
   return {success:false,error:new Error("No task created")}

   return {success:true,data:objOut}
  }

/**
 * 
 * @param {*} id 
 * @param {*} content 
 */
const EditRepository = async(objIn, content) => {
    
    let TaskModel = mongoose.model('Task',TaskSchema);

    let objOut = await TaskModel.updateOne({_id:objIn.id},objIn);
    if(!objOut)
      return {success:false,error:new Error("No task updated")}

   return {success:true,data:objOut}
}

 /**
  * 
  * @param {*} id 
  * @param {*} content 
  */
const GetByIDRepository = async(id, content) => {
    
    let TaskModel = mongoose.model('Task',TaskSchema);

    let objOut = await TaskModel.findById(id);

    if(!objOut)
    return {success:false,error:new Error("No task found")}

    return {success:true,data:objOut}
    
 }

 /**
  * 
  * @param {*} id 
  * @param {*} content 
  */
 const DeleteRepository = async(id, content) => {
    
    let TaskModel = mongoose.model('Task',TaskSchema);

    let objOut = await TaskModel.findByIdAndUpdate(id,{"$set":{status:"canceled"}});

    if(!objOut)
    return {success:false,error:new Error("No task found")}

    return {success:true,data:objOut}
 }

 /**
  * 
  * @param {*} arr 
  * @param {*} content 
  */
 const FindTasksArray = async(arr=[],content)=>{
   let TaskModel = mongoose.model('Task', TaskSchema);
   let prop = content.prop || "_id";

   let qry = {
      [prop] : {
         '$in': arr
      }
   }
    let out = await TaskModel.find(qry);
    if(!out)
    return {success:false,error:new Error("No tasks found")}

    return {success:true,data:out}
   
}

 /**
  * 
  * @param {*} delivery 
  * @param {String} type managers || participants
  */
 const AddDeliveries=async(taskID,delivery)=>{

   let TaskModel = mongoose.model('Task',TaskSchema);
   let match = {
      "_id": ObjectID(taskID),
   }
   let qry={
      $push: { "deliveries": delivery }
   }

   let objOut = await TaskModel.findOneAndUpdate(match,qry)
   if(!objOut)
    return {success:false,error:new Error("No task found")}

    return {success:true,data:objOut}
 }

 /**
  * 
  * @param {id} taskID 
  */
 const GetScoreAVGRepository = async (taskID)=>{
   let TaskModel = mongoose.model('Task',TaskSchema);

   let unwindProject = TaskModel.aggregate([{
      "$unwind":"$deliveries"
   }]);

   unwindProject.group({
      "_id": "$_id",
      "count": {"$sum": 1},
      "avg": { "$avg": '$deliveries.score' },
      "task": { $first: '$name' },
      "type": { $first: '$type' },
      "description":{ $first: '$description' },
      "project": { $first: '$project' },
      "manager": { $first: '$manager' },
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
    AddDeliveries,
    FindTasksArray,GetScoreAVGRepository
  }