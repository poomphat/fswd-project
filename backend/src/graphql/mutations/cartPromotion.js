
import { CartPromotionsTC } from '../../models/'

export const createCartPromotions = CartPromotionsTC.getResolver('createOne')
export const updateCartPromotions = CartPromotionsTC.getResolver('updateById')
export const deleteCartPromotionsMany = CartPromotionsTC.getResolver('removeMany')
