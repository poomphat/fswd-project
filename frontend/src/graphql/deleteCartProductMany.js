import { gql } from "@apollo/client"

export const DELETE_CART_PRODUCT_MANY = gql`
    mutation($cartId: MongoID!) {
        deleteCartProductMany(filter: { cartId: $cartId }) {
            numAffected
        }
    }
`
