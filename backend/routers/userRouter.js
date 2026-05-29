import express from 'express';
import {getUsers , createUsers , loginUser} from '../controllers/userController.js';          // importing the getUsers and createUsers functions from the userController.js file

const userRouter = express.Router();

userRouter.get('/', getUsers);          // handling GET requests to the /users endpoint using the getUsers function

userRouter.post('/', createUsers);          // handling POST requests to the /users endpoint using the createUsers function

userRouter.post('/login',loginUser);       // handling POST requests to the /users/login endpoint using the userLogin function
                                           // there are two post requests. one for creating a new user and another for logging in an existing user. 
export default userRouter ;