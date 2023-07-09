import mongoose from 'mongoose'

import productModel from './product.model.js'
const cartCollection = "carts"

const cartSchema = new mongoose.Schema({
    products : {
       type : [
            {
                product: {
                    type : mongoose.Schema.Types.ObjectId,
                    ref : 'products',
                    requiered : true
                },
                quantity : {
                    type:Number,
                    default : 1
                } 
            }
       ],
       default : []
    }
} )

cartSchema.method('isProductatCard' , function(pid){
    let boolean = false
    this.products.forEach(element => {
        let newid =element._id.toString()
        if (newid === pid){boolean= true} 
    });
    return boolean 
})

cartSchema.method('updateQuantity' , function ( pid , quantity){
    this.products.forEach(element => {
        let newid =element._id.toString()
        if (newid === pid)element.quantity+=quantity  
     })
})


cartSchema.method ('deleteProduct' , function(pid){
    let index = this.products.findIndex((product)=>(product._id.toString())===pid)
    this.products.splice(index,1)
})

cartSchema.pre('findOne', function() {
    this.populate('products.product')
})


const cartModel = mongoose.model (cartCollection ,cartSchema)

export default cartModel 