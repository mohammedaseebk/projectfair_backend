//import model
const users = require('../Models/userSchema')

//import jwt
const jwt = require('jsonwebtoken')

//logic for register 
exports.register =async(req,res)=>{
      //logic
      console.log('inside userController-register logic');
      //destructuring data from the client request body (since json format is covertes into javascript object by the .json( method used in index .js file))
      const {username, email,password}= req.body


     try{ //since email is the unique value we are checking that email is already parent in the database 
      //for that we are using findOne method which return entire document when the condition is true else return null

         const existingUser = await users.findOne({email})

         if(existingUser){
            //if findOne return document it means that the user already exist
            //so we are sending a response in the 400 series (client request error)
            res.status(406).json('Account already Exist ....please Login')                                    //406 is the client eror
         }
         else{
            //if findOne returns null , it mean the email or the user doesnt exist in the database 
            //we register the user 
                  //1)create an object for the model
                  const newUser = new users({
                        username,
                        email,
                        password,
                        github:"",
                        linkedin:"",
                        profile:""
                  })
                  //2)add the above object use save() method in mongoose
                  await newUser.save()

            //response 
      res.status(200).json(newUser)
            
         }
      }
      //javascript resolve runtime error using try catch block
      catch(err){
            res.status(401).json('Register Request Failed due to ',err)
      }

      
}

//logic for login 

exports.login =async(req,res)=>{
      console.log('inside login function');

      const {email,password} = req.body

     try{ const existingUser = await users.findOne({email,password})

     if(existingUser){
            //sign is the function is used to create token
         const token =  jwt.sign({userId: existingUser._id},"fzsecretekey8775")
            res.status(200).json({
                  existingUser,
                  token
            })
     }
     else{
            res.status(404).json('Invalid email id or password')

     }
}
catch(err){
      res.status(401).json('login request failed due to ',err)
}
}


//edit profile
exports.editUser = async(req,res)=>{
      const userId = req.payload
      const{username,email,password,github,linkedin,profile}= req.body

      const profileImage = req.file?req.file.filename:profile

      try{
            const updateUser = await users.findByIdAndUpdate({_id:userId},{username,email,password,github,linkedin,profile:profileImage},{new:true})

            await updateUser.save()
            res.status(200).json(updateUser)

      }catch (err){
            res.status(401).json(err)
      }
}
