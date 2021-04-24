import mongoose from 'mongoose'
import { composeWithMongoose } from 'graphql-compose-mongoose'
import ProductSchema from './product'
const { Schema } = mongoose
const enumStatusType = {
    PAID: 'Paid',
    CANCEL: 'Cancel',
    WAITING: 'Waiting',
  }
const OrderSchema = new Schema({
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
  status: { type: String,enum: Object.keys(enumStatusType),default: 'Waiting',required: true,}
})

export const OrderModel = mongoose.model('Order', OrderSchema)

export const OrderTC = composeWithMongoose(OrderModel)

export default OrderModel
