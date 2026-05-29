import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';                 // for cleaning the request body
import studentRouter from './routers/studentRouter.js';          // importing the studentRouter from the studentRouter.js file
import userRouter from './routers/userRouter.js';          // importing the userRouter from the userRouter.js file

const app = express();           // complete backend code for express server


app.use(bodyParser.json());           // using body-parser middleware to parse the request body as JSON

app.use( (req,res,next)=>{
    console.log("request received");
    next(); 
    
})


app.use('/students',studentRouter);          // if requests are made to the /students encpoint , use the studentRouter to handle those requests 
app.use('/users',userRouter);          // if requests are made to the /users encpoint , use the userRouter to handle those requests

// MongoDB connection 
const connectionString = "mongodb://lochithya:lochithya123@ac-z9bik8s-shard-00-00.t6q2szi.mongodb.net:27017,ac-z9bik8s-shard-00-01.t6q2szi.mongodb.net:27017,ac-z9bik8s-shard-00-02.t6q2szi.mongodb.net:27017/?ssl=true&replicaSet=atlas-104oqb-shard-0&authSource=admin&appName=Cluster0"          // connection string of the mongodb database with the password and username  


mongoose.connect(connectionString).then(() =>{
    console.log("Connected to MongoDB");           // connecting to the mongodb database and logging a message if the connection is successful
}).catch((err)=>{
    console.log("Error connecting to MongoDB",err);           // logging an error message if the connection to the mongodb database fails
}) ; 


 
app.listen(5050,()=>{
    console.log("Server is running on port 5050");         // connecting the server to the port 5050 and listening for requests
})


