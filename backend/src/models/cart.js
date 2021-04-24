import mongoose from 'mongoose'
import { composeWithMongoose } from 'graphql-compose-mongoose'
import ProductSchema from './product'
const { Schema } = mongoose

const CartSchema = new Schema({
  userId: {
    type: String,
    required: true,
    index: true,
    ref: 'User',
  },
  products:[
    {
        productId:{
            type: mongoose.Schema.Types.ObjectId, reqiured: true, ref: 'products'
        },
        quantity:{ type:Number , reqiured:true, default:1}
    }
  ],
  promotions:[
    {
        promotionId:{
            type: mongoose.Schema.Types.ObjectId, reqiured: true, ref: 'promtions'
        },
        quantity:{ type:Number , reqiured:true, default:1}
    }
  ],

})

export const CartModel = mongoose.model('Cart', CartSchema)

export const CartTC = composeWithMongoose(CartModel)

export default CartModel
