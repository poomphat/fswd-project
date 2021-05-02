import { gql } from "@apollo/client"

export const FIND_ORDER_BY_USER = gql`
    query filterOrder($userId: String!) {
        orders(filter: { userId: $userId }, sort: TIMESTAMP_DESC) {
            _id
            totalPrice
            status
            products {
                productId
                quantity
                forProduct {
                    imgUrl
                    productName
                    productDesc
                    price
                }
            }
            promotions {
                promotionId
            }
            timestamp
        }
    }
`
