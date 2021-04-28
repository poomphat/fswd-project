import { PromotionTC } from '../../models/promotion'

export const createPromotion = PromotionTC.getResolver('createOne')
export const updatePromotionById = PromotionTC.getResolver('updateById')
export const updateManyPromotion = PromotionTC.getResolver('updateMany')