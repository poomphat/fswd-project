import mongoose from 'mongoose'
import bcrypt from 'mongoose-bcrypt'
import { composeWithMongoose } from 'graphql-compose-mongoose'

const { Schema } = mongoose

const ProductSchema = new Schema({
    productName: {
        type: String, required: true, index: true, unique: false
    },
    productDesc:{
        type: String, required: false
    },
    price:{
        type: Float,  required: true
    },
    catagory:{
        type: String, required: true
    }
})

export const ProductModel = mongoose.model('Product', ProductSchema)

export const ProductTC = composeWithMongoose(ProductModel)

export default ProductModel