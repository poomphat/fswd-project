import { gql } from "@apollo/client"

export const UPDATE_STOCK_MUTATION = gql`
    mutation($productId: String!, $quantity: Float!) {
        updateStock(
            filter: { productId: $productId }
            record: { quantity: $quantity }
        ) {
            record {
                productId
                quantity
            }
        }
    }
`
