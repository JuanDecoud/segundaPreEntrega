import mongoose from 'mongoose'

import productModel from './product.model.js'
const cartCollection = "Carts"

const cartSchema = new mongoose.Schema({
    products : {
       type : [{
                product: {
                    _id : false,
                    type : mongoose.Schema.Types.ObjectId,
                    ref : 'products'
                },
                quantity : {
                    type:Number,
                    default : 1
                } 
            }],
            default : []
        }
} )

cartSchema.method('isProductatCard' , function(pid){
    let boolean = false
    this.products.forEach(element => {
        console.log(element)
        let newid =element.product._id.toString()
        if (newid === pid){boolean= true} 
    });
    return boolean 
})

cartSchema.method('updateQuantity' , function ( pid , quantity){
    let newQuantity = parseInt(quantity)
    this.products.forEach(element => {
        let newid =element.product._id.toString()
        if (newid === pid)element.quantity+=newQuantity  
     })
})


cartSchema.method ('deleteProduct' , function(pid){
    let index = this.products.findIndex((product)=>(product._id.toString())===pid)
    this.products.splice(index,1)
})

cartSchema.pre('findOne',  function() {
     this.populate('products.product')
})


const cartModel = mongoose.model (cartCollection ,cartSchema)

export default cartModel 