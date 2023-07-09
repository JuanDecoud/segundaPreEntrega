import { Router } from 'express'
import CartManager from '../dao/modelsFs/CartManager.js'
import ProductManager from "../dao/modelsFs/ProductManager.js"
import cartModel from '../dao/models/cart.model.js'
import productModel from '../dao/models/product.model.js'
import { comprobateMongoId } from '../utils/utils.js'



const cartsRouter = Router ()
const cartManager = new CartManager (`./src/data/carts.json`, `utf-8`)
const productManager = new ProductManager (`./src/data/products.json`, `utf-8`)


cartsRouter.post ('/:cid/product/:pid' , async(req,res)=>{
    const productId = req.params.pid
    const cartId = req.params.cid
 
    if (productId!=undefined && cartId != undefined){
        let validateId = comprobateMongoId(productId)
        if (validateId=== true){
            try{
                let cartdb = await cartModel.findById(cartId)
                let productdb = await productModel.findById(productId)
                if (!productdb)res.status(400).json ({status : ' Fail' , Message : 'Product does not exist'})
                if (!cartdb)res.status(400).json ({status : ' Fail' , Message : ' Cart does not exist'})
                if (cartdb && productdb){
                    let result =  cartdb.isProductatCard(productId)
                    if (result ===true ){
                        await cartdb.updateQuantity( productId ,1)
                        await cartModel.updateOne({'_id': cartId},{$set: { ...cartdb}})
                        res.status(200).json({status : "success" , message : "Product added at cart"})
                    }
                    else {
                        cartdb.products.push(productdb)
                        await cartModel.updateOne({'_id': cartId},{$set: { ...cartdb}})
                        res.status(200).json({status: "Sucess" , message : "Product Added to cart"})
                    }
            }
            }catch (err){
                res.json ({status : "error" , message : err.message })
            }
        }else  res.status(400).json({status: "Error" , message : "Invalidad Id"}) 

    }
})

cartsRouter.delete('/:cid/product/:pid', async(req,res)=>{
    const cid = req.params.cid
    const pid = req.params.pid
    try{
        const cart = await cartModel.findById(cid)
        if(cart){
            let result = isProductatCard(pid)
            if (result ===true){
                await cart.deleteProduct(pid)
                await cartModel.updateOne({'_id':cid}, {$set : {...cart}} )
                res.status(200).json({status: "Sucess" , message : "Product deleted"})
            }
            else res.status(200).json({status: "Error" , message : "Product wasnt at card"})
        }else res.status(200).json({status: "Error" , message : "Cart doesnt exist"})
    }catch (err){
        res.json ({status : "error" , message : err.message })
    }
})

cartsRouter.put('/:cid' , async(req,res)=>{
    const cartId = req.params.cid
    let arrayProducts = req.body 
    let result = comprobateMongoId(cartId)
    if (result === true){
        try{
            let cart = await cartModel.findById(cartId)
            console.log(cart)
            if (cart){
                if(arrayProducts){
                    cart.products = arrayProducts
                    await cartModel.updateOne({'_id':cartId}, {$set : {...cart}} )
                    res.status(200).json({status: "Sucess" , message : "Products Added to cart"})
                }else res.status(400).json({status: "Error" , message : "No products Selected"})
            }else res.status(200).json({status: "Error" , message : "Cart doesnt exist"})
        }catch (err){
            res.json ({status : "error" , message : err.message })
        }    
    }
    else  res.status(400).json({status: "Error" , message : "Invalidad Id"}) 
  
})

cartsRouter.put('/:cid/product/:pid' , async(req,res)=>{
    const productId = req.params.pid
    const cartId = req.params.cid
    const productQuantity = req.body

    if (productId!=undefined && cartId != undefined){
        let validateId = comprobateMongoId(productId)
        if (validateId=== true){
            try{
                let cartdb = await cartModel.findById(cartId)
                let productdb = await productModel.findById(productId)
                if (!productdb)res.status(400).json ({status : ' Fail' , Message : 'Product does not exist'})
                if (!cartdb)res.status(400).json ({status : ' Fail' , Message : ' Cart does not exist'})
                if (cartdb && productdb){
                    let result =  cartdb.isProductatCard(productId)
                    if (result ===true ){
                        await cartdb.updateQuantity( productId , productQuantity)
                        await cartModel.updateOne({'_id': cartId},{$set: { ...cartdb}})
                        res.status(200).json({status : "success" , message : "Product added at cart"})
                    }else res.status(400).json ({status : ' Fail' , Message : 'Product does not at cart'})
            }
            }catch (err){
                res.json ({status : "error" , message : err.message })
            }
        }else  res.status(400).json({status: "Error" , message : "Invalidad Id"}) 

    }

})

cartsRouter.post ('/', async(req,res)=>{
    try {
        cartModel.create({})
        res.status(200).json ({Status : 'Sucess', Mesagge : 'Cart added'})

    }catch (err){
        res.json ({status : "error" , message : err.message })
    }
})

cartsRouter.get('/:cid',async (req,res)=>{
    try{
        let cartId = req.params.cid
        let cart = await cartModel.findOne({'_id':cartId})
       
        res.status(400).json (cart.products)
        if(!cart)res.status(200).json ({status :'Fail' , message: 'Cart does not exist'})
    }catch (err){
        res.json ({status : "error" , message : err.message })
    }
 
})


export default cartsRouter