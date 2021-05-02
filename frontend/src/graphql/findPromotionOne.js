import { gql } from "@apollo/client"

export const FIND_PROMOTION_ONE = gql`
    query($promotionId: MongoID) {
        promotion(filter: { _id: $promotionId }) {
            promotionName
            promotionDesc
            discountInPercent
            disProduct {
                _id
                productName
                productDesc
                price
                catagory
                imgUrl
                hasStock {
                    quantity
                }
            }
        }
    }
`
