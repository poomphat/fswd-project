import { gql } from '@apollo/client'

export const CREATE_ORDER_MUTATION = gql`
mutation($record: CreateOneOrderInput!) {
  createOrder(record:$record){
   record{
    userId
    products{
      productId
      quantity
      forProduct{
        productName
        productDesc
        price
        imgUrl
      }
    }
    promotions{
      promotionId
      quantity
      forPromotion{
        promotionName
        promotionDesc
        discountInPercent
        productId
        disProduct{
          productName
          price
          imgUrl
        }
      }
    }
    status
    totalPrice
  }
 }
}
`
