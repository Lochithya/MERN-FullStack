import Product from '../models/product.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken' ;
import { isAdmin } from './userController.js' ;

export async function getProducts(req, res) {
    
    try{                                                        // we can still place the isAdmin fucntion outside the try block and directly reject the request if the user is not admin 
        if(isAdmin(req)){
            const products = await Product.find() ;           // finding all the product documents in the mongodb database and sending them as a response to the sender of the request
            res.json(products);
        }
        else{
            const products = await Product.find({isAvailable : true}) ;           // if the user is not an admin , only send the products that are available in stock
            res.json(products) ; 
        }
    }
    catch(err){
        res.status(500).json({
            "message" : "Error fetching products from MongoDB",
            "error" : err.message
        }) ;           // logging an error message if the fetch from the mongodb database fails
    }

}

export async function getProductsById(req,res){

    try{
        
        const productId = req.params.productId ;          // getting the product id from the request parameters

        const product = await Product.findOne({          // finding the product with the product id
            productId : productId 
        })

        if(!product){                                    // if no such product exists , cannot proceed     
            res.status(404).json({
                message : "Product not found."
            }) ; 
            return ; 
        }

        if(isAdmin(req)){
            res.json(product); 
        }
        else{
            if(product.isAvailable){
                res.json(product); 
            }
            else{
                res.status(404).json({
                    message : "Product is not currently available"
                })
            }
        }
    }
    catch(err){
        res.status(500).json({
            message : "Error fetching product from MongoDB "+err.messaage,
        })
    }

}

export async function createProducts(req, res) {
    
    if(!isAdmin(req)){
        res.status(403).json({
            message : "Only admin users can create products"
        }) ;
        return ; 
    }

    const product = new Product(req.body) ;              // passing the request body to the Product model to create a new product document in the mongodb database

    try{
        const savedProduct = await product.save() ;           // saving the new product document to the mongodb database and sending it as a response to the sender of the request
        res.json({
            message : "Product created successfully",
            product : savedProduct 
        }) ; 
    }
    catch(err){
        res.status(500).json({
            "message" : "Error creating product in MongoDB",
            "error" : err.message
        })
    }

}

export async function deleteProducts(req,res){

    if(!isAdmin(req)){                                                      // only admin users can delete products from the database
        res.status(403).json({
            message : "Only admin users can delete products"
        }) ; 
        return ; 
    }

    const productId = req.params.productId ;          // getting the product id from the request parameters

    try{   

        const deletedProduct = await Product.deleteOne({            // deleting the product document with the specified product id from the mongodb database and sending a response to the sender of the request
            productId : productId 
        })

        if(deletedProduct.deletedCount != 0 ){                   // if the product found and deleted successfully 
            res.json({
                message : "Product deleted successfully" ,
            })
        }
        else{                                                   // if the product not found
            res.status(404).json({
                message : "Product not found."
            })
        }

    }
    catch(err){
        res.status(500).json({
            "message" : "Error deleting product from MongoDB : "+err.message,
        })
        return ;
    }

}


export async function updateProducts(req,res){

    if(!isAdmin(req)){                                                      // only admin users can update products in the database
        res.status(403).json({
            message : "Only admin users can update products"
        }) ; 
        return ; 
    }

    const data = req.body ;                            // all the details of the newer version of the product
    const productId = req.params.productId ;          // getting the product id from the request parameters

    data.productId = productId ;          // ensuring that the product id of the newer version of the product is the same as the older version of the product

    try{

        const updatedProduct = await Product.updateOne({                // find the product by the Id and update the product as stated in the body of the request sent by the frontend 
            productId : productId 
        } ,  data) ;                                          // data represnts the updated fields and the required values of the product 
        
        if(updatedProduct.matchedCount != 0){
            res.json({
                message : "Product updated successfully " ,
                details : data 
                
            })
        }
        else{
            res.status(404).json({
                message : "Product not found."
            })
        }

    }
    catch(err){
        res.status(500).json({
            "message" : "Error updating product in MongoDB : "+err.message,
        }) ; 
        return ; 
    }
}