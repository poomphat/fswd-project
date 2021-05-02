import { gql } from "@apollo/client"

export const FIND_ALL_ORDER = gql`
    query {
        orders {
            _id
            totalPrice
            status
            products {
                productId
                quantity
                forProduct {
                    productName
                    productDesc
                    price
                    imgUrl
                }
            }
            promotions {
                promotionId
            }
        }
    }
`
