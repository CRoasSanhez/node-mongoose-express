const express               = require('express');
const LoginController       = require('../../controllers/v1/loginController/LoginController');
const UserController        = require('../../controllers/v1/UserController/UserController');
const ProjectController        = require('../../controllers/v1/ProjectController/ProjectController');
const TaskController        = require('../../controllers/v1/TaskController/TaskController');


router = express.Router();

router.post('/login',LoginController.Login);

router.post('/user',UserController.Create);
router.patch('/user/:id',UserController.Update);
router.delete('/user/:id',UserController.Delete);
router.get('/user/:id',UserController.GetByID);


router.post('/project',ProjectController.Create);
router.patch('/project/:id',ProjectController.Update);
router.delete('/project/:id',ProjectController.Delete);
router.get('/project/:id',ProjectController.GetByID);

router.get('/projects/ops/:type',ProjectController.MinMaxScore);


router.post('/task/:projectID',TaskController.Create);
router.patch('/task/:id',TaskController.Update);
router.delete('/task/:id',TaskController.Delete);
router.get('/task/:id',TaskController.GetByID);

router.post('/task/:id/delivery',TaskController.AddDelivery);
router.get('/tasks/ops/:type',TaskController.GetOperation);



module.exports = router;