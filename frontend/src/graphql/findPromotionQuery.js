import { gql } from "@apollo/client"

export const FIND_ALL_PROMOTIONS = gql`
    query {
        promotions {
            promotionName
            promotionDesc
            discountInPercent
            _id
            productId
            disProduct {
                imgUrl
                productName
                price
                _id
            }
        }
    }
`
