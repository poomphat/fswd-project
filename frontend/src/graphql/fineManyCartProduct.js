import { gql } from "@apollo/client"

export const FIND_ALL_CARTPRODUCT = gql`
query{
    CartProducts(){
      productId
      cartId
    }
  }
`
