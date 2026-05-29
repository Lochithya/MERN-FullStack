import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({              // creation of the schema
    firstName : {
        type : String , 
        required : true
    }  , 
    lastName : {
        type : String , 
        required : true 
    } , 
    email : {
        type :  String , 
        required : true ,
        unique : true
    } , 
    isEmailVerified : {
        type : Boolean ,
        default : false 
    },
    password : {
        type : String , 
        required : true 
    }, 
    phone : {
        type : String , 
        default : "Not-given"                     // if not provided by the user , it will be set to "Not-given"
    }, 
    image : {
        type : String, 
        default : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"          // if not provided by the user , it will be set to a default image
    }, 
    isBlocked : {                                 // if blocked by the admin
        type : String , 
        default : false 
    },                     
    role : { 
        type: String, 
        default : "user",
        enum: ["admin", "user"]
    } , 
    address : {
        street : String ,
        city : String ,
        state : String ,
        country : String ,
        zipCode : String
    }
}); 

const User = mongoose.model("User",userSchema) ; 

export default User ; 

