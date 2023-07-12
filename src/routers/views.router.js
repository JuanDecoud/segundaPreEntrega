import { Router } from 'express'
import ProductManager from "../entities/ProductManager.js"
import productdb from '../dao/models/product.model.js'
import cartModel from '../dao/models/cart.model.js'




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


viewRouter.get('/products/details' ,async(req,res)=>{
    try{
        let productId = req.query.productId
        let cartId = req.query.cartId
        
        let product = await productdb.findOne({'_id': productId}).lean()
        if(cartId)product.cartId=cartId
        
        if(product)res.render('productsDetails' , product)
        else res.status(400).json ({status: error , message : "product dosnt exist"})

    }catch (err){
        res.json ({status : "error" , message : err.message })
    }
})


viewRouter.get ('/products' ,async (req,res)=>{
    try{
        let page = req.query.page || 1
        let cartId = req.query.cartId || null
        let filterOptions= {limit : 3 , page : page  , lean :true}
        let products = await productdb.paginate({}, filterOptions)
       /// esto lo hago para agregar el valor del carrito y poder mandarlo por post para conservarlo y poder seguir 
       /// agregando productos
        products.docs.forEach(element => {
            element.cartId= cartId
        });
        products.nextLink = products.hasNextPage?`/views/products?page=${products.nextPage}` : " "
        products.prevLink = products.hasPrevPage? `/views/products?page=${products.prevPage}` : " "
        res.render ('home' , products )
    }catch (err){
        res.json ({status : "error" , message : err.message })
    }
})


viewRouter.get('/realtimeproducts' , async(req,res) =>{
    res.render('realTimeProductos')
})

viewRouter.get('/carts/:cid' ,async(req,res)=>{
    let cartID =req.params.cid
    try{
        let cart = await cartModel.findOne({"_id": cartID}).lean()
        //res.json( { cart})
        res.render('cartView' , {cart})
    }catch (err){
        res.json ({status : "error" , message : err.message })
    }
    
})






export default viewRouter