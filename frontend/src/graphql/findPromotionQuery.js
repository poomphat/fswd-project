import { gql } from '@apollo/client'

export const FIND_ALL_PROMOTIONS = gql`
query{
    promotions{
      promotionName
      promotionDesc
      discountInPercent
      productId
          disProduct{
        productName
        price
        _id
      }
    }
  }
`
