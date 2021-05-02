import { gql } from "@apollo/client"

export const FIND_ORDER_BY_ID = gql`
    query filterOrder($_id: MongoID!) {
        orders(filter: { _id: $_id }) {
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
