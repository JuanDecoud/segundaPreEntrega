import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const productCollection = "products"

const productSchema = new mongoose.Schema({
    name : String ,
    description : String,
    price: String ,
    code: {
        type : String ,
        index : true
    },
    stock: String ,
    status: Boolean,
    category: String,
    linkThubnail : String,
})

productSchema.plugin(mongoosePaginate)


 const productModel = mongoose.model (productCollection ,productSchema)

 export default productModel