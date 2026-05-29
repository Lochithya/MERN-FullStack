import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken' ; 

export function getUsers(req,res){

    User.find().then((users)=>{
        res.json(users);           // finding all the user documents in the mongodb database and sending them as a response to the sender of the request
    })
}

export function createUsers(req,res){

    const passwordHash = bcrypt.hashSync(req.body.password,10) ;           // hashing the password using bcrypt library with a salt rounds of 10

    const userData = {
        firstName : req.body.firstName ,
        lastName : req.body.lastName ,
        password  : passwordHash ,
        email : req.body.email ,
        phone : req.body.phone , 
    }

    const user = new User(userData) ; 

    user.save().then(()=>{
        res.json({"message" : "User saved to MongoDB"});           // sending a response to the sender of the request
    })
    .catch((err)=>{
        console.log("Error saving user to MongoDB",err);           // logging an error message if the save to the mongodb database fails
    })
}


export function loginUser(req,res){                     // function to handle user login requests

    const email = req.body.email ;
    const password = req.body.password ;

    User.findOne({
        email : email 
    }).then((user)=>{
        if(!user){
            res.status(404).json({
                "message" : "User not found"
            }) ;           // if no user is found with the provided email , send a response to the sender of the request
            return ; 
        }
        else{
            const isPasswordValid = bcrypt.compareSync(password,user.password) ;
            
            if(isPasswordValid){

                const token = jwt.sign({
                    firstName : user.firstName ,
                    lastName : user.lastName ,
                    email : user.email ,
                    role : user.role , 
                    isBlocked : user.isBlocked , 
                    isEmailVerified : user.isEmailVerified, 
                    image : user.image ,
                    phone : user.phone
                } , 
                    "cbc-6503"                    // secret key for signing the JWT token. In a production environment, this should be stored in an environment variable and not hardcoded in the codebase.
                )

                res.json({
                    token : token , 
                    "message" : "Login successful"
                })
            }
            else{
                res.status(401).json({
                    "message" : "Invalid password"
                })
            }
        }
    })
}