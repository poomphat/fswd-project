import mongoose from 'mongoose'
import bcrypt from 'mongoose-bcrypt'
import { composeWithMongoose } from 'graphql-compose-mongoose'

const { Schema } = mongoose

const PromotionSchema = new Schema({
    promotionName: {
        type: String, required: true, index: true, unique: false
    },
    promotionDesc:{
        type: String, required: false
    },
    discountInPercent:{
        type: Float,  required: true
    },
})

export const PromotionModel = mongoose.model('Promotion', PromotionSchema)

export const PromotionTC = composeWithMongoose(PromotionModel)

export default PromotionModel