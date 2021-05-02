import { gql } from "@apollo/client"

export const CREATE_STOCK = gql`
    mutation($productId: String!, $quantity: Float!) {
        createStock(record: { productId: $productId, quantity: $quantity }) {
            recordId
        }
    }
`
