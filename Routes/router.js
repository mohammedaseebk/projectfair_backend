//path to resolve client Request

//import express 
const express = require('express')

//import controller
const userController = require('../controllers/useController')

//import project controller
const projectController = require('../controllers/projectController')
//import jwt middleware
const jwtMiddleware =require('../Middleware/jwtMiddleware')

//import multer
const multerConfig = require('../Middleware/multerMiddleware')

//2) create an object for the class router in express
const router = new express.Router()


//3) path for resolving the request
    //syntax - router.httprequest('path to resolve request',()=>{how to resolve the request(inside controller)})
  //a) Register
    router.post('/user/register',userController.register)

    //b)login
    router.post('/user/login',userController.login)

    //c)add projects

    router.post('/project/add',jwtMiddleware,multerConfig.single('projectImage'),projectController.addProject)


    //get home project

    router.get('/projects/home-project',projectController.getHomeProject)

    //get allproject

    router.get('/projects/all-project',jwtMiddleware,projectController.getAllProject)

    //get user project

    router.get('/user/all-project',jwtMiddleware,projectController.getUserProject)


    //edit project 
    router.put('/project/edit/:id',jwtMiddleware,multerConfig.single('projectImage'),projectController.editUserProject)


    //delete project

    router.delete('/project/remove/:id',jwtMiddleware,projectController.deleteUserProject)

    //edit Profile
    router.put('/user/edit',jwtMiddleware,multerConfig.single('profile'),userController.editUser)
    


//4)export router 
module.exports = router
