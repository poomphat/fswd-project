import { gql } from "@apollo/client"

export const FIND_LATEST_ORDER = gql`
    query {
        orders(filter: {}, limit: 1, sort: _ID_DESC) {
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
