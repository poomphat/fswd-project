import { gql } from '@apollo/client'

export const FIND_PRODUCT_QUERY = gql`
query ($name: String!) {
    product(
       filter:{
        productName:$name
      }
    ){
      _id
    productName
    productDesc
    price
    catagory
    imgUrl
    }
  }
`
