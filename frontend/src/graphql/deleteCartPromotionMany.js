import { gql } from "@apollo/client"

export const DELETE_CART_PROMOTION_MANY = gql`
    mutation($cartId: MongoID!) {
        deleteCartPromotionsMany(filter: { cartId: $cartId }) {
            numAffected
        }
    }
`
