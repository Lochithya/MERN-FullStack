import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';                 // for cleaning the request body
import productRouter from './routers/productRouter.js';        // importing the productRouter from the productRouter.js file
import userRouter from './routers/userRouter.js';          // importing the userRouter from the userRouter.js file
import jwt from 'jsonwebtoken' ;
import dotenv from 'dotenv' ; 


const app = express();           // complete backend code for express server

dotenv.config() ;          // loading environment variables from the .env file

app.use(bodyParser.json());           // using body-parser middleware to parse the request body as JSON

app.use( (req,res,next)=>{
    const token = req.header("authorization") ;           // getting the token from the request headers
    
    if(token){
        const newToken = token.replace("Bearer ","") ;           // removing the "Bearer " prefix from the token
        
        jwt.verify(newToken,process.env.secret_key,(err,decoded)=>{          // verifying the token using the jwt library and a secret key. In a production environment, the secret key should be stored in an environment variable and not hardcoded in the codebase.
            
            if(decoded == null){
                res.status(403).json({
                    message : "Invalid token"
                })

            }else{
                req.user = decoded ;           // if the token is valid , add the decoded token data to the request object as a user property
                next();                        // move on to the next middleware function 
            }
        })
    }
    else{
        next();         // if no token is provided in the request headers , req.user becomes null and move on to the next middleware function 
    }
    
    
})


app.use('/api/users',userRouter);          // if requests are made to the /users encpoint , use the userRouter to handle those requests
app.use('/api/products',productRouter) ;        // if requests are made to the /products encpoint , use the productRouter to handle those requests


// MongoDB connection
const connectionString =  process.env.MONGO_URL         // connection string of the mongodb database with the password and username  


mongoose.connect(connectionString).then(() =>{
    console.log("Connected to MongoDB");           // connecting to the mongodb database and logging a message if the connection is successful
}).catch((err)=>{
    console.log("Error connecting to MongoDB",err);           // logging an error message if the connection to the mongodb database fails
}) ; 


 
app.listen(5050,()=>{
    console.log("Server is running on port 5050");         // connecting the server to the port 5050 and listening for requests
})


