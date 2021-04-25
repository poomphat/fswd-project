import { gql } from '@apollo/client'

export const FIND_CART_QUERY = gql`
query ($Id: String!) {
  cart(
     filter:{
      userId:$Id
    }
  ){
    _id
    products{
      forProduct{
        _id
        productName
        productDesc
        price
      }
      quantity
    }
    promotions{
      forPromotion{
        _id
        promotionName
        promotionDesc
        discountInPercent
      }
      quantity
    }
}
}
`
