import { ProductTC } from '../../models/product'

export const createProduct = ProductTC.getResolver('createOne')
export const findProductById = ProductTC.getResolver('findById')
export const findManyProduct = ProductTC.getResolver('findMany')
export const updateProductById = ProductTC.getResolver('updateById')
export const removeProductById = ProductTC.getResolver('removeById')