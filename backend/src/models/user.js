import mongoose from 'mongoose'
import bcrypt from 'mongoose-bcrypt'
import { composeWithMongoose,composeWithMongooseDiscriminators } from 'graphql-compose-mongoose'

const { Schema } = mongoose

const DKey = 'role'
const enumUserRole = {
  ADMIN: 'Admin',
  CUSTOMER: 'Customer',
}

const UserSchema = new Schema({
  username: {
    type: String, required: true, index: true, unique: true,
  },
  name: { type: String, required: true },
  password: { type: String, require: true, bcrypt: true },
  userType: { type: String, required: true, default:'Customer',enum: Object.keys(enumUserRole),}
 } , { discriminatorKey: DKey })

UserSchema.plugin(bcrypt)
const AdminSchema = new Schema({})
const CustomerSchema = new Schema({
  address: {
    address: { type: String, default: null },
    subDistrict: { type: String, default: null },
    district: { type: String, default: null },
    country: { type: String, default: null },
    zipcode: { type: String, default: null },
    tel: { type: String, default: null },
  },
})

export const UserModel = mongoose.model('User', UserSchema)
export const AdminModel = UserModel.discriminator(enumUserRole.ADMIN, AdminSchema)
export const CustomerModel = UserModel.discriminator(enumUserRole.CUSTOMER, CustomerSchema)


export const UserTC = composeWithMongooseDiscriminators(UserModel).removeField('password')
export const AdminTC = UserTC.discriminator(AdminModel, { name: enumUserRole.ADMIN })
export const CustomerTC = UserTC.discriminator(CustomerModel, { name: enumUserRole.CUSTOMER })

export default UserModel
