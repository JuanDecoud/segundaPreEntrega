import { Router } from 'express'
import ProductManager from "../entities/ProductManager.js"
import productdb from '../dao/models/product.model.js'



const viewRouter = Router ()
const productManager = new ProductManager (`./src/data/products.json`, `utf-8`)

viewRouter.get('/', async (req,res)=>{
    try{
        let products = await productdb.find().lean()
        res.render('home' ,  {products})
    }catch (err){
        res.json ({status : "error" , message : err.message })
    }
})


viewRouter.get('/realtimeproducts' , async(req,res) =>{
    res.render('realTimeProductos')
})






export default viewRouter