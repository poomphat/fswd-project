import { StockTC } from '../../models'

export const createStock = StockTC.getResolver('createOne')
export const updateStockById = StockTC.getResolver('updateById')
