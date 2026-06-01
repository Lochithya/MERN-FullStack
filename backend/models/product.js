import mongoose from 'mongoose' ; 

const productSchema = new mongoose.Schema({

    productId : {
        type : String , 
        required : true ,
        unique : true
    } , 
    name : {
        type : String , 
        required : true
    },  
    altNames : {
        type : [String] ,
        default : []
    } , 
    labelledPrice : {
        type : Number ,
        required : true 
    }, 
    price : {
        type : Number ,
        required : true 
    },  
    images : {
        type : [String] ,
        default : ["/default-product.jpg"]
    } , 
    description : {
        type : String , 
        default : "No description provided"    
    }, 
    stock : {
        type : Number , 
        default : 0 
    },
    isAvailable : {
        type : Boolean , 
        default : true    
    },
    category : {
        type : String ,     
        required : true , 
        default : "Cosmetics"
    }
}) ; 

const Product = mongoose.model("Product",productSchema) ;

export default Product ; 