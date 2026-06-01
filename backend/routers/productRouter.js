import express from 'express';
import {getProducts ,getProductsById , createProducts , deleteProducts , updateProducts} from '../controllers/productController.js';          // importing the getProducts and createProducts functions from the productController.js file

const productRouter = express.Router();

productRouter.get('/', getProducts);          // handling GET requests to the /products endpoint using the getProducts function
productRouter.get('/:productId', getProductsById) ;          // handling GET requests to the /products/:id endpoint using the getProducts function

productRouter.post('/', createProducts);          // handling POST requests to the /products endpoint using the createProducts function

productRouter.delete('/:productId',deleteProducts) ;          // handling DELETE requests to the /products/:id endpoint using the deleteProducts function

productRouter.put('/:productId',updateProducts) ;          // handling PUT requests to the /products/:id endpoint using the updateProducts function

export default productRouter ;