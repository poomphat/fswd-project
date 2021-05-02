import { gql } from "@apollo/client"

export const FIND_ALL_PROMOTIONS_HOMEPAGE = gql`
    query {
        promotions(limit: 2, sort: _ID_DESC) {
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
