import { gql } from '@apollo/client'

export const CREATE_ORDER_MUTATION = gql`
mutation($record: CreateOneOrderInput!) {
  createOrder(record:$record){
   record{
    userId
    products{
      productId
      quantity
    }
    promotions{
      promotionId
      quantity
    }
    status
  }
 }
}
`
