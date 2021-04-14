import { PromotionTC } from '../../models'

export const promotions = PromotionTC.getResolver('findMany')

export const promotion = PromotionTC.getResolver('findOne')