import { gql } from "@apollo/client"

export const CREATE_CART_MUTATION = gql`
    mutation($userId: String!) {
        createCart(record: { userId: $userId }) {
            record {
                userId
            }
        }
    }
`
